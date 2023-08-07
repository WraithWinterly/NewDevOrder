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
import {formatTimeAgo} from 'src/utils/utils';

export default function ViewSubmissions() {
  const selectedFullBounty = useBountyStore(state => state.selectedBounty);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  return (
    <Layout>
      <StyledText style={{fontSize: 24}}>Submissions</StyledText>
      <ProjBountyBreadcrumb bounty={selectedFullBounty} />
      <Separator />
      <ScrollView>
        {selectedFullBounty?.submissions?.map((submission, index) => (
          <View style={{gap: 12}} key={`submission-${id}-${index}`}>
            <StyledText
              key={index}
              style={{fontSize: 28, color: Colors.Primary}}>
              {submission.team.name}
            </StyledText>
            <StyledText style={{fontSize: 14, color: Colors.Gray[400]}}>
              Submitted {formatTimeAgo(submission.createdAt)}
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
              onPress={() =>
                navigation.navigate('StartTestCases', {
                  submissionID: submission.id,
                })
              }>
              Start Test Cases
            </StyledButton>

            <Separator />
          </View>
        ))}
      </ScrollView>
    </Layout>
  );
}
