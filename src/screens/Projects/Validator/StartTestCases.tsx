import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TestCase} from 'prisma/generated';
import {useEffect, useId, useState} from 'react';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledCheckbox from 'src/components/ui/styled/StyledCheckbox';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/usePost';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {ApproveTestCasePostData} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';
import {Colors} from 'src/styles/styles';
import mutate from 'src/utils/mutate';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

type Props = NativeStackScreenProps<StackParamList, 'StartTestCases'>;
export default function StartTestCases({route, navigation}: Props) {
  const submissionID = route.params?.submissionID ?? '';
  const selectedFullBounty = useBountyStore(state => state.selectedBounty);
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const {data, query} = useQuery();

  const {
    data: dataSubmit,
    loading: loadingSubmit,
    error: errorSubmit,
    mutate: mutateSubmit,
  } = useMutation(getServerEndpoint(Endpoints.APPROVE_TEST_CASES));

  const [optimisticTestCases, setOptimisticTestCases] = useState<TestCase[]>(
    [],
  );

  const id = useId();

  useEffect(() => {
    if (!!data && Array.isArray(data)) {
      setOptimisticTestCases(data);
    }
  }, [data]);

  useEffect(() => {
    if (!!submissionID && !!walletAddress) {
      query(
        `${getServerEndpoint(
          Endpoints.GET_TEST_CASES,
        )}/${submissionID},${walletAddress}`,
      );
    } else {
    }
  }, [submissionID, walletAddress]);

  async function onSubmit() {
    if (!selectedFullBounty?.id) {
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
      navigation.navigate('ViewSubmissions');
    }
  }
  return (
    <Layout>
      <StyledText style={{fontSize: 24}}>
        Test Cases for{' '}
        <Text style={{color: Colors.Primary}}>
          {
            selectedFullBounty?.submissions?.filter(
              sub => sub.id === submissionID,
            )[0].team.name
          }
        </Text>
      </StyledText>
      <ProjBountyBreadcrumb bounty={selectedFullBounty} />
      <Separator />
      {optimisticTestCases.map((testCase, index) => (
        <View>
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
                const newTestCases = [...optimisticTestCases];
                newTestCases[index].approved = !newTestCases[index].approved;
                setOptimisticTestCases(newTestCases);
              }}
            />
          </View>
          <Separator />
        </View>
      ))}
      <StyledButton
        loading={loadingSubmit}
        error={!!errorSubmit}
        onPress={onSubmit}>
        Submit
      </StyledButton>
    </Layout>
  );
}
