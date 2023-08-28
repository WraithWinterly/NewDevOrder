import {View} from 'react-native';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import {useEffect, useId, useState} from 'react';
import {ScrollView} from 'react-native';
import TeamsIcon from 'src/components/icons/TeamsIcon';
import CalendarIcon from 'src/components/icons/CalendarIcon';
import CashIcon from 'src/components/icons/CashIcon';
import {Colors} from 'src/styles/styles';
import {didIApprove, fromFireDate, formatTimeAgo} from 'src/utils/utils';
import StyledButton from 'src/components/ui/styled/StyledButton';

import {StackParamList} from 'src/StackNavigator';

import useBountyStore from 'src/stores/bountyStore';
import Separator from 'src/components/ui/Separator';
import Bubble from 'src/components/ui/Bubble';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import useTeamsStore from 'src/stores/teamsStore';
import useProjectsStore from 'src/stores/projectsStore';
import useQuery from 'src/hooks/useQuery';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useMutation from 'src/hooks/usePost';
import {
  Bounty,
  BountyStage,
  CreateBountyPostData,
  Member,
  Project,
  RoleType,
  SetApproveBountyPostData,
  Submission,
} from 'src/sharedTypes';
import useSolanaContext from 'src/web3/SolanaProvider';
import StyledCheckbox from 'src/components/ui/styled/StyledCheckbox';
import useMemberStore from 'src/stores/membersStore';
import {DropdownSection} from 'src/components/ui/styled/StyledDropdown';
import BottomBar from 'src/components/ui/styled/BottomBar';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Props = NativeStackScreenProps<StackParamList, 'ViewBounty'>;

