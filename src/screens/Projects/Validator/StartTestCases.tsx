import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {Linking, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import ChangeIcon from 'src/components/icons/ChangeIcon';
import CheckIcon from 'src/components/icons/CheckIcon';
import CloseIcon from 'src/components/icons/CloseIcon';
import CollapsibleArrow from 'src/components/icons/CollapsibleArrow';
import DeleteIcon from 'src/components/icons/DeleteIcon';
import MinusIcon from 'src/components/icons/MinusIcon';
import PlusIcon from 'src/components/icons/PlusIcon';
import RedXIcon from 'src/components/icons/RedXIcon';
import WarningIcon from 'src/components/icons/WarningIcon';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import Separator from 'src/components/ui/Separator';
import BottomBar from 'src/components/ui/styled/BottomBar';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledCheckbox from 'src/components/ui/styled/StyledCheckbox';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useKeyboardVisible from 'src/hooks/useKeyboardVisible';
import useMutation from 'src/hooks/useMutation';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {
  ApproveDisapproveBountyWinnerPostData,
  ApproveTestCasePostData,
  BountyStage,
  RoleType,
  SelectWinningSubmissionPostData,
  SubmissionState,
  TestCase,
} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';
import useMemberStore from 'src/stores/membersStore';
import {Colors} from 'src/styles/styles';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import addSpaceCase from 'src/utils/utils';
import {v4 as uuid} from 'uuid';
// type Props = NativeStackScreenProps<StackParamList, 'StartTestCases'>;
export default function StartTestCases() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

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

  const [testCases, setTestCases] = useState<TestCase[]>(
    selectedSubmission?.testCases || [],
  );

  const [addingTestCase, setAddingTestCase] = useState(false);

  const [newTestCase, setNewTestCase] = useState<TestCase | undefined>(
    undefined,
  );

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
          style={{
            marginBottom:
              isBountyValidator && !kbVisible
                ? isWinnerPending
                  ? 42
                  : 120
                : 0,
          }}>
          <StyledText
            style={{fontSize: 24}}
            suspense
            trigger={selectedSubmission}
            shimmerWidth={240}>
            Test Cases for{' '}
            <Text style={{color: Colors.Primary}}>
              {selectedSubmission?.team.name}
            </Text>
          </StyledText>

          <ProjBountyBreadcrumb bounty={selectedBounty} />
          <StyledText
            style={{fontSize: 14, color: Colors.Gray[400]}}
            suspense
            trigger={selectedSubmission}
            shimmerWidth={120}>
            Status: {addSpaceCase(selectedSubmission?.state)}
          </StyledText>
          <View style={{height: 12}} />
          <StyledText suspense trigger={selectedSubmission} shimmerWidth={90}>
            Link to video demo:{' '}
            <Text
              style={{textDecorationLine: 'underline'}}
              onPress={() =>
                selectedSubmission?.videoDemo &&
                Linking.openURL(selectedSubmission.videoDemo)
              }>
              {selectedSubmission?.videoDemo}
            </Text>
          </StyledText>
          {playingRole !== RoleType.Founder && (
            <StyledText suspense trigger={selectedSubmission}>
              Submission Link:{' '}
              <Text
                style={{textDecorationLine: 'underline'}}
                onPress={() =>
                  selectedSubmission?.repo &&
                  Linking.openURL(selectedSubmission.repo)
                }>
                {selectedSubmission?.repo}
              </Text>
            </StyledText>
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
                    const id = uuid();
                    setNewTestCase({
                      id,
                      testCase: '',
                      status: 'unsure',
                    });
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
                    onChangeText={e =>
                      setNewTestCase(c => {
                        if (!!c) {
                          return {...c, testCase: e};
                        }
                        return undefined;
                      })
                    }
                    value={newTestCase?.testCase || ''}
                    placeholder="Enter test case"
                  />
                  <View style={{height: 12}}></View>
                  <StyledButton
                    onPress={() => {
                      if (!!testCases && !!newTestCase) {
                        setTestCases([...testCases, newTestCase]);
                      }

                      setAddingTestCase(false);
                      setNewTestCase(undefined);
                    }}>
                    Add
                  </StyledButton>
                </View>
              )}
              {isBountyValidator && <View style={{height: 24}} />}

              {testCases.map((testCase, index) => (
                <View
                  style={{marginTop: index === 0 ? 12 : 16}}
                  key={`${id}-${index}`}>
                  <View
                    style={{
                      flexDirection:
                        playingRole === RoleType.BountyValidator
                          ? 'column'
                          : 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 12,
                      paddingHorizontal: 8,
                    }}>
                    <View>
                      <StyledText
                        style={{
                          fontSize: 18,
                          fontWeight: '500',
                        }}>
                        {testCase.testCase}
                      </StyledText>
                      <StyledText
                        style={{fontSize: 12, color: Colors.Gray[300]}}
                        key={index + 1}>
                        Test Case {index + 1}
                      </StyledText>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 10,
                        // marginTop: 12,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                        }}>
                        {playingRole === RoleType.BountyValidator && (
                          <TouchableOpacity
                            style={{padding: 12}}
                            onPress={() => {
                              // Cycle between status
                              const idx = testCases.findIndex(
                                t => t.id === testCase.id,
                              );

                              if (typeof idx != 'undefined') {
                                const localTestCases = [...testCases];
                                const temp = localTestCases[idx];

                                temp.status =
                                  temp.status === 'unsure'
                                    ? 'passed'
                                    : temp.status === 'passed'
                                    ? 'failed'
                                    : 'unsure';
                                localTestCases[idx] = temp;
                                setTestCases([...localTestCases]);
                              }
                            }}>
                            <ChangeIcon />
                          </TouchableOpacity>
                        )}
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 8,
                          }}>
                          {playingRole === RoleType.BountyValidator && (
                            <StyledText
                              style={{fontSize: 14, color: Colors.Gray[300]}}>
                              {testCase.status.substring(0, 1).toUpperCase() +
                                testCase.status.substring(1)}
                            </StyledText>
                          )}
                          {testCase.status === 'unsure' ? (
                            <MinusIcon />
                          ) : testCase.status === 'passed' ? (
                            <CheckIcon />
                          ) : (
                            <RedXIcon />
                          )}
                          {playingRole != RoleType.BountyValidator && (
                            <StyledText
                              style={{fontSize: 14, color: Colors.Gray[300]}}>
                              {testCase.status.substring(0, 1).toUpperCase() +
                                testCase.status.substring(1)}
                            </StyledText>
                          )}
                        </View>
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
                                t => t.id === testCase.id,
                              );
                              if (idx !== 0) {
                                const localTestCases = [...testCases];
                                const temp = localTestCases[idx];

                                localTestCases[idx] = localTestCases[idx - 1];
                                localTestCases[idx - 1] = temp;
                                setTestCases([...localTestCases]);
                              }
                            }}>
                            <CollapsibleArrow faceDown={false} wh={20} />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{padding: 20}}
                            onPress={() => {
                              // Swaps values with the string after it, if it is not the last index
                              const idx = testCases.findIndex(
                                t => t.id === testCase.id,
                              );
                              if (idx !== testCases.length - 1) {
                                const localTestCases = [...testCases];
                                const temp = localTestCases[idx];
                                localTestCases[idx] = localTestCases[idx + 1];
                                localTestCases[idx + 1] = temp;
                                setTestCases([...localTestCases]);
                              }
                            }}>
                            <CollapsibleArrow faceDown wh={20} />
                          </TouchableOpacity>

                          <TouchableOpacity
                            style={{padding: 12}}
                            onPress={() => {
                              setTestCases(
                                testCases.filter(t => t !== testCase),
                              );
                            }}>
                            <DeleteIcon />
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </View>

                  <Separator customH={4} />
                </View>
              ))}
              <View style={{height: 24}}></View>
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
                        type="normal">
                        Accept winner
                      </StyledButton>
                    )}
                  <View style={{height: 42}}></View>
                  <StyledButton
                    loading={loadingApproveDisapproveBountyWinner}
                    error={!!errorApproveDisapproveBountyWinner}
                    onPress={() => approveDisapproveBountyWinner(false)}
                    type="noBgDanger">
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
        {isBountyValidator && !!selectedSubmission && (
          <BottomBar>
            <View style={{gap: 12}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'stretch',
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
                    {isWinnerPending ? 'Update Test Cases' : 'Approve'}
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
                      Confirm winner
                    </StyledButton>
                  </View>
                )}
              </View>
              {selectedSubmission?.state !=
                SubmissionState.WinnerPendingConfirmation && (
                <StyledButton
                  loading={loadingSubmit}
                  error={!!errorSubmit}
                  onPress={() =>
                    onSubmit({
                      type: 'reject',
                    })
                  }
                  type="noBgDanger">
                  Reject Submission
                </StyledButton>
              )}
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
