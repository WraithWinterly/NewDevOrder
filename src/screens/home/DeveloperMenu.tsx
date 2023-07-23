import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

export default function DeveloperMenu() {
  const [resetFeedback, setResetFeedback] = useState('');
  async function onResetWelcomeScreen() {
    await AsyncStorage.clear();
    setResetFeedback('Storage data erased. Restart the app.');
  }

  return (
    <Layout>
      <StyledButton onPress={onResetWelcomeScreen}>
        Erase Storage Data
      </StyledButton>
      <StyledText>{resetFeedback}</StyledText>
    </Layout>
  );
}
