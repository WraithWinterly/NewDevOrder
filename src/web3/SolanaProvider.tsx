import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useCallback,
} from 'react';
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {
  AuthorizationResult,
  AuthorizeAPI,
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
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export function SolanaProvider({children}: {children: ReactNode}) {
  const [isConnected, setIsConnected] = useState(false);
  const {authorizeSession, selectedAccount: wallet} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
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

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  async function initializeWallet(): Promise<PublicKey | null> {
    if (authorizationInProgress) {
      return Promise.resolve(null);
    }
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

  const contextValue: SolanaContextType = {
    wallet,
    balance,
    isConnected,
    initializeWallet,
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
