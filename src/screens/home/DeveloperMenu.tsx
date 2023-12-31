import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/useMutation';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import SharedPreferences from 'react-native-shared-preferences';

export default function DeveloperMenu() {
  const [resetFeedback, setResetFeedback] = useState('');

  const [connectionQueryFeedback, setConnectionQueryFeedback] = useState('');
  const [connectionMutationFeedback, setConnectionMutationFeedback] =
    useState('');
  const [seedFeedback, setSeedFeedback] = useState('');

  const {
    loading: loadingQuery,
    error: errorQuery,
    query,
  } = useQuery(getServerEndpoint(Endpoints.ALIVE));

  const {
    loading: loadingSeed,
    error: errorSeed,
    query: querySeed,
  } = useQuery(getServerEndpoint(Endpoints.SEED));

  const {
    loading: loadingMutation,
    error: errorMutation,
    mutate,
  } = useMutation(getServerEndpoint(Endpoints.ALIVE_POST));

  async function onResetWelcomeScreen() {
    await AsyncStorage.clear();
    globalThis.authToken = '';
    SharedPreferences.removeItem('key');
    AsyncStorage.removeItem('walletAddress');
    setResetFeedback('Storage data erased. Restart the app.');
  }

  async function testConnectionQuery() {
    setConnectionQueryFeedback('Connecting...');

    const data = await query();

    if (!data) {
      setConnectionQueryFeedback('Connection failed');
      return;
    }
    if (data.message === 'Alive!') {
      setConnectionQueryFeedback('Connected');
    } else {
      setConnectionQueryFeedback(
        'Connected, but did not receive the correct data.',
      );
    }
  }

  async function testConnectionMutation() {
    setConnectionMutationFeedback('Connecting...');

    const data = await mutate({testData: 'testData'});

    setConnectionMutationFeedback(JSON.stringify(data));
  }

  async function seed() {
    setSeedFeedback('Seeding...');

    const data = await querySeed();
    if (data) {
      setSeedFeedback('Seeding complete');
    } else {
      setSeedFeedback('Seeding failed');
    }
  }

  return (
    <Layout>
      <ScrollView>
        <PhantomConnectButton onSuccess={() => {}} />

        <View style={{gap: 8, marginTop: 24}}>
          <StyledButton onPress={onResetWelcomeScreen}>
            Erase Storage Data
          </StyledButton>
          <StyledText style={{paddingBottom: 24}}>{resetFeedback}</StyledText>
          <StyledButton
            onPress={testConnectionQuery}
            loading={loadingQuery}
            error={(errorQuery?.length || 0) > 0}>
            Test Server Connection Query
          </StyledButton>
          <StyledText>{connectionQueryFeedback}</StyledText>
          <StyledText>{errorQuery}</StyledText>
          <StyledButton
            onPress={testConnectionMutation}
            loading={loadingMutation}
            error={(errorMutation?.length || 0) > 0}>
            Test Server Connection Mutation
          </StyledButton>
          <StyledText>{connectionMutationFeedback}</StyledText>
          <StyledText>{errorMutation}</StyledText>

          <StyledButton
            onPress={seed}
            loading={loadingSeed}
            error={!!errorSeed}>
            Seed Database
          </StyledButton>
          <StyledText style={{paddingBottom: 24}}>{seedFeedback}</StyledText>
        </View>
      </ScrollView>
    </Layout>
  );
}
