import {VERSION_STR} from '@env';
import {ActivityIndicator, View} from 'react-native';
import StyledLink from 'src/components/ui/styled/StyledLink';
import StyledText from 'src/components/ui/styled/StyledText';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import Layout from 'src/layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

import asyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useQuery from 'src/hooks/useQuery';
import useMemberStore from 'src/stores/membersStore';
import {Colors} from 'src/styles/styles';
import SharedPreferences from 'react-native-shared-preferences';
export default function Welcome() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);

  const [hasCompletedWelcome, setHasCompletedWelcome] = useState<
    boolean | undefined
  >(undefined);

  const {loading, error, data, query} = useQuery();
  const {query: queryVerify} = useQuery(
    getServerEndpoint(Endpoints.VERIFY_AUTH),
  );

  const [verifyingToken, setVerifyingToken] = useState(true);

  useEffect(() => {
    asyncStorage
      .getItem('walletAddress')
      .then((walletAddress: string | null) => {
        SharedPreferences.getItem('key', async key => {
          if (walletAddress && key) {
            setVerifyingToken(true);
            // Do an auth challenge
            globalThis.authToken = key;

            const data = await queryVerify();

            if (!!data && data?.verified == true) {
              fetchMyProfile();
              setHasCompletedWelcome(true);
              navigation.reset({
                index: 0,
                routes: [{name: 'HomeNavigation'}],
              });
            } else {
              globalThis.authToken = '';
              setVerifyingToken(false);
            }
          } else {
            setVerifyingToken(false);
          }
        });
      });

    asyncStorage.getItem('hasCompletedWelcome').then(hasCompletedWelcome => {
      if (!hasCompletedWelcome) {
        setHasCompletedWelcome(false);
        return;
      }

      setHasCompletedWelcome(true);
    });
  }, []);

  return (
    <Layout>
      {verifyingToken ? (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '90%',
          }}>
          <ActivityIndicator size="large" color={Colors.Primary} />
        </View>
      ) : (
        <View style={{height: '100%'}}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              gap: 10,
              height: '60%',
              justifyContent: 'center',
              paddingTop: 24,
            }}>
            <View style={{gap: 18}}>
              {hasCompletedWelcome ? (
                <>
                  <StyledText type="header" style={{paddingBottom: 24}}>
                    Welcome Back to New Dev Order!
                  </StyledText>
                  <StyledText>
                    Please reconnect your wallet to continue.
                  </StyledText>
                </>
              ) : (
                <>
                  <StyledText type="header" style={{paddingBottom: 24}}>
                    Congratulations! You've been invited to join the New Dev
                    Order.
                  </StyledText>
                  <StyledText>
                    Let's take a couple minutes to get you set up. You'll need
                    to connect your Phantom Wallet.
                  </StyledText>
                  <StyledText>
                    Just a heads up - it'll take 1 SOL to mint your Membership
                    Token.{' '}
                    <StyledLink href="https://google.com">
                      Learn more.
                    </StyledLink>
                  </StyledText>
                </>
              )}
            </View>

            <View
              style={{
                flexDirection: 'column',
                gap: 20,
                width: '100%',
                paddingTop: 80,
              }}>
              <PhantomConnectButton
                onSuccess={async walletAddress => {
                  const data = await query(
                    getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) +
                      `/${walletAddress}`,
                  );

                  if (!!data) {
                    fetchMyProfile();
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'HomeNavigation'}],
                    });
                    asyncStorage.setItem('hasCompletedWelcome', 'true');
                  } else {
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'WelcomeMintMembershipToken'}],
                    });
                  }
                }}
              />
              {/* <NDO_Button type="noBg" onPress={() => {}}>
              Create new wallet
            </NDO_Button> */}
            </View>
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              alignItems: 'flex-end',
            }}>
            <StyledText style={{color: Colors.Gray[400]}}>
              New Dev Order
            </StyledText>
            <StyledText style={{color: Colors.Gray[400]}}>
              CryptoVersus LLC
            </StyledText>
            <StyledText style={{color: Colors.Gray[400]}}>
              {VERSION_STR}
            </StyledText>
          </View>
        </View>
      )}
    </Layout>
  );
}
