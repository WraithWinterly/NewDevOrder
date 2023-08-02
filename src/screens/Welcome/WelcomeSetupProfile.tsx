import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {CreateProfilePOSTData} from 'src/sharedTypes';
import useWalletStore from 'src/stores/walletStore';
import useSolanaContext from 'src/web3/SolanaProvider';
import axios from 'axios';

export default function WelcomeSetupProfile() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const {wallet} = useSolanaContext();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  async function onSubmit() {
    setIsLoading(true);
    setError('');
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
    try {
      const data = await axios.post(
        getServerEndpoint(Endpoints.CREATE_PROFILE),
        {
          username,
          firstName,
          lastName,
          email,
          walletAddress: wallet!.publicKey!.toBase58().toString(),
        },
      );
      if (data.status === 200) {
        navigation.replace('WelcomeComplete');
      } else {
        throw new Error('Something went wrong');
      }
    } catch (e) {
      if ((e as Error).message.length > 0) {
        setIsLoading(false);
        setError((e as Error).message);
        return;
      }
    }
  }

  const [noUserAccount, setNoUserAccount] = useState(false);

  useEffect(() => {
    axios
      .get(
        getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) +
          `/${wallet!.publicKey!.toBase58().toString()}`,
      )
      .then(res => {
        // You already have an account with us
        navigation.navigate('WelcomeComplete');
      })
      .catch(e => {
        setNoUserAccount(true);
      });
  }, []);

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
              {/* <StyledTextInput
                    onChangeText={t => setPassword(t)}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                  /> */}
            </View>

            <StyledButton onPress={onSubmit} loading={isLoading}>
              Next Step
            </StyledButton>
            <StyledText style={{color: 'red', alignSelf: 'center'}}>
              {error}
            </StyledText>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
