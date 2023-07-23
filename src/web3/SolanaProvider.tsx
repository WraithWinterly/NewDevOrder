import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import {transact} from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import {
  AuthorizationResult,
  AuthorizeAPI,
} from '@solana-mobile/mobile-wallet-adapter-protocol';

interface AppIdentity {
  name: string;
  uri: string;
  icon: string;
}

interface SolanaContextType {
  wallet: AuthorizationResult | null;
  isConnected: boolean;
  initializeWallet: () => Promise<void>;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

const APP_IDENTITY: AppIdentity = {
  name: 'New Dev Order',
  uri: 'https://cryptoversus.llc',
  icon: 'favicon.ico', // Full path resolves to https://yourdapp.com/favicon.ico
};

export function SolanaProvider({children}: {children: ReactNode}) {
  const [wallet, setWallet] = useState<AuthorizationResult | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  async function initializeWallet() {
    const wallet = await transact(async wallet => {
      const authorizationResult = await wallet.authorize({
        cluster: 'devnet',
        identity: APP_IDENTITY,
      });
      return authorizationResult;
    });

    setWallet(wallet);
    setIsConnected(true);
  }

  const contextValue: SolanaContextType = {
    wallet,
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
