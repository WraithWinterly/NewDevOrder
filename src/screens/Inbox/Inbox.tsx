import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useId, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/usePost';
import Layout from 'src/layout/Layout';
import {JoinTeamPOSTData} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';

import useMemberStore from 'src/stores/membersStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function Inbox() {
  const id = useId();
  const id2 = useId();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setMemberAddrViewing = useMemberStore(state => state.fetchProfile);
  const setTeam = useTeamsStore(state => state.setSelectedTeam);
  const myProfile = useMemberStore(state => state.myProfile);
  const [refreshing, setRefreshing] = useState(false);
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);

  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);

  const wallet = useSolanaContext();
  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const myBountyWins = useMemberStore(state => state.myBountyWins);

  const {
    data: dataJoin,
    loading: loadingJoin,
    error: errorJoin,
    mutate: mutateJoin,
  } = useMutation(getServerEndpoint(Endpoints.JOIN_TEAM_FROM_INVITE));
  const {
    data: dataDeny,
    loading: loadingDeny,
    error: errorDeny,
    mutate: mutateDeny,
  } = useMutation(getServerEndpoint(Endpoints.DENY_TEAM_FROM_INVITE));

  const performingAction = loadingJoin || loadingDeny;

  async function joinInvite(teamID: string) {
    if (!myProfile?.walletAddress) return;
    if (performingAction) return;

    const body: JoinTeamPOSTData = {
      fromAddress: myProfile?.walletAddress,
      toTeamID: teamID,
    };

    const data = await mutateJoin(body);
    if (data) {
      navigation.navigate('TeamVar');
      // Refresh my profile (which will also refresh inbox)
      if (wallet.wallet?.publicKey.toBase58.toString()) {
        fetchMyProfile(wallet.wallet?.publicKey.toBase58().toString());
        // refresh teams as well
        await fetchTeams();
      }
      setSelectedTeam(teamID);
    }
  }

  async function denyInvite(teamID: string) {
    if (!myProfile?.walletAddress || performingAction) {
      console.error(
        'Cannot deny invite because you do not have a wallet address or are performing an action',
      );
      return;
    }

    const body: JoinTeamPOSTData = {
      fromAddress: myProfile?.walletAddress,
      toTeamID: teamID,
    };

    const data = await mutateDeny(body);
    if (data) {
      if (wallet.wallet?.publicKey.toBase58.toString()) {
        fetchMyProfile(wallet.wallet?.publicKey.toBase58().toString());
        // refresh teams as well
        fetchTeams();
      }
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
      {!!myBountyWins &&
        myBountyWins.map((bountyWin, index) => (
          <View
            style={{
              backgroundColor: Colors.BackgroundLighter,
              padding: 12,
              marginVertical: 8,
              borderRadius: 12,
              flexDirection: 'row',
              gap: 12,
            }}
            key={`${id2}-${index}-win`}>
            <View
              style={{
                width: 32,
                height: 32,
                backgroundColor: Colors.Gray[200],
                borderRadius: 50,
              }}></View>
            <View style={{flex: 1, gap: 12}}>
              <StyledText>
                Congratulations! Your team,{' '}
                <StyledText
                  style={{color: Colors.Primary}}
                  onPress={() => {
                    setTeam(bountyWin.submission.team.id);
                    navigation.navigate('TeamVar');
                  }}>
                  {bountyWin.submission.team.name},{' '}
                </StyledText>
                won the bounty:{' '}
                <StyledText
                  style={{color: Colors.Primary}}
                  onPress={() => {
                    setSelectedBounty(bountyWin.bountyId);
                    navigation.navigate('ViewBounty');
                  }}>
                  {' '}
                  {bountyWin.submission.bounty.title}
                </StyledText>
                {bountyWin.submission.team.creatorAddress !==
                  myProfile?.walletAddress &&
                  'Consult with your Team Owner to claim the reward.'}
              </StyledText>

              <StyledButton
                type="borderNoFill"
                onPress={() => {
                  setSelectedBounty(bountyWin.bountyId);
                  navigation.navigate('ViewBounty');
                }}>
                Claim reward
              </StyledButton>
            </View>
          </View>
        ))}
      {!!myProfile &&
        (myProfile.teamInvites?.length || 0) > 0 &&
        // <FlatList
        //   data={myProfile.teamInvites}
        //   keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
        //   refreshControl={
        //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   }
        //   renderItem={({item, index}) => (
        //     <View
        //       style={{
        //         backgroundColor: Colors.BackgroundLighter,
        //         padding: 12,
        //         marginVertical: 8,
        //         borderRadius: 12,
        //         flexDirection: 'row',
        //         gap: 12,
        //       }}>
        //       <View
        //         style={{
        //           width: 32,
        //           height: 32,
        //           backgroundColor: Colors.Gray[200],
        //           borderRadius: 50,
        //         }}></View>
        //       <View key={`${id}-${index}`} style={{width: '80%'}}>
        //         {(myProfile.teamInvites?.length || 0) > 0 && (
        //           <Text style={{fontSize: 16, lineHeight: 28}}>
        //             <Text
        //               onPress={() => {
        //                 setMemberAddrViewing(item.fromAddress);
        //                 navigation.navigate('Profile', {
        //                   viewProfileAddress: item.fromAddress,
        //                 });
        //               }}
        //               style={{color: Colors.Primary}}>
        //               {item.fromName}
        //             </Text>
        //             <Text> invited you to join their team, </Text>
        //             <Text
        //               onPress={() => {
        //                 setTeam(item.toTeamId);
        //                 navigation.navigate('TeamVar');
        //               }}
        //               style={{color: Colors.Primary}}>
        //               {item.toTeamName}
        //             </Text>
        //             .
        //           </Text>
        //         )}

        //         <View
        //           style={{
        //             flexDirection: 'row',
        //             marginVertical: 12,
        //             alignItems: 'center',
        //             gap: 16,
        //           }}>
        //           <StyledButton
        //             type="borderNoFill"
        //             loading={loadingJoin}
        //             enabled={!performingAction}
        //             error={!!errorJoin}
        //             onPress={() => joinInvite(item.toTeamId)}>
        //             <Text>Join Team</Text>
        //           </StyledButton>
        //           <StyledButton
        //             type="noBg"
        //             loading={loadingDeny}
        //             enabled={!performingAction}
        //             error={!!errorDeny}
        //             onPress={() => denyInvite(item.toTeamId)}>
        //             <Text style={{color: Colors.Red[300], fontWeight: '500'}}>
        //               Deny Invite
        //             </Text>
        //           </StyledButton>
        //         </View>
        //       </View>
        //     </View>
        //   )}
        // />
        myProfile.teamInvites?.map((item, index) => (
          <View
            style={{
              backgroundColor: Colors.BackgroundLighter,
              padding: 12,
              marginVertical: 8,
              borderRadius: 12,
              flexDirection: 'row',
              gap: 12,
            }}
            key={`${id}-${index}-invite`}>
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
                  loading={loadingJoin}
                  enabled={!performingAction}
                  error={!!errorJoin}
                  onPress={() => joinInvite(item.toTeamId)}>
                  <Text>Join Team</Text>
                </StyledButton>
                <StyledButton
                  type="noBg"
                  loading={loadingDeny}
                  enabled={!performingAction}
                  error={!!errorDeny}
                  onPress={() => denyInvite(item.toTeamId)}>
                  <Text style={{color: Colors.Red[300], fontWeight: '500'}}>
                    Deny Invite
                  </Text>
                </StyledButton>
              </View>
            </View>
          </View>
        ))}
    </Layout>
  );
}
