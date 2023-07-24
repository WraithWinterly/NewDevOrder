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
import {Cluster, Connection, PublicKey} from '@solana/web3.js';
import {useConnection} from './ConnectionProvider';
import {Account, useAuthorization} from './SolAuthorizationProvider';

interface AppIdentity {
  name: string;
  uri: string;
  icon: string;
}

interface SolanaContextType {
  wallet: Account | null;
  balance: number | null;
  isConnected: boolean;
  initializeWallet: () => Promise<void>;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export function SolanaProvider({children}: {children: ReactNode}) {
  const [isConnected, setIsConnected] = useState(false);
  const {authorizeSession, selectedAccount: wallet} = useAuthorization();
  const [authorizationInProgress, setAuthorizationInProgress] = useState(false);

  const {connection} = useConnection();
  const {selectedAccount} = useAuthorization();
  const [balance, setBalance] = useState<number | null>(null);

  const fetchAndUpdateBalance = useCallback(
    async (account: Account) => {
      console.log('Fetching balance for: ' + account.publicKey);
      const fetchedBalance = await connection.getBalance(account.publicKey);
      console.log('Balance fetched: ' + fetchedBalance);
      setBalance(fetchedBalance);
    },
    [connection],
  );

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }
    fetchAndUpdateBalance(selectedAccount);
  }, [fetchAndUpdateBalance, selectedAccount]);

  async function initializeWallet() {
    if (authorizationInProgress) {
      return;
    }
    setAuthorizationInProgress(true);
    await transact(async wallet => {
      await authorizeSession(wallet);
    });

    setIsConnected(true);
    setAuthorizationInProgress(false);
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
