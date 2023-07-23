import React from 'react';

import StackNavigator from './src/StackNavigator';

import {SafeAreaProvider} from 'react-native-safe-area-context';

import 'react-native-get-random-values';
import 'buffer';

import {SolanaProvider} from 'src/web3/SolanaProvider';
import {MenuProvider} from 'react-native-popup-menu';
export default function App() {
  return (
    <SolanaProvider>
      <SafeAreaProvider>
        <MenuProvider>
          <StackNavigator />
        </MenuProvider>
      </SafeAreaProvider>
    </SolanaProvider>
  );
}
