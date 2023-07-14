import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/Main';
import TokenIcon from 'src/components/images/TokenIcon';
import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';

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
          <NDO_Text type="header" style={{paddingBottom: 8}}>
            You don't have an NDO Membership Token.
          </NDO_Text>
          <NDO_Text>Come back when you have an NDO Membership Token.</NDO_Text>
          <NDO_Text>
            You can get this by getting a friend already on the NDO app to
            invite you.
          </NDO_Text>
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            width: '100%',
            paddingTop: 80,
          }}>
          <NDO_Button onPress={() => navigation.navigate('Welcome')}>
            Refresh Wallet
          </NDO_Button>
        </View>
      </View>
    </Layout>
  );
}
