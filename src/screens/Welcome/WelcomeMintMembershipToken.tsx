import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Main';
import NDO_Button from 'src/components/ndo/NDO_Button';
import Layout from 'src/layout/Layout';

export default function WelcomeMintMembershipToken() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <Layout>
      <NDO_Button onPress={() => navigation.navigate('WelcomeComplete')}>
        Next Page
      </NDO_Button>
    </Layout>
  );
}
