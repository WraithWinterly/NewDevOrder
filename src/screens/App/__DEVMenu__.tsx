import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';

export default function __DEVMenu__() {
  const [resetFeedback, setResetFeedback] = useState('');
  async function onResetWelcomeScreen() {
    await AsyncStorage.clear();
  }

  return (
    <Layout>
      <NDO_Button onPress={onResetWelcomeScreen}>Erase Storage Data</NDO_Button>
      <NDO_Text>{resetFeedback}</NDO_Text>
    </Layout>
  );
}
