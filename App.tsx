import React from 'react';

import StackNavigator from './src/StackNavigator';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import 'react-native-get-random-values';
import 'buffer';

import {SolanaProvider} from 'src/web3/SolanaProvider';
import {MenuProvider} from 'react-native-popup-menu';
import {AuthorizationProvider} from 'src/web3/SolAuthorizationProvider';
import {ConnectionProvider, RPC_ENDPOINT} from 'src/web3/ConnectionProvider';
import {clusterApiUrl} from '@solana/web3.js';
export default function App() {
  return (
    <AuthorizationProvider>
      <ConnectionProvider
        config={{commitment: 'processed'}}
        endpoint={clusterApiUrl(RPC_ENDPOINT)}>
        <SolanaProvider>
          <SafeAreaProvider>
            <MenuProvider>
              <StackNavigator />
            </MenuProvider>
          </SafeAreaProvider>
        </SolanaProvider>
      </ConnectionProvider>
    </AuthorizationProvider>
  );
}
