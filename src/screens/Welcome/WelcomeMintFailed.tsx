import {View} from 'react-native';

import StyledButton from 'src/components/ui/styled/StyledButton';

import StyledText from 'src/components/ui/styled/StyledText';

import Layout from 'src/layout/Layout';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

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
          <StyledText type="header" style={{paddingBottom: 24}}>
            Not enough funds in your wallet.
          </StyledText>
          <StyledText>
            We checked your wallet and you don't have enough SOL to mint your
            Membership Token. Come back later after you have charged your wallet
            and try again.
          </StyledText>
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            width: '100%',
            paddingTop: 80,
          }}>
          <StyledButton
            onPress={() => navigation.navigate('WelcomeMintMembershipToken')}>
            Reresh Wallet
          </StyledButton>
        </View>
      </View>
    </Layout>
  );
}
