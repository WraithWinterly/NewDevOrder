import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Main';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';

export default function WelcomeWalletFailed() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  return (
    <Layout>
      <NDO_Text type="header">Wallet Failed to Connect</NDO_Text>
      <NDO_Text>Maybe try again...</NDO_Text>
    </Layout>
  );
}
