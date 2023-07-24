import {useState} from 'react';
import {View} from 'react-native';
import MemberBox from 'src/components/MemberBox';
import SearchIcon from 'src/components/icons/SearchIcon';
import StyledText from 'src/components/ui/styled/StyledText';
import {StyledTextInput} from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';

export default function InviteMembers() {
  const [searchUsers, setSearchUsers] = useState('');

  return (
    <Layout>
      <StyledTextInput
        value={searchUsers}
        onChangeText={e => setSearchUsers(e)}
        placeholder="Search Users"
        icon={<SearchIcon />}
      />
      <StyledText style={{marginTop: 12}}>Pending Invites</StyledText>
      <View style={{marginVertical: 8}}>
        <MemberBox
          member={{
            id: '999',
            name: 'John Doe',
            tag: '@johndoe',
            bio: '',
            level: '0',
            roles: ['Bounty Designer'],
            bountiesWon: 0,
            membersInvited: 0,
            teamsJoined: 0,
          }}
          rightChildren={
            <StyledText style={{color: Colors.Red[300]}}>
              Remove Invite
            </StyledText>
          }
        />
      </View>
    </Layout>
  );
}
