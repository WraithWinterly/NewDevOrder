import React from 'react';

import Main from './src/Main';
import PhantomContextProvider, {Cluster} from './src/web3/PhantomContext';
import {AppRegistry, Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
export default function App() {
  return (
    <PhantomContextProvider
      Linking={Linking}
      appUrl="https://phantom.app/ul/v1"
      protocol="ndo:"
      cluster={Cluster.MAINNET}>
      <SafeAreaProvider>
        <Main />
      </SafeAreaProvider>
    </PhantomContextProvider>
  );
}
