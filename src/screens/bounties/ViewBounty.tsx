import {View} from 'react-native';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import {useEffect, useId, useState} from 'react';
import {ScrollView} from 'react-native';
import TeamsIcon from 'src/components/icons/TeamsIcon';
import CalendarIcon from 'src/components/icons/CalendarIcon';
import CashIcon from 'src/components/icons/CashIcon';
import {Colors} from 'src/styles/styles';
import {didIApprove, formatTimeAgo} from 'src/utils/utils';
import StyledButton from 'src/components/ui/styled/StyledButton';

import {StackParamList} from 'src/StackNavigator';

import useBountyStore from 'src/stores/bountyStore';
import Separator from 'src/components/ui/Separator';
import Bubble from 'src/components/ui/Bubble';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import useTeamsStore from 'src/stores/teamsStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Bounty, Member, Project} from 'prisma/generated';
import useQuery from 'src/hooks/useQuery';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useMutation from 'src/hooks/usePost';
import {
  CreateBountyPostData,
  SetApproveBountyPostData,
  SubmitDraftBountyPostData,
} from 'src/sharedTypes';
import useSolanaContext from 'src/web3/SolanaProvider';
import StyledCheckbox from 'src/components/ui/styled/StyledCheckbox';
import useMemberStore from 'src/stores/membersStore';
import {RoleType} from 'prisma/generated';
import {DropdownSection} from 'src/components/ui/styled/StyledDropdown';
import {BountyStage} from 'prisma/generated';

type Props = NativeStackScreenProps<StackParamList, 'ViewBounty'>;

