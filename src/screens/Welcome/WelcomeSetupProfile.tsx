import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';

export default function WelcomeSetupProfile() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Layout>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 20,
          height: '85%',
        }}>
        <View style={{gap: 20}}>
          <StyledText type="header">Let's set up your profile.</StyledText>
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
          <StyledTextInput
            onChangeText={t => setPassword(t)}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <StyledButton
          onPress={() => navigation.navigate('WelcomeMintMembershipToken')}>
          Next Step
        </StyledButton>
      </View>
    </Layout>
  );
}
