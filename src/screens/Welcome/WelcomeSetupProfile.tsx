import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/Main';
import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
import {NDO_TextInput} from 'src/components/ndo/NDO_TextInput';
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
          <NDO_Text type="header">Let's set up your profile.</NDO_Text>
          <NDO_TextInput
            onChangeText={t => setUsername(t)}
            value={username}
            placeholder="Username"
          />
          <NDO_TextInput
            onChangeText={t => setFirstName(t)}
            value={firstName}
            placeholder="First Name"
          />
          <NDO_TextInput
            onChangeText={t => setLastName(t)}
            value={lastName}
            placeholder="Last Name"
          />
          <NDO_TextInput
            onChangeText={t => setEmail(t)}
            value={email}
            placeholder="Email"
          />
          <NDO_TextInput
            onChangeText={t => setPassword(t)}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>

        <NDO_Button
          onPress={() => navigation.navigate('WelcomeMintMembershipToken')}>
          Next Step
        </NDO_Button>
      </View>
    </Layout>
  );
}
