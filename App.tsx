import React from 'react';

import Main from './src/Main';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from 'src/components/AppProvider';

import {Buffer} from 'buffer';
import 'react-native-get-random-values';
import {SolanaProvider} from 'src/web3/SolanaContext';
export default function App() {
  return (
    <SolanaProvider>
      <SafeAreaProvider>
        <AppProvider>
          <Main />
        </AppProvider>
      </SafeAreaProvider>
    </SolanaProvider>
  );
}
