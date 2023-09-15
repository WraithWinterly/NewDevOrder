import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import CheckIcon from 'src/components/icons/CheckIcon';
import CheckIconAccent from 'src/components/icons/CheckIconAccent';
import CloseIcon from 'src/components/icons/CloseIcon';
import WarningIcon from 'src/components/icons/WarningIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/useMutation';
import Layout from 'src/layout/Layout';
import {
  JoinTeamPOSTData,
  NotificationType,
  RemoveNotificationPOSTData,
} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';
import useInboxStore from 'src/stores/inboxStore';

import useMemberStore from 'src/stores/membersStore';
import useProjectsStore from 'src/stores/projectsStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function Inbox() {
  const id = useId();
  const id2 = useId();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setTeam = useTeamsStore(state => state.setSelectedTeam);
  const myProfile = useMemberStore(state => state.myProfile);
  const [refreshing, setRefreshing] = useState(false);
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);

  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);

  const wallet = useSolanaContext();
  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const myBountyWins = useMemberStore(state => state.myBountyWins);

  const notifications = useInboxStore(state => state.notifications);
  const fetchNotifications = useInboxStore(state => state.fetchNotifications);
  const removeNotification = useInboxStore(state => state.removeNotification);
  const setNotificationCount = useInboxStore(
    state => state.setNotificationCount,
  );

  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );

  useEffect(() => {
    fetchNotifications();
  }, []);

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
    if (!myProfile?.id) return;
    if (performingAction) return;

    const body: JoinTeamPOSTData = {
      toTeamID: teamID,
    };

    const data = await mutateJoin(body);
    if (data) {
      navigation.navigate('TeamVar');
      // Refresh my profile (which will also refresh inbox)
      if (wallet.wallet?.publicKey.toBase58.toString()) {
        fetchMyProfile();
        // refresh teams as well
        await fetchTeams();
      }
      setSelectedTeam(teamID);
    }
  }

  async function denyInvite(teamID: string) {
    if (!myProfile?.id || performingAction) {
      console.error(
        'Cannot deny invite because you do not have a wallet address or are performing an action',
      );
      return;
    }

    const body: JoinTeamPOSTData = {
      toTeamID: teamID,
    };

    const data = await mutateDeny(body);
    if (data) {
      if (wallet.wallet?.publicKey.toBase58.toString()) {
        fetchMyProfile();
        // refresh teams as well
        fetchTeams();
      }
    }
  }
  const {
    data: dataRemoveNoti,
    loading: loadingRemoveNoti,
    error: errorRemoveNoti,
    mutate: mutateRemoveNoti,
  } = useMutation(getServerEndpoint(Endpoints.REMOVE_NOTIFICATION));
  function onDelete(id: string) {
    // remove from array with this ID
    removeNotification(id);
    mutateRemoveNoti({notificationID: id} as RemoveNotificationPOSTData);
  }

  useEffect(() => {
    setNotificationCount(
      notifications.length +
        (myBountyWins?.length || 0) +
        (myProfile?.teamInvites?.length || 0),
    );
  }, [notifications, myBountyWins, myProfile?.teamInvites]);

  function onRefresh() {
    // setRefreshing(true);
    // fetchNotifications().then(() => setRefreshing(false));
  }

  const areMessages =
    !!myBountyWins &&
    !!myProfile?.teamInvites &&
    (myProfile.teamInvites?.length > 0 || myBountyWins.length > 0);

  return (
    <Layout>
      <ScrollView>
        {areMessages && (
          <StyledText
            style={{fontWeight: '500', fontSize: 20, marginBottom: 8}}>
            Latest Messages
          </StyledText>
        )}

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
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 50,
                }}>
                <CheckIcon customSize={30} />
              </View>
              <View style={{flex: 1, gap: 12}}>
                <StyledText>
                  Congratulations! Your team,{' '}
                  <StyledText
                    style={{color: Colors.Primary}}
                    onPress={() => {
                      setTeam(bountyWin?.team?.id);
                      navigation.navigate('TeamVar');
                    }}>
                    {bountyWin?.team?.name.trim()},{' '}
                  </StyledText>
                  won the bounty:{' '}
                  <StyledText
                    style={{color: Colors.Primary}}
                    onPress={() => {
                      setSelectedBounty(bountyWin.bounty.id);
                      navigation.navigate('ViewBounty');
                    }}>
                    {bountyWin?.bounty.title.trim()}
                    {'. '}
                  </StyledText>
                  {bountyWin?.team.creatorID !== myProfile?.id &&
                    'Consult with your Team Owner to claim the reward.'}
                </StyledText>
                {bountyWin?.team.creatorID === myProfile?.id && (
                  <StyledButton
                    type="borderNoFill"
                    onPress={() => {
                      setSelectedBounty(bountyWin.bounty.id);
                      navigation.navigate('ViewBounty');
                    }}>
                    Claim reward
                  </StyledButton>
                )}
              </View>
            </View>
          ))}

        {!!myProfile &&
          (myProfile.teamInvites?.length || 0) > 0 &&
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
                  backgroundColor: Colors.Gray[800],
                  borderRadius: 50,
                }}>
                <WarningIcon />
              </View>
              <View key={`${id}-${index}`} style={{width: '80%'}}>
                {(myProfile.teamInvites?.length || 0) > 0 && (
                  <Text style={{fontSize: 16, lineHeight: 28}}>
                    <Text
                      onPress={() => {
                        navigation.navigate('Profile', {
                          viewProfileAddress: item.fromMemberID,
                        });
                      }}
                      style={{color: Colors.Primary}}>
                      {item.fromMemberName}
                    </Text>
                    <Text> invited you to join their team, </Text>
                    <Text
                      onPress={() => {
                        setTeam(item.toTeamID);
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
                    onPress={() => joinInvite(item.toTeamID)}>
                    <Text>Join Team</Text>
                  </StyledButton>
                  <StyledButton
                    type="noBg"
                    loading={loadingDeny}
                    enabled={!performingAction}
                    error={!!errorDeny}
                    onPress={() => denyInvite(item.toTeamID)}>
                    <Text style={{color: Colors.Red[300], fontWeight: '500'}}>
                      Deny Invite
                    </Text>
                  </StyledButton>
                </View>
              </View>
            </View>
          ))}

        {!!notifications &&
          notifications.map((notification, index) => (
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
                  backgroundColor: Colors.Gray[800],
                  borderRadius: 50,
                  flexDirection: 'row',
                }}>
                <WarningIcon />
              </View>
              {/* <StyledText>{notification.type}</StyledText> */}
              <View
                style={{
                  flex: 1,
                  gap: 12,
                  justifyContent: 'center',
                }}>
                {notification.type ===
                  NotificationType.ToBM_ProposalCreated && (
                  <>
                    <StyledText>
                      Proposal{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>{' '}
                      Was created.
                    </StyledText>
                  </>
                )}
                {notification.type === NotificationType.ToFounder_BMQuoted && (
                  <>
                    <StyledText>
                      You have been quoted by a Bounty Manager for{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>
                      .
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToFounder_BountyMgrDeclined && (
                  <>
                    <StyledText>
                      Your Proposal{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>{' '}
                      Was declined.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBMOfficer_FounderAcceptedQuote && (
                  <>
                    <StyledText>
                      Founder accepted quote to{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>
                      .
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBMBDFounder_ReadyForBountyDesign && (
                  <>
                    <StyledText>
                      The Project{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>{' '}
                      is ready for Bounty Design.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBMBVFounder_BountyNeedsApproval && (
                  <>
                    <StyledText>
                      The Bounty{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>{' '}
                      from{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>
                      is awaiting approval.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBMBDBVFounder_BountyApproved && (
                  <>
                    <StyledText>
                      Congrats! The Bounty{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>{' '}
                      from{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>
                      is was approved.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBV_SubmissionSubmitted && (
                  <>
                    <StyledText>
                      A submission for{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>{' '}
                      from{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>
                      is now available for validation.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBH_SubmissionApproved && (
                  <>
                    <StyledText>
                      Congrats! submission for{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>{' '}
                      was approved.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBH_SubmissionRejected && (
                  <>
                    <StyledText>
                      Your submission for{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>{' '}
                      was rejected.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBMFounder_WinnerSelected && (
                  <>
                    <StyledText>
                      A winner for the bounty{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>{' '}
                      from{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          navigation.navigate('PendingProposal');
                        }}>
                        {notification.projectName}
                      </StyledText>
                      was selected and is pending approval.
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBHBVOfficerFounder_WinnerApproved && (
                  <>
                    <StyledText>
                      Congrats! A winner was approved for the bounty{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>
                      .
                    </StyledText>
                  </>
                )}
                {notification.type ===
                  NotificationType.ToBMBVFounder_WinnerRejected && (
                  <>
                    <StyledText>
                      A winner was rejected for the bounty{' '}
                      <StyledText
                        style={{color: Colors.Primary}}
                        onPress={() => {
                          setSelectedProject(notification.projectID);
                          setSelectedBounty(notification.bountyID);
                          navigation.navigate('ViewBounty');
                        }}>
                        {notification.bountyName}
                      </StyledText>
                      .
                    </StyledText>
                  </>
                )}
              </View>
              <TouchableOpacity
                onPress={() => onDelete(notification.id)}
                style={{paddingTop: 4}}>
                <CloseIcon />
              </TouchableOpacity>
            </View>
          ))}
        {!areMessages && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 12,
              marginTop: -50,
              height: '100%',
            }}>
            {!myBountyWins || !myProfile?.teamInvites || !notifications ? (
              <ActivityIndicator color={Colors.Primary} />
            ) : (
              <>
                <CheckIconAccent />
                <StyledText>You're all caught up!</StyledText>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
