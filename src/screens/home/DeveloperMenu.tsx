import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useState} from 'react';
import {View} from 'react-native';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore, {RoleDict} from 'src/stores/membersStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function DeveloperMenu() {
  const [resetFeedback, setResetFeedback] = useState('');

  async function onResetWelcomeScreen() {
    await AsyncStorage.clear();
    setResetFeedback('Storage data erased. Restart the app.');
  }

  const myProfile = useMemberStore(state => state.myProfile);
  const setPlayingRole = useMemberStore(state => state.setPlayingRole);

  const [connectionFeedback, setConnectionFeedback] = useState('');
  async function testConnection() {
    setConnectionFeedback('Connecting...');

    try {
      const data = await axios.get(getServerEndpoint(Endpoints.ALIVE), {
        timeout: 3000,
      });
      if (data.data === 'Alive!') {
        setConnectionFeedback('Connected');
      } else {
        setConnectionFeedback(
          'Connected, but did not receive the correct data.',
        );
      }
    } catch (error) {
      const e = error as Error;
      setConnectionFeedback(`Connection failed: ${e.message}`);
    }
  }
  const [seedFeedback, setSeedFeedback] = useState('');
  async function seed() {
    setSeedFeedback('Seeding...');

    try {
      const data = await axios.get(getServerEndpoint(Endpoints.SEED), {
        timeout: 3000,
      });
      if (data.status === 200) {
        setSeedFeedback('Success');
      }
    } catch (error) {
      const e = error as Error;
      setSeedFeedback(`Connection failed: ${e.message}`);
    }
  }

  return (
    <Layout>
      <PhantomConnectButton successRoute="HomeNavigation" />
      <View style={{gap: 8, marginTop: 24}}>
        <StyledButton onPress={onResetWelcomeScreen}>
          Erase Storage Data
        </StyledButton>
        <StyledText style={{paddingBottom: 24}}>{resetFeedback}</StyledText>
        <StyledButton onPress={testConnection}>
          Test Server Connection
        </StyledButton>
        <StyledText style={{paddingBottom: 24}}>
          {connectionFeedback}
        </StyledText>
        <StyledButton onPress={seed}>Seed Database</StyledButton>
        <StyledText style={{paddingBottom: 24}}>{seedFeedback}</StyledText>
        <StyledText style={{paddingBottom: 2}}>Playing as role...</StyledText>
        <DropdownMenu
          data={RoleDict || []}
          onSelect={(itemID, itemIndex) => {
            // console.log(itemID);
            const role = RoleDict?.find(role => role.id == itemID);

            if (role) {
              setPlayingRole(role);
            }
          }}
          displayText={myProfile?.playingRole.title || ''}
          selectedValue={myProfile?.playingRole.id || ''}
        />
      </View>
    </Layout>
  );
}
