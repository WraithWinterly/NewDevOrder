import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import {View} from 'react-native';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import PhantomConnectButton from 'src/components/ui/PhantomConnectButton';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore, {RoleDict} from 'src/stores/membersStore';

export default function DeveloperMenu() {
  const [resetFeedback, setResetFeedback] = useState('');

  async function onResetWelcomeScreen() {
    await AsyncStorage.clear();
    setResetFeedback('Storage data erased. Restart the app.');
  }

  const myProfile = useMemberStore(state => state.myProfile);
  const setPlayingRole = useMemberStore(state => state.setPlayingRole);

  return (
    <Layout>
      <PhantomConnectButton successRoute="HomeNavigation" />
      <View style={{gap: 8, marginTop: 24}}>
        <StyledButton onPress={onResetWelcomeScreen}>
          Erase Storage Data
        </StyledButton>
        <StyledText style={{paddingBottom: 24}}>{resetFeedback}</StyledText>
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
