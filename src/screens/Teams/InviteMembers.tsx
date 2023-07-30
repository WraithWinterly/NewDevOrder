import axios from 'axios';
import {useEffect, useId, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import MemberBox from 'src/components/MemberBox';
import SearchIcon from 'src/components/icons/SearchIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import {InviteToTeamPOSTData, Member, Team} from 'src/sharedTypes';
import useMemberStore from 'src/stores/membersStore';

import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function InviteMembers() {
  const [searchUsers, setSearchUsers] = useState('');

  let invitedMembers: Member[] | undefined = [];
  const id = useId();
  const id2 = useId();
  const [currentUser, setCurrentUser] = useState<Member>();

  const [fetchUserError, setFetchUserError] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  const [inviteUserError, setInviteUserError] = useState(false);

  const [loadingInvite, setLoadingInvite] = useState(false);

  const selectedTeam = useTeamsStore(state => state.selectedTeam);

  const [newInvitesMembers, setNewInvitesMembers] = useState<Member[]>([]);
  console.log(newInvitesMembers);

  async function fetchInvitedMembers() {
    if (!!selectedTeam) {
      console.log(
        getServerEndpoint(Endpoints.GET_TEAM_BY_ID) + `/${selectedTeam.id}`,
      );
      const data = await axios.get(
        getServerEndpoint(Endpoints.GET_TEAM_BY_ID) + `/${selectedTeam.id}`,
      );

      console.log('ddd:', data);
      if (data.status === 200) {
        const team = data.data as Team;
        const newMembersArr = team.pendingInvites;

        // fetch member cards
        const memberData = await axios.post(
          getServerEndpoint(Endpoints.GET_MEMBERS_BY_WALLET_ADDRESSES),
          {
            addresses: newMembersArr || [],
          },
        );
        if (memberData.status === 200) {
          setNewInvitesMembers(memberData.data);
        }
      } else {
        console.error(data);
      }
    }
  }

  useEffect(() => {
    fetchInvitedMembers();
  }, []);

  const myProfile = useMemberStore(state => state.myProfile);

  async function fetchUser() {
    setLoadingUser(true);
    setFetchUserError(false);
    try {
      console.log(
        getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) +
          `/${searchUsers.trim()}`,
      );
      const data = await axios.get(
        getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) +
          `/${searchUsers.trim()}`,
      );

      if (data.status === 200) {
        setFetchUserError(false);
        setCurrentUser(data.data);
      } else {
        setFetchUserError(true);
      }
    } catch (e) {
      console.error(e);
      setFetchUserError(true);
    } finally {
      setLoadingUser(false);
    }
  }

  async function inviteUser() {
    setLoadingInvite(true);
    setInviteUserError(false);
    try {
      if (
        !currentUser?.walletAddress ||
        !selectedTeam?.id ||
        !myProfile?.walletAddress
      ) {
        console.error(
          'missing data',
          !!currentUser?.walletAddress,
          !!selectedTeam?.id,
          !!myProfile?.walletAddress,
        );
        return;
      }
      const body: InviteToTeamPOSTData = {
        fromAddress: myProfile!.walletAddress,
        toAddress: currentUser!.walletAddress,
        toTeam: selectedTeam!.id,
      };
      const data = await axios.post(
        getServerEndpoint(Endpoints.INVITE_TO_TEAM),
        body,
      );
      // console.log(data);

      if (data.status === 200) {
        setInviteUserError(false);
        fetchInvitedMembers();
      } else {
        setFetchUserError(true);
      }
    } catch (e) {
      console.error(e);
      setInviteUserError(true);
    } finally {
      setLoadingInvite(false);
    }
  }

  return (
    <Layout>
      <StyledTextInput
        value={searchUsers}
        onChangeText={e => setSearchUsers(e)}
        placeholder="Search Users"
        icon={<SearchIcon />}
      />
      <View style={{height: 12}} />
      <StyledButton
        enabled={searchUsers.length >= 3}
        onPress={fetchUser}
        loading={loadingUser}
        error={fetchUserError}>
        Search user by wallet address
      </StyledButton>
      <View style={{height: 12}} />
      {!!currentUser && <MemberBox member={currentUser} />}
      {fetchUserError && (
        <StyledText style={{color: Colors.Red[300]}}>User not found</StyledText>
      )}
      <View style={{height: 12}} />
      <StyledButton
        enabled={currentUser != null}
        onPress={inviteUser}
        loading={loadingInvite}
        error={inviteUserError}>
        Invite User
      </StyledButton>
      <StyledText style={{marginTop: 12}}>Pending Invites</StyledText>
      <View style={{height: 12}} />

      <ScrollView>
        <View style={{gap: 12}}>
          {!!newInvitesMembers &&
            newInvitesMembers.map((member, i) => (
              <MemberBox member={member} key={`${id2}-${i}`} />
            ))}
        </View>
      </ScrollView>

      <View style={{marginVertical: 8}}>
        {!!invitedMembers &&
          invitedMembers.map((member, i) => (
            <MemberBox
              member={member}
              key={`${i}-${id}`}
              rightChildren={
                <StyledText style={{color: Colors.Red[300]}}>
                  Remove Invite
                </StyledText>
              }
            />
          ))}
      </View>
    </Layout>
  );
}
