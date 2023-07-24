import React from 'react';
import {TouchableOpacity, View, Text, Linking} from 'react-native';
import {Colors} from 'src/styles/styles';
import PhantomIcon from '../icons/PhantomIcon';
import useSolanaContext from 'src/web3/SolanaProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import useAppStore from '../../stores/store';

export default function PhantomConnectButton({
  skipWelcome = false,
}: {
  skipWelcome?: boolean;
}) {
  const solana = useSolanaContext();
  const navigator = useNavigation<StackNavigationProp<StackParamList>>();
  const setWalletConnectError = useAppStore(
    state => state.setWalletConnectError,
  );

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
            if (skipWelcome) {
              return;
            }
            onWalletConnectComplete();
          })
          .catch(e => {
            const error = e as Error;
            setWalletConnectError(error.message);
            if (
              error.message.includes(
                'Found no installed wallet that supports the mobile wallet protocol.',
              )
            ) {
              Linking.openURL('market://details?id=app.phantom');
              return;
            }
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
