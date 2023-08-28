import {useEffect, useId, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native';
import MemberBox from 'src/components/MemberBox';
import SearchIcon from 'src/components/icons/SearchIcon';
import WarningIcon from 'src/components/icons/WarningIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useMutation from 'src/hooks/usePost';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {InviteToTeamPOSTData, Member, TeamInvite} from 'src/sharedTypes';
import useMemberStore from 'src/stores/membersStore';

import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function InviteMembers() {
  const [searchUsers, setSearchUsers] = useState('');

  const id = useId();
  const id2 = useId();

  const selectedTeam = useTeamsStore(state => state.selectedTeam);

  const myProfile = useMemberStore(state => state.myProfile);

  const [newInvitesMembers, setNewInvitesMembers] = useState<Member[]>([]);
  const [currentUser, setCurrentUser] = useState<Member>();

  const {
    data: dataMemberByID,
    loading: loadingMemberByID,
    error: errorMemberByID,
    query: queryMemberByID,
  } = useQuery();

  const {
    data: dataMembersByIDs,
    loading: loadingMembersByIDs,
    error: errorMembersByIDs,
    mutate: queryMembersByIDs,
  } = useMutation(getServerEndpoint(Endpoints.GET_MEMBERS_BY_WALLET_ADDRESSES));

  const {
    data: dataPendingInvites,
    loading: loadingPendingInvites,
    error: errorPendingInvites,
    query: queryPendingInvites,
  } = useQuery();

  const {
    data: dataInviteToTeam,
    loading: loadingInviteToTeam,
    error: errorInviteToTeam,
    mutate: mutateInviteToTeam,
  } = useMutation(getServerEndpoint(Endpoints.INVITE_TO_TEAM));

  const canInviteUser =
    !!currentUser &&
    !newInvitesMembers.includes(currentUser) &&
    selectedTeam?.members?.filter(
      member => member.walletAddress === currentUser.walletAddress,
    ).length === 0;

  useEffect(() => {
    fetchInvitedMembers();
  }, []);

  async function fetchInvitedMembers() {
    if (!!selectedTeam) {
      const url =
        getServerEndpoint(Endpoints.GET_TEAM_PENDING_INVITES) +
        `/${selectedTeam.id}`;

      const data = await queryPendingInvites(url);

      if (data) {
        const pendingInvites = data as TeamInvite[];

        const newMembersArr = pendingInvites.map(invite => {
          return invite.toMemberAddress;
        });
        const members = await queryMembersByIDs(newMembersArr);
        if (members) {
          setNewInvitesMembers(members);
        }
      }
    }
  }

  async function fetchUser() {
    if (!searchUsers.trim() || searchUsers.trim().length < 3) {
      return;
    }
    const url =
      getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) +
      `/${searchUsers.trim()}`;

    const data = await queryMemberByID(url);
    if (data) {
      const member = data as Member;
      setCurrentUser(member);
    }
  }

  async function inviteUser() {
    if (
      !currentUser?.walletAddress ||
      !selectedTeam?.id ||
      !myProfile?.walletAddress
    ) {
      console.error(
        'missing data, please refresh user / connect wallet',
        'selected user wallet',
        !!currentUser?.walletAddress,
        'selected team id ',
        !!selectedTeam?.id,
        'your wallet addres ',
        !!myProfile?.walletAddress,
      );
      return;
    }
    const body: InviteToTeamPOSTData = {
      toAddress: currentUser!.walletAddress,
      toTeam: selectedTeam!.id,
    };

    const data = await mutateInviteToTeam(body);
    if (data) {
      setNewInvitesMembers([...newInvitesMembers, currentUser!]);
      // fetchInvitedMembers();
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
        type="normal2"
        loading={loadingMemberByID}
        error={!!errorMemberByID}>
        Search user by wallet address
      </StyledButton>
      <View style={{height: 12}} />
      {!!currentUser && !loadingMemberByID && (
        <MemberBox member={currentUser} />
      )}
      {!!currentUser &&
        !loadingMemberByID &&
        (currentUser == null || !canInviteUser) && (
          <View style={{flexDirection: 'row', gap: 4, marginTop: 10}}>
            <WarningIcon />
            <StyledText>
              This user can not be invited because they are already part of the
              team.
            </StyledText>
          </View>
        )}
      {loadingMemberByID && <MemberBox member={undefined} />}
      {errorMemberByID && (
        <StyledText style={{color: Colors.Red[300]}}>
          {errorMemberByID}
        </StyledText>
      )}
      <View style={{height: 12}} />
      <StyledButton
        enabled={currentUser != null && canInviteUser}
        // enabled={currentUser != null && true}
        onPress={inviteUser}
        loading={loadingInviteToTeam}
        error={!!errorInviteToTeam}>
        Invite Member
      </StyledButton>

      <ScrollView>
        <View style={{gap: 12}}>
          {!!newInvitesMembers && newInvitesMembers.length > 0 && (
            <>
              <StyledText style={{marginTop: 12}}>Pending Invites</StyledText>
              <View style={{height: 12}} />
              {newInvitesMembers.map((member, i) => (
                <MemberBox member={member} key={`${id2}-${i}`} />
              ))}
            </>
          )}
        </View>
      </ScrollView>
    </Layout>
  );
}
