import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RoleType} from 'prisma/generated';
import {TestCase} from 'prisma/generated';
import {useEffect, useId, useState} from 'react';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import CheckIcon from 'src/components/icons/CheckIcon';
import WarningIcon from 'src/components/icons/WarningIcon';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledCheckbox from 'src/components/ui/styled/StyledCheckbox';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/usePost';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {
  ApproveDisapproveBountyWinnerPostData,
  ApproveTestCasePostData,
  SelectWinningSubmissionPostData,
} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';
import useMemberStore from 'src/stores/membersStore';
import {Colors} from 'src/styles/styles';
import mutate from 'src/utils/mutate';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

type Props = NativeStackScreenProps<StackParamList, 'StartTestCases'>;
export default function StartTestCases({route, navigation}: Props) {
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const selectedBountyWinner = useBountyStore(
    state => state.selectedBountyWinner,
  );

  const playingRole = useMemberStore(state => state.myProfile)?.playingRole;

  const {data: dataTestCases, query: queryTestCases} = useQuery();

  const {
    data: dataSelectWinner,
    loading: loadingSelectWinner,
    error: errorSelectWinner,
    mutate: mutateSelectWinner,
  } = useMutation(
    getServerEndpoint(Endpoints.VALIDATOR_SELECT_WINNING_SUBMISSION),
  );

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

  const [optimisticTestCases, setOptimisticTestCases] = useState<TestCase[]>(
    [],
  );

  const submissionID = route.params?.submissionID ?? '';

  const isWinner =
    !!selectedBountyWinner &&
    selectedBountyWinner.submissionId === submissionID;

  const isBountyValidator = playingRole === RoleType.BountyValidator;

  useEffect(() => {
    if (!!dataTestCases && Array.isArray(dataTestCases)) {
      setOptimisticTestCases(dataTestCases);
    }
  }, [dataTestCases]);

  useEffect(() => {
    if (!!submissionID && !!walletAddress) {
      queryTestCases(
        `${getServerEndpoint(
          Endpoints.GET_TEST_CASES,
        )}/${submissionID},${walletAddress}`,
      );
    } else {
    }
  }, [submissionID, walletAddress]);

  async function onSubmit() {
    if (!selectedBounty?.id) {
      console.error('No bounty selected');
      return;
    }
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }
    if (!submissionID) {
      console.error('No submission ID');
      return;
    }
    if (!optimisticTestCases) {
      console.error('No test cases');
      return;
    }
    const body: ApproveTestCasePostData = {
      submissionID,
      testCases: optimisticTestCases,
      walletAddress,
    };

    const data = await mutateSubmit(body);

    if (data) {
      setSelectedBounty(selectedBounty.id);
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
    if (!submissionID) {
      console.error('No submission ID');
      return;
    }
    if (!optimisticTestCases) {
      console.error('No test cases');
      return;
    }
    const body: SelectWinningSubmissionPostData = {
      submissionID,
      walletAddress,
    };

    const data = await mutateSelectWinner(body);
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
    if (!submissionID) {
      console.error('No submission ID');
      return;
    }
    const body: ApproveDisapproveBountyWinnerPostData = {
      submissionID,
      approve,
      walletAddress,
    };
    const data = await mutateApproveDisapproveBountyWinner(body);
    if (data) {
      setSelectedBounty(selectedBounty.id);
      navigation.navigate('ViewSubmissions');
    }
  }

  return (
    <Layout>
      <StyledText style={{fontSize: 24}}>
        Test Cases for{' '}
        <Text style={{color: Colors.Primary}}>
          {
            selectedBounty?.submissions?.filter(
              sub => sub.id === submissionID,
            )[0].team.name
          }
        </Text>
      </StyledText>
      <ProjBountyBreadcrumb bounty={selectedBounty} />
      <Separator />
      {selectedBounty?.stage === 'Active' && (
        <>
          {optimisticTestCases.map((testCase, index) => (
            <View key={`test-case-${id}-${index}`}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <StyledText style={{fontSize: 24}}>
                    Test Case {index + 1}
                  </StyledText>
                  <StyledText>{testCase.text}</StyledText>
                </View>

                <StyledCheckbox
                  title=""
                  value={testCase.approved}
                  onValueChange={() => {
                    if (!isBountyValidator) return;
                    const newTestCases = [...optimisticTestCases];
                    newTestCases[index].approved =
                      !newTestCases[index].approved;
                    setOptimisticTestCases(newTestCases);
                  }}
                />
              </View>
              <Separator />
            </View>
          ))}
          {isBountyValidator && (
            <StyledButton
              loading={loadingSubmit}
              error={!!errorSubmit}
              onPress={onSubmit}>
              Submit
            </StyledButton>
          )}

          <View style={{height: 32}} />
          {isWinner && (
            <View>
              <StyledText style={{fontWeight: '500', fontSize: 18}}>
                Accepting Status:
              </StyledText>

              <StyledCheckbox
                title="Approved By Founder"
                onValueChange={() => {}}
                value={selectedBountyWinner.approvedByFounder}
              />
              <StyledCheckbox
                title="Approved By Bounty Manager"
                onValueChange={() => {}}
                value={selectedBountyWinner.approvedByManager}
              />
              <View style={{height: 32}} />
              {playingRole !== RoleType.BountyValidator &&
                ((playingRole === RoleType.Founder &&
                  !selectedBountyWinner.approvedByFounder) ||
                  (playingRole === RoleType.BountyManager &&
                    !selectedBountyWinner.approvedByManager)) && (
                  <StyledButton
                    loading={loadingApproveDisapproveBountyWinner}
                    error={!!errorApproveDisapproveBountyWinner}
                    onPress={() => approveDisapproveBountyWinner(true)}
                    type="normal2">
                    Accept winner
                  </StyledButton>
                )}
              <View style={{height: 64}}></View>
              <StyledButton
                loading={loadingApproveDisapproveBountyWinner}
                error={!!errorApproveDisapproveBountyWinner}
                onPress={() => approveDisapproveBountyWinner(false)}
                type="normal2">
                Reject winner
              </StyledButton>
            </View>
          )}
          {!selectedBountyWinner && (
            <StyledButton
              loading={loadingSelectWinner}
              error={!!errorSelectWinner}
              onPress={onSubmitWinner}
              type="normal2">
              Confirm as winner
            </StyledButton>
          )}

          {selectedBountyWinner && !isWinner && (
            <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
              <WarningIcon />
              <StyledText>A winner was already chosen.</StyledText>
            </View>
          )}
        </>
      )}
      {selectedBounty?.stage === 'Completed' && (
        <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
          <CheckIcon />
          <StyledText>
            Looks like this winner of the project has already been selected!
          </StyledText>
        </View>
      )}
    </Layout>
  );
}
