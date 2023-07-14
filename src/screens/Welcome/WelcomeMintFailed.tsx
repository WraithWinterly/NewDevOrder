import {View} from 'react-native';
import {baseScreenStyle} from 'src/styles/styles';

import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Link from 'src/components/ndo/NDO_Link';
import NDO_Text from 'src/components/ndo/NDO_Text';
import NDO_PhantomConnectButton from 'src/components/ndo/NDO_PhantomConnectButton';
import Layout from 'src/layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Main';

import asyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

export default function WelcomeMintFailed() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Layout>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 10,
          height: '85%',
        }}>
        <View style={{gap: 18, paddingTop: 60}}>
          <NDO_Text type="header" style={{paddingBottom: 24}}>
            Not enough funds in your wallet.
          </NDO_Text>
          <NDO_Text>
            We checked your wallet and you don't have enough SOL to mint your
            Membership Token. Come back later after you have charged your wallet
            and try again.
          </NDO_Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            width: '100%',
            paddingTop: 80,
          }}>
          <NDO_Button
            onPress={() => navigation.navigate('WelcomeMintMembershipToken')}>
            Reresh Wallet
          </NDO_Button>
        </View>
      </View>
    </Layout>
  );
}