export default function ViewBounty({route, navigation}: Props) {
  const bounties = useBountyStore(state => state.bounties);
  const id = useId();
  const id2 = useId();
  const id3 = useId();
  const isValidator = route.params?.isValidator ?? false;
  const isDesignerCreation = route.params?.isDesignerCreation ?? false;
  const isDesigner = route.params?.isDesigner ?? false;

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const teams = useTeamsStore(state => state.teams);

  const [startedByTeams, setStartedByTeams] = useState<string[]>([]);

  const createBountyData = useBountyStore(state => state.createBountyData);
  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const selectedBountyWinner = useBountyStore(
    state => state.selectedBountyWinner,
  );

  const isWinner = selectedBountyWinner?.bountyId === selectedBounty?.id;
  const playingRole = useMemberStore(state => state.myProfile)?.playingRole;
  const project = useProjectsStore(state => state.selectedProject);
  const fetchBounties = useBountyStore(state => state.fetchBounties);
  const myBountyWins = useMemberStore(state => state.myBountyWins);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );

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

  const [bounty, setBounty] = useState<
    (Bounty & {project: Project; founder: Member}) | undefined
  >(undefined);

  const createBounty = useMutation(getServerEndpoint(Endpoints.CREATE_BOUNTY));
  const submitBountyDraft = useMutation(
    getServerEndpoint(Endpoints.SUBMIT_BOUNTY_DRAFT),
  );

  const setBountyApproval = useMutation(
    getServerEndpoint(Endpoints.SET_BOUNTY_APPROVAL),
  );
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);

  const thisBountyWin = myBountyWins?.find(
    win => win.bountyId === selectedBounty?.id,
  );

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
      walletAddress: walletAddress,
    };
    const data = await createBounty.mutate(body);
    if (data) {
      setSelectedProject(body.bounty.projectID);
      navigation.navigate('DesignerWorkspaceNavigator');
    }
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
    if (!bounty?.projectId) {
      console.error('No projectId');
      return;
    }

    const body: SetApproveBountyPostData = {
      approve: !didIApprove(bounty, playingRole),
      bountyID: bounty.id,
      walletAddress: walletAddress,
    };
    const data = await setBountyApproval.mutate(body);
    if (data) {
      fetchBounties();
      setSelectedProject(bounty.projectId);
      setSelectedBounty(bounty.id);
    }
  }

  async function onSubmitSendBounty() {
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }
    if (!bounty?.id) {
      console.error('No bounty id');
      return;
    }
    if (!bounty?.projectId) {
      console.error('No projectId');
      return;
    }
    const body: SubmitDraftBountyPostData = {
      bountyID: bounty?.id,
      walletAddress: walletAddress,
    };
    const data = await submitBountyDraft.mutate(body);
    if (data) {
      setSelectedProject(bounty.projectId);
      navigation.navigate('DesignerWorkspaceNavigator');
    }
  }

  useEffect(() => {
    if (isDesigner && isDesignerCreation && !!createBountyData) {
      setBounty(coerceIntoBounty());
    } else {
      setBounty(selectedBounty);
    }
  }, [isDesigner, selectedBounty, createBountyData]);

  function coerceIntoBounty() {
    if (!createBountyData?.amount) {
      console.error("Error: Missing 'amount' in create bounty data!");
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
      participantsTeamIDs: [],
      postDate: new Date(),
      reward: createBountyData.amount,
      stage: 'Draft', // Assuming 'BountyStage' is an enum type for stage
      title: createBountyData.title,
      types: createBountyData.types, // Assuming 'BountyType' is an enum type for type
      founderAddress: project.founder.walletAddress,
      description: createBountyData.description,
      deadline: createBountyData.deadline,
      approvedByFounder: false,
      approvedByManager: false,
      approvedByValidator: false,
      winningSubmissionId: '',
      testCases: [],
      aboutProject: createBountyData.description,
      submissions: [], // Assuming it's an empty array for now
      headerSections: createBountyData.headerSections,
      projectId: null, // Assuming it's null for now
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

  useEffect(() => {
    updateStartedBy();
  }, [bounty, bounties, teams]);

  const headerSections =
    (bounty?.headerSections as {[x: string]: string[]}) || {};

  return (
    <Layout>
      <View style={{height: '100%'}}>
        <View
          style={{
            position: 'absolute',
            bottom: -28,
            width: '110%',
            paddingHorizontal: 24,
            marginLeft: -18,
            paddingVertical: 14,
            // height: 42,
            backgroundColor: Colors.AppBar,
            zIndex: 1,
          }}>
          {isDesigner &&
            (isDesignerCreation ? (
              // Create bounty buttons
              <View style={{gap: 12}}>
                <StyledButton
                  type="normal2"
                  onPress={() => onSubmitCreateBounty(true)}
                  loading={createBounty.loading}
                  error={!!createBounty.error}>
                  Create and save as Draft
                </StyledButton>
                <StyledButton
                  onPress={() => onSubmitCreateBounty(false)}
                  loading={createBounty.loading}
                  error={!!createBounty.error}>
                  Create and send for approval
                </StyledButton>
              </View>
            ) : (
              // Send draft for approval button
              <View>
                {bounty?.stage === 'Draft' && (
                  <StyledButton
                    onPress={() => onSubmitSendBounty()}
                    loading={submitBountyDraft.loading}
                    error={!!submitBountyDraft.error}>
                    Send for approval
                  </StyledButton>
                )}
              </View>
            ))}
          {(playingRole === RoleType.BountyManager ||
            playingRole === RoleType.Founder) &&
            isWinner &&
            bounty?.stage === 'Active' && (
              <StyledButton
                type="normal2"
                onPress={() => {
                  navigation.navigate('StartTestCases', {
                    submissionID: selectedBounty?.submissions?.find(
                      submission =>
                        submission.id === selectedBountyWinner?.submissionId,
                    )!.id!,
                  });
                }}>
                View and approve winner
              </StyledButton>
            )}
          {bounty?.stage === BountyStage.Completed && (
            <StyledButton
              onPress={() => {
                // setSelectedFullBounty(bounty.id);
                navigation.navigate('ViewSolution');
              }}>
              View Solution
            </StyledButton>
          )}
          {isValidator
            ? bounty?.stage === 'Active' &&
              (bounty?.testCases.length === 0 ? (
                <StyledButton
                  type="normal2"
                  onPress={() => navigation.navigate('AddTestCases')}>
                  Add test cases
                </StyledButton>
              ) : (
                <StyledButton
                  type="normal2"
                  onPress={() => navigation.navigate('ViewSubmissions')}>
                  View submissions
                </StyledButton>
              ))
            : playingRole === RoleType.BountyHunter && (
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
              )}
        </View>
        <ScrollView>
          {!!bounty && (
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
                  <StyledText style={{fontSize: 24}}>
                    Pending Approval
                  </StyledText>
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
                    playingRole === RoleType.BountyValidator) && (
                    <StyledButton
                      loading={setBountyApproval.loading}
                      error={!!setBountyApproval.error}
                      onPress={() => {
                        onSubmitToggleApproval();
                      }}
                      type="normal2">
                      {didIApprove(bounty, playingRole)
                        ? 'Unapprove'
                        : 'Approve'}
                    </StyledButton>
                  )}
                  <Separator />
                </View>
              )}
              <StyledText style={{fontWeight: 'bold', fontSize: 28}}>
                {bounty.title}
              </StyledText>
              <StyledText
                style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
                {formatTimeAgo(bounty.postDate)}
              </StyledText>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 8,
                }}>
                <Bubble type="purple" text={bounty.project?.title} />

                {bounty.stage === 'Active' && (
                  <Bubble type="green" text="Accepting Submissions" />
                )}

                {bounty.types.map((type, index) => (
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
                      {thisBountyWin.submission.team.name},{' '}
                    </StyledText>
                    won this bounty!
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
                  <StyledText>{bounty.description}</StyledText>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'center',
                    }}>
                    <CashIcon />
                    <StyledText style={{fontWeight: '500'}}>
                      Bonty Reward: {bounty.reward} SOL
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
                    <StyledText>
                      Deadline: {new Date(bounty.deadline).toDateString()}
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
                      {bounty.participantsTeamIDs?.length}
                    </StyledText>
                  </View>
                </View>
              </DropdownSection>
              <DropdownSection title={`About ${bounty.title}`}>
                <StyledText>{bounty.aboutProject}</StyledText>
              </DropdownSection>

              {!!bounty.headerSections &&
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
              {!!bounty.founder && (
                <View
                  style={{
                    padding: 16,
                    backgroundColor: Colors.BackgroundLighter,
                    borderRadius: 20,
                    marginBottom: 38,
                  }}>
                  <StyledText style={{fontSize: 20, fontWeight: 'bold'}}>
                    Meet the founder - {bounty.founder?.firstName}
                  </StyledText>
                  <StyledText style={{color: Colors.Gray[400]}}>
                    {bounty.founder?.username}
                  </StyledText>
                  <StyledText style={{paddingTop: 4}}>
                    {bounty.founder?.bio}
                  </StyledText>
                </View>
              )}
            </View>
          )}
          <View style={{paddingVertical: 52}}></View>
        </ScrollView>
      </View>
    </Layout>
  );
}
