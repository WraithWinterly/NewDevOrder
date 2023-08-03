import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect} from 'react';
import {View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function ReconnectWallet() {
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  useEffect(() => {}, [walletAddress]);

  const {loading, error, data, query} = useQuery();

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
          <StyledText type="header" style={{paddingBottom: 24}}>
            Welcome Back to New Dev Order!
          </StyledText>
          <StyledText>Please reconnect your wallet to continue.</StyledText>
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
              if (!data) {
                navigation.navigate('WelcomeMintMembershipToken');
              } else {
                navigation.navigate('HomeNavigation');
              }
            }}
          />
          {/* <NDO_Button type="noBg" onPress={() => {}}>
              Create new wallet
            </NDO_Button> */}
        </View>
      </View>
    </Layout>
  );
}
