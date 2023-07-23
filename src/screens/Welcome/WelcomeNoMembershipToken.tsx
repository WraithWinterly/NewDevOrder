import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import TokenIcon from 'src/components/icons/TokenIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

export default function WelcomeNoMembershipToken() {
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
        <View style={{gap: 18, paddingTop: 0}}>
          <View style={{alignItems: 'center'}}>
            <TokenIcon />
          </View>
          <StyledText type="header" style={{paddingBottom: 8}}>
            You don't have an NDO Membership Token.
          </StyledText>
          <StyledText>
            Come back when you have an NDO Membership Token.
          </StyledText>
          <StyledText>
            You can get this by getting a friend already on the NDO app to
            invite you.
          </StyledText>
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            width: '100%',
            paddingTop: 80,
          }}>
          <StyledButton onPress={() => navigation.navigate('Welcome')}>
            Refresh Wallet
          </StyledButton>
        </View>
      </View>
    </Layout>
  );
}
