import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  Web3MobileWallet,
  transact,
} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {
  AuthorizationResult,
  AuthorizeAPI,
  DeauthorizeAPI,
  ReauthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol';
import {
  Cluster,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';
import {useConnection} from './ConnectionProvider';
import {Account, useAuthorization} from './SolAuthorizationProvider';
import useMutation from 'src/hooks/useMutation';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

interface AppIdentity {
  name: string;
  uri: string;
  icon: string;
}

interface SolanaContextType {
  wallet: Account | null;
  balance: string | null;
  isConnected: boolean;
  initializeWallet: () => Promise<PublicKey | null>;
  deauthorizeSession: () => Promise<void>;
  signMessage: (nonce: string) => Promise<Uint8Array[] | null>;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export function SolanaProvider({children}: {children: ReactNode}) {
  const {authorizeSession, selectedAccount: wallet} = useAuthorization();

  const {connection} = useConnection();
  const {selectedAccount, deauthorizeSession} = useAuthorization();

  const [isConnected, setIsConnected] = useState(false);
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);

  function convertLamportsToSOL(lamports: number) {
    return new Intl.NumberFormat(undefined, {maximumFractionDigits: 3}).format(
      (lamports || 0) / LAMPORTS_PER_SOL,
    );
  }

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      const sol = convertLamportsToSOL(fetchedBalance);
      console.log('Balance fetched: ' + sol);
      setBalance(sol);
    },
    [connection],
  );

  async function signMessage(nonce: string): Promise<Uint8Array[] | null> {
    const message = `Signing this message will prove your identity. Nonce: ${nonce}`;

    const messageBuffer = new Uint8Array(
      message.split('').map(c => c.charCodeAt(0)),
    );
    let signedMessages: Uint8Array | null = null;
    try {
      await transact(async (ins_wallet: Web3MobileWallet) => {
        // First, request for authorization from the wallet.
        const authorizeData = await authorizeSession(ins_wallet);

        // @ts-expect-error
        signedMessages = await ins_wallet.signMessages({
          addresses: [authorizeData.address],
          payloads: [messageBuffer],
        });
      });
      return signedMessages;
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  }

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  async function initializeWallet(): Promise<PublicKey | null> {
    // if (authorizationInProgress) {
    //   return Promise.resolve(null);
    // }
    setAuthorizationInProgress(true);
    let publicKey: PublicKey | null = null;
    await transact(async wallet => {
      await authorizeSession(wallet).then(e => {
        publicKey = e.publicKey;
      });
    });

    setIsConnected(true);
    setAuthorizationInProgress(false);

    return Promise.resolve(publicKey);
  }
  async function deAuth() {
    await transact(async wallet => {
      deauthorizeSession(wallet);
    });
  }
  const contextValue: SolanaContextType = {
    wallet,
    balance,
    signMessage,
    isConnected,
    initializeWallet,
    deauthorizeSession: deAuth,
  };

  return (
    <SolanaContext.Provider value={contextValue}>
      {children}
    </SolanaContext.Provider>
  );
}

export default function useSolanaContext(): SolanaContextType {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error('useSolanaContext must be used within a SolanaProvider');
  }
  return context;
}
