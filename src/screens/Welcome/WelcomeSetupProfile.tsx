import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useMutation from 'src/hooks/usePost';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {CreateProfilePOSTData} from 'src/sharedTypes';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function WelcomeSetupProfile() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const {wallet} = useSolanaContext();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<string[]>([]);
  const [noUserAccount, setNoUserAccount] = useState(false);

  const {data, loading, error, query} = useQuery(
    getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) +
      `/${wallet!.publicKey!.toBase58().toString()}`,
  );
  const {
    data: createTeamMutationData,
    loading: loadingCreateTeam,
    error: errorCreateTeam,
    mutate: mutateCreateTeam,
  } = useMutation(getServerEndpoint(Endpoints.CREATE_PROFILE));

  useEffect(() => {
    query().then(data => {
      if (data) {
        setNoUserAccount(false);
      } else {
        setNoUserAccount(true);
      }
    });
  }, []);

  async function onSubmit() {
    setErrors([]);
    const localErrors: string[] = [];
    if (username.trim().length < 3) {
      localErrors.push('Username must be at least 3 characters long');
    }
    if (firstName.trim().length < 2) {
      localErrors.push('First Name must be at least 2 characters long');
    }
    if (lastName.trim().length < 2) {
      localErrors.push('Last Name must be at least 2 characters long');
    }
    const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (email.trim().length < 2 || !emailReg.test(email.trim())) {
      localErrors.push('Email is required and must be valid');
    }

    // if (password.length < 5) {
    //   localErrors.push('Password must be at least 5 characters');
    // }

    setErrors(localErrors);
    if (localErrors.length > 0) {
      return;
    }
    const body = {
      username,
      firstName,
      lastName,
      email,
      walletAddress: wallet!.publicKey!.toBase58().toString(),
    } as CreateProfilePOSTData;

    const data = await mutateCreateTeam(body);
    if (data) {
      navigation.replace('WelcomeComplete');
    }
  }

  return (
    <Layout>
      <ScrollView>
        {noUserAccount && (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: 20,
              height: '85%',
            }}>
            <View style={{gap: 20}}>
              <StyledText type="header">Let's set up your profile.</StyledText>
              {errors.length > 0 && (
                <StyledText style={{color: 'red'}}>
                  {errors.join('\n')}
                </StyledText>
              )}
              <StyledTextInput
                onChangeText={t => setUsername(t)}
                value={username}
                placeholder="Username"
              />
              <StyledTextInput
                onChangeText={t => setFirstName(t)}
                value={firstName}
                placeholder="First Name"
              />
              <StyledTextInput
                onChangeText={t => setLastName(t)}
                value={lastName}
                placeholder="Last Name"
              />
              <StyledTextInput
                onChangeText={t => setEmail(t)}
                value={email}
                placeholder="Email"
              />
            </View>

            <StyledButton
              onPress={onSubmit}
              loading={loadingCreateTeam}
              error={!!errorCreateTeam}>
              Next Step
            </StyledButton>
            <StyledText style={{color: 'red', alignSelf: 'center'}}>
              {errorCreateTeam}
            </StyledText>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
