import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {View} from 'react-native';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useAppStore from 'src/stores/store';

export default function DeveloperMenu() {
  const [resetFeedback, setResetFeedback] = useState('');

  const setIsFounder = useAppStore(state => state.setIsFounder);
  const isFounder = useAppStore(state => state.isFounder);
  const [founderFeedback, setFounderFeedback] = useState('');
  async function onResetWelcomeScreen() {
    await AsyncStorage.clear();
    setResetFeedback('Storage data erased. Restart the app.');
  }

  async function onToggleFounder() {
    setIsFounder(!isFounder);
    setFounderFeedback(`Founder status set to ${!isFounder}`);
  }

  return (
    <Layout>
      <PhantomConnectButton successRoute="HomeNavigation" />
      <View style={{gap: 8, marginTop: 24}}>
        <StyledButton onPress={onToggleFounder}>
          Toggle Founder Status
        </StyledButton>
        <StyledText style={{paddingBottom: 24}}>{founderFeedback}</StyledText>
        <StyledButton onPress={onResetWelcomeScreen}>
          Erase Storage Data
        </StyledButton>
        <StyledText style={{paddingBottom: 24}}>{resetFeedback}</StyledText>
      </View>
    </Layout>
  );
}
