import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {Colors} from 'src/styles/styles';
import PhantomIcon from '../images/PhantomIcon';
import useSolanaContext from 'src/web3/SolanaContext';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Main';
import {useNavigation} from '@react-navigation/native';

export default function NDO_PhantomConnectButton() {
  const solana = useSolanaContext();
  const navigator = useNavigation<StackNavigationProp<StackParamList>>();

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
        solana
          .initializeWallet()
          .then(() => {
            onWalletConnectComplete();
          })
          .catch(e => {
            console.log(e);
            navigator.navigate('WelcomeWalletFailed');
          });
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
