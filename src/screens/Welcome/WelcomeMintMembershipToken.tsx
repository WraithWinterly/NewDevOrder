import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/Main';
import TokenIcon from 'src/components/images/TokenIcon';
import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';

export default function WelcomeMintMembershipToken() {
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
          <NDO_Text type="header" style={{paddingBottom: 8}}>
            Almost there! Let's mint your Membership Token.
          </NDO_Text>
          <NDO_Text>
            The New Dev Order is a token-gated platform. In order to access
            content and participate in bounties, you'll have to mint a
            Membership Token first.
          </NDO_Text>
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
          <NDO_Button onPress={() => navigation.navigate('WelcomeComplete')}>
            Mint my pass
          </NDO_Button>
          <NDO_Button type="noBg">Why do I need a Membership Token?</NDO_Button>
        </View>
      </View>
    </Layout>
  );
}
