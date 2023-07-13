import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Colors} from 'src/styles/styles';
import PhantomIcon from '../images/PhantomIcon';

export default function NDO_PhantomConnectButton() {
  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderRadius: 50,
        backgroundColor: Colors.Phantom,
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
