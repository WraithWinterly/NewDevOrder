import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useId} from 'react';
import {Linking, ScrollView, Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import {Colors} from 'src/styles/styles';
import addSpaceCase, {fromFireDate, formatTimeAgo} from 'src/utils/utils';

export default function ViewSubmissions() {
  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const setSelectedSubmission = useBountyStore(
    state => state.setSelectedSubmission,
  );
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();

  return (
    <Layout>
      <StyledText style={{fontSize: 28}}>Submissions</StyledText>
      <ProjBountyBreadcrumb bounty={selectedBounty} />
      <Separator />
      <ScrollView>
        {selectedBounty?.submissions?.map((submission, index) => (
          <View style={{gap: 12}} key={`submission-${id}-${index}`}>
            <StyledText
              key={index}
              style={{fontSize: 28, color: Colors.Primary}}>
              {submission.team?.name}
            </StyledText>
            <StyledText style={{fontSize: 14, color: Colors.Gray[400]}}>
              Submitted {formatTimeAgo(fromFireDate(submission.createdAt))}
            </StyledText>

            <StyledText style={{fontSize: 14, color: Colors.Gray[400]}}>
              Status: {addSpaceCase(submission?.state)}
            </StyledText>
            <StyledText>
              Link to video demo:{' '}
              <Text
                style={{textDecorationLine: 'underline'}}
                onPress={() => Linking.openURL(submission.videoDemo)}>
                {submission.videoDemo}
              </Text>
            </StyledText>
            <StyledText>
              Submission Link:{' '}
              <Text
                style={{textDecorationLine: 'underline'}}
                onPress={() => Linking.openURL(submission.repo)}>
                {submission.repo}
              </Text>
            </StyledText>
            <View style={{height: 12}} />
            <StyledButton
              type="borderNoFill"
              onPress={() => {
                setSelectedSubmission(submission.id);
                navigation.navigate('StartTestCases');
              }}>
              Start Test Cases
            </StyledButton>

            <Separator />
          </View>
        ))}
        {selectedBounty?.submissions?.length === 0 && (
          <StyledText
            style={{
              fontSize: 20,
              fontWeight: '500',
              marginTop: 24,
              alignSelf: 'center',
            }}>
            There are currently no submissions
          </StyledText>
        )}
      </ScrollView>
    </Layout>
  );
}
