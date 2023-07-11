/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import PhantomContextProvider, {Cluster} from './src/PhantomContext';
import WalletConnect from './src/components/WalletConnect';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const textStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <PhantomContextProvider
      Linking={Linking}
      appUrl="https://phantom.app/ul/v1"
      protocol="ndo:"
      cluster={Cluster.MAINNET}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Text style={textStyle}>Welcome to New Dev Order</Text>
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
              flexDirection: 'column',
              alignItems: 'flex-start',
              alignContent: 'flex-start',
            }}>
            <WalletConnect />
          </View>
        </ScrollView>
      </SafeAreaView>
    </PhantomContextProvider>
  );
}

export default App;
