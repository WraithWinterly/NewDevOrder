import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {Linking, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import CheckIcon from 'src/components/icons/CheckIcon';
import CollapsibleArrow from 'src/components/icons/CollapsibleArrow';
import DeleteIcon from 'src/components/icons/DeleteIcon';
import PlusIcon from 'src/components/icons/PlusIcon';
import WarningIcon from 'src/components/icons/WarningIcon';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import Separator from 'src/components/ui/Separator';
import BottomBar from 'src/components/ui/styled/BottomBar';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledCheckbox from 'src/components/ui/styled/StyledCheckbox';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useKeyboardVisible from 'src/hooks/useKeyboardVisible';
import useMutation from 'src/hooks/usePost';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {
  ApproveDisapproveBountyWinnerPostData,
  ApproveTestCasePostData,
  BountyStage,
  RoleType,
  SelectWinningSubmissionPostData,
  SubmissionState,
} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';
import useMemberStore from 'src/stores/membersStore';
import {Colors} from 'src/styles/styles';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import addSpaceCase from 'src/utils/utils';
import useSolanaContext from 'src/web3/SolanaProvider';

// type Props = NativeStackScreenProps<StackParamList, 'StartTestCases'>;
export default function StartTestCases() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const setSelectedSubmission = useBountyStore(
    state => state.setSelectedSubmission,
  );

  const selectedSubmission = useBountyStore(state => state.selectedSubmission);

  const playingRole = useMemberStore(state => state.myProfile)?.playingRole;

  const {
    data: dataSubmit,
    loading: loadingSubmit,
    error: errorSubmit,
    mutate: mutateSubmit,
  } = useMutation(getServerEndpoint(Endpoints.APPROVE_TEST_CASES));

  const {
    data: dataApproveDisapproveBountyWinner,
    loading: loadingApproveDisapproveBountyWinner,
    error: errorApproveDisapproveBountyWinner,
    mutate: mutateApproveDisapproveBountyWinner,
  } = useMutation(
    getServerEndpoint(Endpoints.APPROVE_DISAPPROVE_BOUNTY_WINNER),
  );

  const id = useId();
  const kbVisible = useKeyboardVisible();

  const [testCases, setTestCases] = useState<string[]>(
    selectedSubmission?.testCases || [],
  );

  const [addingTestCase, setAddingTestCase] = useState(false);

  const [newTestCase, setNewTestCase] = useState('');

  const isWinnerPending =
    !!selectedBounty &&
    selectedBounty.winningSubmissionID === selectedSubmission?.id &&
    selectedSubmission.state === SubmissionState.WinnerPendingConfirmation;

  const winnerExists =
    !!selectedBounty?.winningSubmissionID &&
    selectedBounty?.winningSubmissionID.length > 0;

  const isBountyValidator = playingRole === RoleType.BountyValidator;

  useEffect(() => {
    if (!!selectedSubmission && Array.isArray(selectedSubmission.testCases)) {
      setTestCases(selectedSubmission.testCases);
    }
  }, [selectedSubmission]);

  async function onSubmit({
    type,
  }: {
    type: 'approve' | 'reject' | 'approve-winner';
  }) {
    if (!selectedBounty?.id) {
      console.error('No bounty selected');
      return;
    }
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }
    if (!selectedSubmission?.id) {
      console.error('No submission ID');
      return;
    }
    if (!testCases) {
      console.error('No test cases');
      return;
    }
    const body: ApproveTestCasePostData = {
      submissionID: selectedSubmission.id,
      testCases: testCases,
      type,
      reason: 'Not implemented yet',
    };

    const data = await mutateSubmit(body);

    if (!!data) {
      setSelectedBounty(selectedBounty.id);
      setSelectedSubmission(selectedBounty.id);
      navigation.navigate('ViewSubmissions');
    }
  }

  async function onSubmitWinner() {
    if (!selectedBounty?.id) {
      console.error('No bounty selected');
      return;
    }
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }
    if (!selectedSubmission?.id) {
      console.error('No submission ID');
      return;
    }
    if (!testCases) {
      console.error('No test cases');
      return;
    }
    const body: SelectWinningSubmissionPostData = {
      submissionID: selectedSubmission.id,
    };

    const data = await mutateSubmit(body);
    if (data) {
      setSelectedBounty(selectedBounty.id);
      navigation.navigate('ViewSubmissions');
    }
  }

  async function approveDisapproveBountyWinner(approve: boolean) {
    if (!selectedBounty?.id) {
      console.error('No bounty selected');
      return;
    }
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }
    if (!selectedSubmission?.id) {
      console.error('No submission ID');
      return;
    }
    const body: ApproveDisapproveBountyWinnerPostData = {
      submissionID: selectedSubmission.id,
      approve,
    };
    const data = await mutateApproveDisapproveBountyWinner(body);
    if (data) {
      setSelectedBounty(selectedBounty.id);
      navigation.navigate('ViewBounty');
    }
  }

  return (
    <Layout>
      <View style={{height: '100%'}}>
        <ScrollView
          style={{marginBottom: isBountyValidator && !kbVisible ? 120 : 0}}>
          <StyledText style={{fontSize: 24}}>
            Test Cases for{' '}
            <Text style={{color: Colors.Primary}}>
              {selectedSubmission?.team.name}
            </Text>
          </StyledText>
          {!!selectedSubmission && (
            <>
              <ProjBountyBreadcrumb bounty={selectedBounty} />
              <StyledText style={{fontSize: 14, color: Colors.Gray[400]}}>
                Status: {addSpaceCase(selectedSubmission?.state)}
              </StyledText>
              <View style={{height: 12}} />
              <StyledText>
                Link to video demo:{' '}
                <Text
                  style={{textDecorationLine: 'underline'}}
                  onPress={() => Linking.openURL(selectedSubmission.videoDemo)}>
                  {selectedSubmission.videoDemo}
                </Text>
              </StyledText>
              {playingRole !== RoleType.Founder && (
                <StyledText>
                  Submission Link:{' '}
                  <Text
                    style={{textDecorationLine: 'underline'}}
                    onPress={() => Linking.openURL(selectedSubmission.repo)}>
                    {selectedSubmission.repo}
                  </Text>
                </StyledText>
              )}
            </>
          )}

          <Separator />

          {/* <View style={{height: 12}} /> */}

          {selectedBounty?.stage === 'Active' && (
            <>
              {isBountyValidator && (
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginHorizontal: 4,
                    paddingVertical: 8,
                    marginTop: 12,
                  }}
                  onPress={() => {
                    setAddingTestCase(prev => !prev);
                  }}>
                  <StyledText style={{color: Colors.Primary, fontSize: 18}}>
                    Add test case
                  </StyledText>

                  <PlusIcon accent />
                </TouchableOpacity>
              )}

              {addingTestCase && (
                <View style={{paddingTop: 8}}>
                  <StyledTextInput
                    onChangeText={e => setNewTestCase(e)}
                    value={newTestCase}
                    placeholder="Enter test case"
                  />
                  <View style={{height: 12}}></View>
                  <StyledButton
                    onPress={() => {
                      setTestCases([...testCases, newTestCase]);
                      setAddingTestCase(false);
                      setNewTestCase('');
                    }}>
                    Add
                  </StyledButton>
                </View>
              )}
              {isBountyValidator && <View style={{height: 24}} />}

              {testCases.map((testCase, index) => (
                <View
                  style={{gap: 10, marginTop: index === 0 ? -16 : 16}}
                  key={`${id}-${index}`}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      gap: 10,
                      marginTop: 12,
                    }}>
                    <View>
                      <StyledText style={{fontSize: 20, fontWeight: '500'}}>
                        Test Case {index + 1}
                      </StyledText>
                      <StyledText
                        style={{fontSize: 16, color: Colors.Gray[300]}}
                        key={index + 1}>
                        {testCase}
                      </StyledText>
                    </View>
                    {isBountyValidator && (
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 0,
                          paddingBottom: 8,
                        }}>
                        <TouchableOpacity
                          style={{padding: 20}}
                          onPress={() => {
                            // Swaps values with the string before it, if it is not the first index
                            const idx = testCases.findIndex(
                              t => t === testCase,
                            );
                            if (idx !== 0) {
                              const temp = testCases[idx];
                              testCases[idx] = testCases[idx - 1];
                              testCases[idx - 1] = temp;
                              setTestCases([...testCases]);
                            }
                          }}>
                          <CollapsibleArrow faceDown={false} wh={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{padding: 20}}
                          onPress={() => {
                            // Swaps values with the string after it, if it is not the last index
                            const idx = testCases.findIndex(
                              t => t === testCase,
                            );
                            if (idx !== testCases.length - 1) {
                              const temp = testCases[idx];
                              testCases[idx] = testCases[idx + 1];
                              testCases[idx + 1] = temp;
                              setTestCases([...testCases]);
                            }
                          }}>
                          <CollapsibleArrow faceDown wh={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={{padding: 12}}
                          onPress={() => {
                            setTestCases(testCases.filter(t => t !== testCase));
                          }}>
                          <DeleteIcon />
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>

                  <Separator customH={4} />
                </View>
              ))}
              {isWinnerPending && (
                <View>
                  <View style={{height: 24}} />
                  <StyledText style={{fontWeight: '500', fontSize: 18}}>
                    Accepting Status:
                  </StyledText>

                  <StyledCheckbox
                    title="Approved By Founder"
                    onValueChange={() => {}}
                    value={selectedSubmission.isWinnerApprovedByFounder}
                  />
                  <StyledCheckbox
                    title="Approved By Bounty Manager"
                    onValueChange={() => {}}
                    value={selectedSubmission.isWinnerApprovedByManager}
                  />
                  <View style={{height: 32}} />
                  {playingRole !== RoleType.BountyValidator &&
                    ((playingRole === RoleType.Founder &&
                      !selectedSubmission.isWinnerApprovedByFounder) ||
                      (playingRole === RoleType.BountyManager &&
                        !selectedSubmission.isWinnerApprovedByManager)) && (
                      <StyledButton
                        loading={loadingApproveDisapproveBountyWinner}
                        error={!!errorApproveDisapproveBountyWinner}
                        onPress={() => approveDisapproveBountyWinner(true)}
                        type="normal2">
                        Accept winner
                      </StyledButton>
                    )}
                  <View style={{height: 12}}></View>
                  <StyledButton
                    loading={loadingApproveDisapproveBountyWinner}
                    error={!!errorApproveDisapproveBountyWinner}
                    onPress={() => approveDisapproveBountyWinner(false)}
                    type="normal2">
                    Reject winner (no undo)
                  </StyledButton>
                  <Separator />
                </View>
              )}
            </>
          )}
          {selectedBounty?.stage === BountyStage.Completed && (
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
              <CheckIcon />
              <StyledText>
                Looks like this winner of the project has already been selected!
              </StyledText>
            </View>
          )}
        </ScrollView>
        {isBountyValidator && (
          <BottomBar>
            <View style={{gap: 12}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View style={{flex: 1}}>
                  <StyledButton
                    loading={loadingSubmit}
                    error={!!errorSubmit}
                    left={!isWinnerPending && !winnerExists}
                    onPress={() =>
                      onSubmit({
                        type: 'approve',
                      })
                    }
                    type="normal">
                    Update Test Cases
                  </StyledButton>
                </View>
                {!isWinnerPending && !winnerExists && (
                  <View style={{flex: 1}}>
                    <StyledButton
                      loading={loadingSubmit}
                      error={!!errorSubmit}
                      right
                      onPress={() =>
                        onSubmit({
                          type: 'approve-winner',
                        })
                      }
                      type="normal2">
                      Confirm as winner
                    </StyledButton>
                  </View>
                )}
              </View>

              <StyledButton
                loading={loadingSubmit}
                error={!!errorSubmit}
                onPress={() =>
                  onSubmit({
                    type: 'reject',
                  })
                }
                type="noBgDanger">
                Submit and Reject
              </StyledButton>
            </View>

            {selectedSubmission &&
              !isWinnerPending &&
              (selectedBounty?.winningSubmissionID.length || 0) > 0 && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 12,
                    alignItems: 'center',
                  }}>
                  <WarningIcon />
                  <StyledText>A winner was already chosen.</StyledText>
                </View>
              )}
          </BottomBar>
        )}
      </View>
    </Layout>
  );
}
