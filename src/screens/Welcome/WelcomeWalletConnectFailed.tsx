import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import TokenIcon from 'src/components/icons/TokenIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useAppStore from 'src/store';
import Layout from 'src/layout/Layout';

export default function WelcomeWalletConnectFailed() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const walletConnectError = useAppStore(state => state.walletConnectError);
  return (
    <Layout>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 10,
          height: '85%',
        }}>
        <View style={{gap: 18, paddingTop: 0}}>
          <View style={{alignItems: 'center'}}>
            <TokenIcon />
          </View>
          <StyledText type="header" style={{paddingBottom: 8}}>
            Wallet Connect Failed
          </StyledText>
          <StyledText>
            Please review your wallet settings and do not reject the connection
            prompt.
          </StyledText>
          <StyledText>Error: {walletConnectError}</StyledText>
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            width: '100%',
            paddingTop: 80,
          }}>
          <StyledButton onPress={() => navigation.navigate('Welcome')}>
            Try Again
          </StyledButton>
        </View>
      </View>
    </Layout>
  );
}
