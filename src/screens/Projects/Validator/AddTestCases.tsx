import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useId, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import CollapsibleArrow from 'src/components/icons/CollapsibleArrow';
import DeleteIcon from 'src/components/icons/DeleteIcon';
import PlusIcon from 'src/components/icons/PlusIcon';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useMutation from 'src/hooks/usePost';
import Layout from 'src/layout/Layout';
import {SetTestCasesPostData} from 'src/sharedTypes';
import useBountyStore from 'src/stores/bountyStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function AddTestCases() {
  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const [testCases, setTestCases] = useState<string[]>(
    selectedBounty?.testCases || [],
  );
  const [addingTestCase, setAddingTestCase] = useState(false);

  const [newTestCase, setNewTestCase] = useState('');

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  const fetchBounties = useBountyStore(state => state.fetchBounties);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const addTestCases = useMutation(getServerEndpoint(Endpoints.ADD_TEST_CASES));
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  function validate() {
    if (testCases.length === 0) {
      return false;
    }
    return true;
  }

  async function onSubmit() {
    if (!validate()) {
      return;
    }
    if (!selectedBounty?.id) {
      console.error('No bounty selected');
      return;
    }
    if (!walletAddress) {
      console.error('No wallet address');
      return;
    }
    const body: SetTestCasesPostData = {
      bountyID: selectedBounty.id,
      testCases,
    };
    const data = await addTestCases.mutate(body);
    if (data) {
      fetchBounties();
      setSelectedBounty(selectedBounty.id);
      setSelectedProject(selectedBounty.project.id);
      navigation.navigate('ValidatorNavigator');
    }
  }

  return (
    <Layout>
      <ScrollView>
        <StyledText style={{fontSize: 26, fontWeight: 'bold'}}>
          Add test cases
        </StyledText>
        <ProjBountyBreadcrumb bounty={selectedBounty} />
        <Separator customH={16} />
        <StyledText>
          Warning! If you already added test cases, submitting will override all
          existing test cases, and all test cases you approved.
        </StyledText>
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
        <Separator customH={12} />
        {testCases.map((testCase, index) => (
          <View style={{gap: 10, paddingTop: 16}} key={`${id}-${index}`}>
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
                    //So what this does, it swaps values with the string before it, if it is not the first index
                    const idx = testCases.findIndex(t => t === testCase);
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
                    //So what this does, it swaps values with the string after it, if it is not the last index
                    const idx = testCases.findIndex(t => t === testCase);
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
            </View>

            <Separator customH={4} />
          </View>
        ))}
        <View style={{height: 64}}></View>
        <StyledButton
          type="normal2"
          onPress={onSubmit}
          enabled={validate()}
          loading={addTestCases.loading}
          error={!!addTestCases.error}>
          Submit Test Cases
        </StyledButton>
        <View style={{height: 24}}></View>
      </ScrollView>
    </Layout>
  );
}
