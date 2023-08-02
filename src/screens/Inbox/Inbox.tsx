import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {useEffect, useId, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {InviteToTeamPOSTData, JoinTeamPOSTData} from 'src/sharedTypes';

import useMemberStore from 'src/stores/membersStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function Inbox() {
  const id = useId();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setMemberAddrViewing = useMemberStore(state => state.fetchProfile);
  const setTeam = useTeamsStore(state => state.setSelectedTeam);
  const myProfile = useMemberStore(state => state.myProfile);
  const [refreshing, setRefreshing] = useState(false);
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);

  const [loadingJoinTeam, setLoadingJoinTeam] = useState(false);
  const [errorJoinTeam, setErrorJoinTeam] = useState(false);

  const [loadingDenyTeam, setLoadingDenyTeam] = useState(false);
  const [errorDenyTeam, setErrorDenyTeam] = useState(false);

  const fetchProfile = useMemberStore(state => state.fetchProfile);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);

  const wallet = useSolanaContext();
  const fetchTeams = useTeamsStore(state => state.fetchTeams);

  const performingAction = loadingJoinTeam || loadingDenyTeam;

  async function joinInvite(teamID: string) {
    if (!myProfile?.walletAddress) return;
    if (performingAction) return;

    const body: JoinTeamPOSTData = {
      fromAddress: myProfile?.walletAddress,
      toTeamID: teamID,
    };
    setLoadingJoinTeam(true);
    try {
      const data = await axios.post(
        getServerEndpoint(Endpoints.JOIN_TEAM_FROM_INVITE),
        body,
      );
      if (data.status === 200) {
        navigation.navigate('TeamVar');
        // Refresh my profile (which will also refresh inbox)
        if (wallet.wallet?.publicKey.toBase58.toString()) {
          fetchMyProfile(wallet.wallet?.publicKey.toBase58().toString());
          // refresh teams as well
          await fetchTeams();
        }
        setSelectedTeam(teamID);
      } else {
        console.log(data);
        throw data;
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      setLoadingJoinTeam(false);
    }
  }

  async function denyInvite(teamID: string) {
    if (!myProfile?.walletAddress) return;
    if (performingAction) return;

    const body: JoinTeamPOSTData = {
      fromAddress: myProfile?.walletAddress,
      toTeamID: teamID,
    };
    setLoadingDenyTeam(true);
    try {
      const data = await axios.post(
        getServerEndpoint(Endpoints.DENY_TEAM_FROM_INVITE),
        body,
      );
      if (data.status === 200) {
        // Refresh my profile (which will also refresh inbox)
        if (wallet.wallet?.publicKey.toBase58.toString()) {
          fetchMyProfile(wallet.wallet?.publicKey.toBase58().toString());
          // refresh teams as well
          fetchTeams();
        }
      } else {
        console.log(data);
        throw data;
      }
    } catch (e) {
      console.log((e as Error).message);
    } finally {
      setLoadingDenyTeam(false);
    }
  }

  function onDelete() {
    // remove from array with this ID
    // removeNotification(noti.id);
  }

  function onRefresh() {
    // setRefreshing(true);
    // fetchNotifications().then(() => setRefreshing(false));
  }

  return (
    <Layout>
      <StyledText style={{fontWeight: '500', fontSize: 20, marginBottom: 8}}>
        Latest Messages
      </StyledText>
      {!!myProfile && (myProfile.teamInvites?.length || 0) > 0 && (
        <FlatList
          data={myProfile.teamInvites}
          keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => (
            <View
              style={{
                backgroundColor: Colors.BackgroundLighter,
                padding: 12,
                marginVertical: 8,
                borderRadius: 12,
                flexDirection: 'row',
                gap: 12,
              }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: Colors.Gray[200],
                  borderRadius: 50,
                }}></View>
              <View key={`${id}-${index}`} style={{width: '80%'}}>
                {(myProfile.teamInvites?.length || 0) > 0 && (
                  <Text style={{fontSize: 16, lineHeight: 28}}>
                    <Text
                      onPress={() => {
                        setMemberAddrViewing(item.fromAddress);
                        navigation.navigate('Profile', {
                          viewProfileAddress: item.fromAddress,
                        });
                      }}
                      style={{color: Colors.Primary}}>
                      {item.fromName}
                    </Text>
                    <Text> invited you to join their team, </Text>
                    <Text
                      onPress={() => {
                        setTeam(item.toTeamId);
                        navigation.navigate('TeamVar');
                      }}
                      style={{color: Colors.Primary}}>
                      {item.toTeamName}
                    </Text>
                    .
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 12,
                    alignItems: 'center',
                    gap: 16,
                  }}>
                  <StyledButton
                    type="borderNoFill"
                    loading={loadingJoinTeam}
                    enabled={!performingAction}
                    error={errorJoinTeam}
                    onPress={() => joinInvite(item.toTeamId)}>
                    <Text>Join Team</Text>
                  </StyledButton>
                  <StyledButton
                    type="noBg"
                    loading={loadingJoinTeam}
                    enabled={!performingAction}
                    error={errorJoinTeam}
                    onPress={() => denyInvite(item.toTeamId)}>
                    <Text style={{color: Colors.Red[300], fontWeight: '500'}}>
                      Deny Invite
                    </Text>
                  </StyledButton>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </Layout>
  );
}
