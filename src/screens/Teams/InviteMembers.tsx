import {useEffect, useId, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native';
import MemberBox from 'src/components/MemberBox';
import CleanIcon from 'src/components/icons/CleanIcon';
import SearchIcon from 'src/components/icons/SearchIcon';
import WarningIcon from 'src/components/icons/WarningIcon';
import Bubble from 'src/components/ui/Bubble';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useMutation from 'src/hooks/useMutation';
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
  const [currentUsers, setCurrentUsers] = useState<Member[]>();

  const {
    data: dataMemberByID,
    loading: loadingMemberByID,
    error: errorMemberByID,
    query: queryMemberByID,
    clearError: clearErrorMemberByID,
  } = useQuery();
  const {
    data: dataMembersByUsername,
    loading: loadingMembersByUsername,
    error: errorMembersByUsername,
    query: queryMembersByUsername,
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

  const isPartOfTeam = (member: Member) => {
    return (
      (selectedTeam?.members?.filter(m => m.id === member.id).length || 0) > 0
    );
  };
  const isPartOfInvites = (member: Member) => {
    return (
      dataPendingInvites
        ?.map((invite: TeamInvite) => invite.toMemberID)
        .includes(member.id) ||
      newInvitesMembers?.map((member: Member) => member.id).includes(member.id)
    );
  };
  const canInvite = (member: Member) => {
    return !!currentUsers && !isPartOfTeam(member) && !isPartOfInvites(member);
  };

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
          return invite.toMemberID;
        });
        const members = await queryMembersByIDs(newMembersArr);
        if (members) {
          setNewInvitesMembers(members);
        }
      }
    }
  }

  async function fetchUser(type: 'wallet' | 'username') {
    setCurrentUsers(undefined);
    clearErrorMemberByID();
    if (!searchUsers.trim() || searchUsers.trim().length < 3) {
      return;
    }
    if (type === 'wallet') {
      const url =
        getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) +
        `/${searchUsers.trim()}`;

      const data = await queryMemberByID(url);

      if (data) {
        const member = data as Member;
        setCurrentUsers(!!member ? [member] : undefined);
      }
    } else if (type === 'username') {
      const url =
        getServerEndpoint(Endpoints.GET_MEMBERS_BY_USERNAME) +
        `/${searchUsers.trim()}`;

      const data = (await queryMembersByUsername(url)) as Member[];

      if (data) {
        setCurrentUsers(data);
      }
    }
  }

  async function inviteUser(member: Member) {
    if (!member || !member.id || !selectedTeam?.id || !myProfile?.id) {
      console.error(
        'missing data, please refresh user / connect wallet',
        'selected user wallet',
        !!member?.id,
        'selected team id ',
        !!selectedTeam?.id,
        'your wallet address ',
        !!myProfile?.id,
      );
      return;
    }
    const body: InviteToTeamPOSTData = {
      toMemberID: member.id,
      toTeamID: selectedTeam!.id,
    };

    const data = await mutateInviteToTeam(body);
    if (data) {
      setNewInvitesMembers([...newInvitesMembers, member]);
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
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          alignItems: 'center',
          gap: 0,
        }}>
        <View style={{flex: 1}}>
          <StyledButton
            enabled={searchUsers.length >= 3}
            onPress={() => fetchUser('username')}
            type="normal"
            left
            loading={loadingMembersByUsername}
            error={!!errorMembersByUsername}>
            By username
          </StyledButton>
        </View>
        <View style={{flex: 1}}>
          <StyledButton
            enabled={searchUsers.length >= 3}
            onPress={() => fetchUser('wallet')}
            type="normal2"
            right
            loading={loadingMemberByID}
            error={!!errorMemberByID}>
            By wallet
          </StyledButton>
        </View>

        {(!!currentUsers || errorMemberByID) && (
          <TouchableOpacity
            style={{marginLeft: 12}}
            onPress={() => {
              setCurrentUsers(undefined);
              clearErrorMemberByID();
              setSearchUsers('');
            }}>
            <CleanIcon />
          </TouchableOpacity>
        )}
      </View>

      <View style={{height: 12}} />
      <View>
        {!!currentUsers && !loadingMemberByID && (
          <View style={{gap: 14}}>
            <StyledText style={{marginTop: 24}}>Search Results</StyledText>
            <View
              style={{
                padding: 8,
                backgroundColor: Colors.BackgroundBrown,
                borderRadius: 12,
                gap: 8,
              }}>
              {currentUsers.map(member => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                  }}
                  key={`${id}-${member.id}`}>
                  <View style={{flex: 1}}>
                    <MemberBox
                      member={member}
                      rightChildren={
                        <StyledText>
                          {myProfile?.id === member.id
                            ? 'Me'
                            : isPartOfInvites(member)
                            ? 'Pending Invite'
                            : isPartOfTeam(member)
                            ? 'Team member'
                            : ''}
                        </StyledText>
                      }
                    />
                  </View>

                  {canInvite(member) && (
                    <Bubble
                      text={loadingInviteToTeam ? undefined : ' Invite '}
                      type="transparent"
                      suspense
                      trigger={loadingInviteToTeam ? null : {}}
                      isButton
                      onPress={() => {
                        if (loadingInviteToTeam) return;
                        inviteUser(member);
                      }}
                    />
                  )}
                </View>
              ))}
              {currentUsers.length === 0 && (
                <StyledText style={{marginVertical: 12, paddingLeft: 4}}>
                  No results
                </StyledText>
              )}
            </View>
          </View>
        )}
      </View>

      {/* {!!currentUsers &&
        !loadingMemberByID &&
        (currentUsers == null || !canInviteUser) && (
          <View
            style={{
              flexDirection: 'row',
              gap: 4,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <WarningIcon />
            <StyledText>
              This user can not be invited because they are already part of the
              team.
            </StyledText>
          </View>
        )} */}
      {!!errorInviteToTeam && (
        <View
          style={{
            flexDirection: 'row',
            gap: 4,
            marginTop: 10,
            alignItems: 'center',
          }}>
          <WarningIcon />
          <StyledText>{errorInviteToTeam}</StyledText>
        </View>
      )}
      {(loadingMemberByID || loadingMembersByUsername) && (
        <MemberBox member={undefined} />
      )}
      {errorMemberByID && (
        <StyledText style={{color: Colors.Red[300]}}>
          {errorMemberByID}
        </StyledText>
      )}
      <View style={{height: 12}} />
      {/* <StyledButton
        enabled={currentUsers != null && canInviteUser}
        onPress={inviteUser}
        loading={loadingInviteToTeam}
        error={!!errorInviteToTeam}>
        Invite Member
      </StyledButton> */}

      <ScrollView>
        <View style={{gap: 12}}>
          {!!newInvitesMembers && newInvitesMembers.length > 0 && (
            <>
              <StyledText style={{marginTop: 24}}>Pending Invites</StyledText>
              <View style={{marginTop: -14}} />
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
