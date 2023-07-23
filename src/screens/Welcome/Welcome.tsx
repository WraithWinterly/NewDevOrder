import {View} from 'react-native';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledLink from 'src/components/ui/styled/StyledLink';
import StyledText from 'src/components/ui/styled/StyledText';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import Layout from 'src/layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

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
        navigation.reset({
          index: 0,
          routes: [{name: 'HomeNavigation'}],
        });
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
            <StyledText type="header" style={{paddingBottom: 24}}>
              Congratulations! You've been invited to join the New Dev Order.
            </StyledText>
            <StyledText>
              Let's take a couple minutes to get you set up. You'll need to
              connect your Phantom Wallet.
            </StyledText>
            <StyledText>
              Just a heads up - it'll take 1 SOL to mint your Membership Token.{' '}
              <StyledLink href="https://google.com">Learn more.</StyledLink>
            </StyledText>
          </View>

          <View
            style={{
              flexDirection: 'column',
              gap: 20,
              width: '100%',
              paddingTop: 80,
            }}>
            <PhantomConnectButton />
            {/* <NDO_Button type="noBg" onPress={() => {}}>
              Create new wallet
            </NDO_Button> */}
          </View>
        </View>
      )}
    </Layout>
  );
}
