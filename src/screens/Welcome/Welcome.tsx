import {View} from 'react-native';
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

export default function Welcome() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [hasCompletedWelcome, setHasCompletedWelcome] = useState<
    boolean | undefined
  >(undefined);

  useEffect(() => {
    asyncStorage.getItem('hasCompletedWelcome').then(hasCompletedWelcome => {
      if (!hasCompletedWelcome) {
        setHasCompletedWelcome(false);
        return;
      }
      const completed = JSON.parse(hasCompletedWelcome);
      if (completed) {
        navigation.navigate('HomeNavigation');
        return;
      }
      setHasCompletedWelcome(false);
    });
  }, []);

  return (
    <Layout>
      {hasCompletedWelcome != undefined && hasCompletedWelcome === false && (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 10,
            height: '85%',
          }}>
          <View style={{gap: 18, paddingTop: 60}}>
            <NDO_Text type="header" style={{paddingBottom: 24}}>
              Congratulations! You've been invited to join the New Dev Order.
            </NDO_Text>
            <NDO_Text>
              Let's take a couple minutes to get you set up. You'll need to
              connect your Phantom Wallet.
            </NDO_Text>
            <NDO_Text>
              Just a heads up - it'll take 1 SOL to mint your Membership Token.{' '}
              <NDO_Link href="https://google.com">Learn more.</NDO_Link>
            </NDO_Text>
          </View>

          <View
            style={{
              flexDirection: 'column',
              gap: 20,
              width: '100%',
              paddingTop: 80,
            }}>
            <NDO_PhantomConnectButton />
            <NDO_Button
              type="noBg"
              onPress={() => navigation.navigate('WelcomeSetupProfile')}>
              Create new wallet
            </NDO_Button>
          </View>
        </View>
      )}
    </Layout>
  );
}
