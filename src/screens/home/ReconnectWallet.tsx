import {View} from 'react-native';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

export default function ReconnectWallet() {
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
          <PhantomConnectButton successRoute="HomeNavigation" />
          {/* <NDO_Button type="noBg" onPress={() => {}}>
              Create new wallet
            </NDO_Button> */}
        </View>
      </View>
    </Layout>
  );
}
