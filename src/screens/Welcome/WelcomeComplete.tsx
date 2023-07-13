import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Main';
import NDO_Button from 'src/components/ndo/NDO_Button';
import Layout from 'src/layout/Layout';

export default function WelcomeComplete() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  function onPress() {
    navigation.reset({
      index: 0,
      routes: [{name: 'Home'}],
    });
  }

  return (
    <Layout>
      <NDO_Button onPress={onPress}>Next Page</NDO_Button>
    </Layout>
  );
}