export default function ViewBounty({route, navigation}: Props) {
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const createBountyData = useBountyStore(state => state.createBountyData);
  const bounties = useBountyStore(state => state.bounties);
  const fetchBounties = useBountyStore(state => state.fetchBounties);
  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const setSelectedSubmission = useBountyStore(
    state => state.setSelectedSubmission,
  );

  const teams = useTeamsStore(state => state.teams);

  const myBountyWins = useMemberStore(state => state.myBountyWins);
  const playingRole = useMemberStore(state => state.myProfile)?.playingRole;

  const project = useProjectsStore(state => state.selectedProject);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );

  const createBounty = useMutation(getServerEndpoint(Endpoints.CREATE_BOUNTY));

  const setBountyApproval = useMutation(
    getServerEndpoint(Endpoints.SET_BOUNTY_APPROVAL),
  );

  const id = useId();
  const id2 = useId();
  const id3 = useId();

  const [startedByTeams, setStartedByTeams] = useState<string[]>([]);
  const [bounty, setBounty] = useState<
    (Bounty & {project: Project; founder: Member}) | undefined
  >(undefined);

  const existWinner =
    !!selectedBounty?.winningSubmissionID &&
    selectedBounty?.winningSubmissionID.length > 0;
  const thisBountyWin = myBountyWins?.find(
    win => win.bounty.id === selectedBounty?.id,
  );
  // console.log('mybountywins ', myBountyWins);

  const isValidator = playingRole === RoleType.BountyValidator ?? false;
  const isDesignerCreation = route.params?.isDesignerCreation ?? false;
  const isDesigner = playingRole === RoleType.BountyDesigner ?? false;

  const headerSections =
    (bounty?.headerSections as {[x: string]: string[]}) || {};

  useEffect(() => {
    if (isDesigner && isDesignerCreation && !!createBountyData) {
      setBounty(coerceIntoBounty());
    } else {
      setBounty(selectedBounty);
    }
  }, [isDesigner, selectedBounty, createBountyData]);

  useEffect(() => {
    updateStartedBy();
  }, [bounty, bounties, teams]);

  function updateStartedBy() {
    if (!bounties) return;
    if (!bounty) return;

    const localTeams: Array<string> = [];

    teams?.forEach(team => {
      if (bounty?.participantsTeamIDs.includes(team.id)) {
        localTeams.push(team.name);
      }
    });

    setStartedByTeams(localTeams);
  }

  async function onSubmitCreateBounty(draft: boolean) {
    if (!createBountyData) {
      console.error('No create bounty data');
      return;
    }
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }

    const body: CreateBountyPostData = {
      bounty: createBountyData,
      draft: draft === true ? true : false,
    };
    const data = await createBounty.mutate(body);
    if (data) {
      setSelectedProject(body.bounty.projectID);
      fetchBounties();
      navigation.navigate('DesignerWorkspaceNavigator');
    }
  }

  function coerceIntoBounty() {
    if (!createBountyData?.reward) {
      console.error("Error: Missing 'reward' in create bounty data!");
      return;
    }

    if (!createBountyData.deadline) {
      console.error("Error: Missing 'deadline' in create bounty data!");
      return;
    }

    if (!createBountyData.description) {
      console.error("Error: Missing 'description' in create bounty data!");
      return;
    }

    if (!createBountyData.title) {
      console.error("Error: Missing 'title' in create bounty data!");
      return;
    }

    if (!createBountyData.startDate) {
      console.error("Error: Missing 'startDate' in create bounty data!");
      return;
    }

    if (!project?.founder.walletAddress) {
      console.error('Error: Missing founder wallet address!');
      return;
    }

    return {
      id: '0',
      startDate: createBountyData.startDate,
      reward: createBountyData.reward,
      stage: BountyStage.Draft,
      title: createBountyData.title,
      types: createBountyData.types, // Assuming 'BountyType' is an enum type for type
      founderAddress: project.founder.walletAddress,
      description: createBountyData.description,
      deadline: createBountyData.deadline,
      approvedByFounder: false,
      approvedByManager: false,
      approvedByValidator: false,
      aboutProject: createBountyData.aboutProject,
      headerSections: createBountyData.headerSections,
      projectId: null, // Assuming it's null for now
      participantsTeamIDs: [],
      bountyWinnerID: '',
      submissionIDs: [],
      testCases: [],
      projectID: '',
      winningSubmissionID: '',
      project: {
        ...project,
      },
      founder: {
        ...project.founder,
      },
    } as Bounty & {
      project: Project;
      founder: Member;
    };
  }

  async function onSubmitToggleApproval() {
    if (!walletAddress) {
      console.error('No walletAddress');
      return;
    }
    if (!bounty?.id) {
      console.error('No bounty id');
      return;
    }
    if (!playingRole) {
      console.error('No playingRole');
      return;
    }
    if (!bounty?.projectID) {
      console.error('No projectId');
      return;
    }

    const body: SetApproveBountyPostData = {
      approve: !didIApprove(bounty, playingRole),
      bountyID: bounty.id,
    };
    const data = await setBountyApproval.mutate(body);
    if (data) {
      fetchBounties();
      setSelectedProject(bounty.projectID);
      setSelectedBounty(bounty.id);
    }
  }

  return (
    <Layout>
      <View style={{height: '100%'}}>
        <BottomBar>
          {isDesigner && isDesignerCreation && (
            // Create bounty buttons
            <View style={{gap: 12}}>
              <StyledButton
                type="normal2"
                onPress={() => onSubmitCreateBounty(true)}
                loading={createBounty.loading}
                error={!!createBounty.error}>
                {!!createBountyData?.id
                  ? 'Save Draft'
                  : 'Create and save as draft'}
              </StyledButton>
              <StyledButton
                onPress={() => onSubmitCreateBounty(false)}
                loading={createBounty.loading}
                error={!!createBounty.error}>
                {!!createBountyData?.id
                  ? 'Send for approval'
                  : 'Create and send for approval'}
              </StyledButton>
            </View>
          )}
          {(playingRole === RoleType.BountyManager ||
            playingRole === RoleType.Founder) &&
            existWinner &&
            bounty?.stage === 'Active' && (
              <StyledButton
                type="normal2"
                onPress={() => {
                  setSelectedSubmission(selectedBounty?.winningSubmissionID);
                  navigation.navigate('StartTestCases');
                }}>
                View and approve winner
              </StyledButton>
            )}
          {bounty?.stage === BountyStage.Completed && (
            <StyledButton
              onPress={() => {
                navigation.navigate('ViewSolution');
              }}>
              View Solution
            </StyledButton>
          )}
          {isValidator ? (
            <StyledButton
              type="normal2"
              onPress={() => navigation.navigate('ViewSubmissions')}>
              View submissions
            </StyledButton>
          ) : (
            playingRole === RoleType.BountyHunter && (
              <View style={{gap: 12}}>
                <StyledButton
                  type="normal2"
                  onPress={() => navigation.navigate('StartBounty')}>
                  {startedByTeams.length === 0
                    ? 'Start Bounty'
                    : 'Start bounty for another team'}
                </StyledButton>
                {startedByTeams.length > 0 && (
                  <StyledButton
                    type="normal2"
                    onPress={() => navigation.navigate('SubmitDeliverables')}>
                    Submit Deliverables
                  </StyledButton>
                )}

                {startedByTeams.length > 0 && (
                  <View style={{paddingLeft: 8}}>
                    <View style={{height: 4}}></View>

                    {/* Creates a comma seperated list (ex: Started by: My Team, Team2, Team3) etc */}
                    <StyledText key={`${0}-${id2}`}>
                      Started by:{' '}
                      {startedByTeams.map(
                        (team, i) =>
                          `${team}${
                            i === startedByTeams.length - 1 ? '' : ', '
                          }`,
                      )}
                    </StyledText>
                  </View>
                )}
              </View>
            )
          )}
        </BottomBar>
        <ScrollView>
          <View style={{flexDirection: 'column', gap: 10}}>
            {isDesigner && bounty?.stage === 'Draft' && (
              <View>
                <StyledText style={{fontSize: 24}}>
                  Review your bounty
                </StyledText>
                <StyledText>
                  This will be posted on the bounty feed when submitted and
                  reviewed
                </StyledText>
                <Separator />
              </View>
            )}
            {bounty?.stage === 'PendingApproval' && (
              <View>
                <StyledText style={{fontSize: 24}}>Pending Approval</StyledText>
                <StyledText>
                  Still waiting approval from the following members:
                </StyledText>
                <View style={{height: 24}} />
                <StyledCheckbox
                  value={bounty.approvedByFounder}
                  onValueChange={() => {}}
                  title="Founder"
                />
                <StyledCheckbox
                  value={bounty.approvedByManager}
                  onValueChange={() => {}}
                  title="Bounty Manager"
                />
                <StyledCheckbox
                  value={bounty.approvedByValidator}
                  onValueChange={() => {}}
                  title="Bounty Validator"
                />
                <View style={{height: 24}} />
                {(playingRole === RoleType.Founder ||
                  playingRole === RoleType.BountyManager ||
                  isValidator) && (
                  <StyledButton
                    loading={setBountyApproval.loading}
                    error={!!setBountyApproval.error}
                    onPress={() => {
                      onSubmitToggleApproval();
                    }}
                    type="normal2">
                    {didIApprove(bounty, playingRole) ? 'Unapprove' : 'Approve'}
                  </StyledButton>
                )}
                <Separator />
              </View>
            )}

            <StyledText
              style={{fontWeight: 'bold', fontSize: 28}}
              suspense
              trigger={bounty}
              shimmerWidth={160}>
              {bounty?.title}
            </StyledText>

            <StyledText
              style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}
              suspense
              trigger={bounty}>
              {formatTimeAgo(fromFireDate(bounty?.startDate))}
            </StyledText>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
              }}>
              <Bubble
                type="purple"
                text={bounty?.project?.title}
                suspense
                trigger={bounty}
              />

              {bounty?.stage === 'Active' && (
                <Bubble type="green" text="Accepting Submissions" />
              )}

              {bounty?.types.map((type, index) => (
                <Bubble
                  type="normal"
                  text={type}
                  key={`type-${index}-${id3}`}
                />
              ))}
            </View>
            {!!thisBountyWin && (
              <View style={{marginTop: 24, gap: 12}}>
                <StyledText>
                  🎉 Your team,{' '}
                  <StyledText style={{color: Colors.Primary}}>
                    {thisBountyWin?.team?.name}
                  </StyledText>
                  , won this bounty!
                </StyledText>
                <StyledButton
                  onPress={() => navigation.navigate('ClaimReward')}>
                  Claim reward now
                </StyledButton>
              </View>
            )}

            <View style={{height: 12}}></View>
            <DropdownSection title="Bounty Overview">
              <View style={{flexDirection: 'column', gap: 10}}>
                <StyledText suspense trigger={bounty}>
                  {bounty?.description}
                </StyledText>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                  }}>
                  <CashIcon />
                  <StyledText style={{fontWeight: '500'}}>
                    Bounty Reward:
                  </StyledText>
                  <StyledText
                    style={{fontWeight: '500'}}
                    suspense
                    trigger={bounty}>
                    {bounty?.reward} USD
                  </StyledText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                    paddingTop: 2,
                  }}>
                  <CalendarIcon />
                  <StyledText>Deadline:</StyledText>
                  <StyledText suspense trigger={bounty}>
                    {fromFireDate(bounty?.deadline)?.toDateString()}
                  </StyledText>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 6,
                    alignItems: 'center',
                  }}>
                  <TeamsIcon small />
                  <StyledText>
                    Teams Currently Hacking:{' '}
                    {bounty?.participantsTeamIDs?.length}
                  </StyledText>
                </View>
              </View>
            </DropdownSection>
            <DropdownSection title={`About ${bounty?.title}`}>
              <StyledText>{bounty?.aboutProject}</StyledText>
            </DropdownSection>

            {!!bounty?.headerSections &&
              Object.keys(bounty.headerSections).map((section, i) => (
                <DropdownSection title={section} key={`${id}-${i}`}>
                  {!!headerSections &&
                    headerSections &&
                    !!headerSections[section] &&
                    headerSections[section].map((text, index) => (
                      <StyledText key={index}>- {text}</StyledText>
                    ))}
                </DropdownSection>
              ))}

            {/* Founder */}

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Profile', {
                  viewProfileAddress: bounty?.founder?.walletAddress,
                })
              }
              style={{
                padding: 16,
                backgroundColor: Colors.BackgroundLighter,
                borderRadius: 20,
                marginBottom: 38,
              }}>
              <StyledText
                style={{fontSize: 20, fontWeight: 'bold'}}
                suspense
                trigger={bounty}
                shimmerWidth={240}>
                Meet the founder - {bounty?.founder?.firstName}
              </StyledText>
              <StyledText
                style={{color: Colors.Gray[400]}}
                suspense
                trigger={bounty}>
                {bounty?.founder?.username}
              </StyledText>
              <StyledText style={{paddingTop: 4}} suspense trigger={bounty}>
                {bounty?.founder?.bio}
              </StyledText>
            </TouchableOpacity>
          </View>

          <View style={{paddingVertical: 52}}></View>
        </ScrollView>
      </View>
    </Layout>
  );
}
