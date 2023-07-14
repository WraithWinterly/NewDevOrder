import React, {useContext, useEffect, useState} from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Colors} from 'src/styles/styles';
import PhantomIcon from '../images/PhantomIcon';
import {PhantomContext} from 'src/web3/PhantomContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Main';
import {useNavigation} from '@react-navigation/native';

export default function NDO_PhantomConnectButton() {
  const phantom = useContext(PhantomContext);
  const navigator = useNavigation<StackNavigationProp<StackParamList>>();

  useEffect(() => {
    if (typeof phantom.connectionSuccess === 'boolean') {
      const success = phantom.connectionSuccess;
      phantom.resetConnectionSuccess();
      if (success) {
        onWalletConnectComplete();
      } else {
        navigator.navigate('WelcomeWalletFailed');
      }
    }
  }, [phantom.connectionSuccess]);

  function onWalletConnectComplete() {
    // Check Solana Token
    const hasMemberShipToken = true;
    if (hasMemberShipToken) {
      navigator.navigate('WelcomeSetupProfile');
    } else {
      navigator.navigate('WelcomeNoMembershipToken');
    }
  }

  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderRadius: 50,
        backgroundColor: Colors.Phantom,
      }}
      onPress={() => {
        !!phantom.connect && !phantom.connect();
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <PhantomIcon />
        <Text
          style={{
            color: Colors.White,
            paddingRight: 10,
          }}>
          Connect Wallet
        </Text>
      </View>
    </TouchableOpacity>
  );
}
