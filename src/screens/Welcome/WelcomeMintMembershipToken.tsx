import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View, ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import TokenIcon from 'src/components/icons/TokenIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';

export default function WelcomeMintMembershipToken() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  function onMintPressed() {
    // Mint functionality
    const mintSuccess = true;
    if (mintSuccess) {
      navigation.navigate('WelcomeSetupProfile');
    } else {
      navigation.navigate('WelcomeMintFailed');
    }
  }

  return (
    <Layout>
      <ScrollView>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 10,
            height: '85%',
          }}>
          <View style={{gap: 18, paddingTop: 0}}>
            <StyledText type="header" style={{paddingBottom: 8}}>
              Almost there! Let's mint your Membership Token.
            </StyledText>
            <StyledText>
              The New Dev Order is a token-gated platform. In order to access
              content and participate in bounties, you'll have to mint a
              Membership Token first.
            </StyledText>
            <View style={{alignItems: 'center'}}>
              <TokenIcon />
              <Text
                style={{
                  fontSize: 32,
                  color: Colors.Text,
                }}>
                Mint Price: 1 SOL
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'column',
              gap: 20,
              width: '100%',
              paddingTop: 80,
            }}>
            <StyledButton onPress={onMintPressed}>Mint my pass</StyledButton>
            <StyledButton type="noBg">
              Why do I need a Membership Token?
            </StyledButton>
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
