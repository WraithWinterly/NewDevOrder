import React from 'react';

import Main from './src/Main';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {AppProvider} from 'src/components/AppProvider';

import 'react-native-get-random-values';
import 'buffer';

import {SolanaProvider} from 'src/web3/SolanaContext';
import {MenuProvider} from 'react-native-popup-menu';
export default function App() {
  return (
    <SolanaProvider>
      <SafeAreaProvider>
        <AppProvider>
          <MenuProvider>
            <Main />
          </MenuProvider>
        </AppProvider>
      </SafeAreaProvider>
    </SolanaProvider>
  );
}
