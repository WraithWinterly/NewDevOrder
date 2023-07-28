import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useId, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import CollapsibleArrow from 'src/components/icons/CollapsibleArrow';
import DeleteIcon from 'src/components/icons/DeleteIcon';
import PlusIcon from 'src/components/icons/PlusIcon';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import {Colors} from 'src/styles/styles';

export default function AddTestCases() {
  const selectedFullBounty = useBountyStore(state => state.selectedFullBounty);
  const [testCases, setTestCases] = useState<string[]>([]);
  const [addingTestCase, setAddingTestCase] = useState(false);

  const [newTestCase, setNewTestCase] = useState('');

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  return (
    <Layout>
      <ScrollView>
        <StyledText style={{fontSize: 26, fontWeight: 'bold'}}>
          Add test cases
        </StyledText>
        <StyledText>
          <Text style={{color: Colors.Gray[400]}}>
            {selectedFullBounty?.projectName} /{' '}
          </Text>{' '}
          {selectedFullBounty?.title}
        </StyledText>
        <Separator customH={16} />

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
          <View style={{gap: 10, paddingTop: 16}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 10,
                marginTop: 12,
              }}
              key={`${id}-${index}`}>
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
                    // console.log(idx);
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
                    // console.log(idx);
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
          onPress={() => {
            navigation.navigate('ValidatorNavigator');
          }}>
          Submit Test Cases
        </StyledButton>
        <View style={{height: 24}}></View>
      </ScrollView>
    </Layout>
  );
}
