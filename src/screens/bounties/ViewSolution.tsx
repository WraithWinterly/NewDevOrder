import {Linking, Text, View} from 'react-native';
import Separator from 'src/components/ui/Separator';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import {Colors} from 'src/styles/styles';
import {fromFireDate, formatTimeAgo} from 'src/utils/utils';

export default function ViewSolution() {
  const selectedBounty = useBountyStore(state => state.selectedBounty);

  const repo = selectedBounty?.winningSubmission?.repo;
  const videoDemo = selectedBounty?.winningSubmission?.videoDemo;
  const submission = selectedBounty?.winningSubmission;
  return (
    <Layout>
      <StyledText style={{fontSize: 24, fontWeight: 'bold'}}>
        {selectedBounty?.title}
      </StyledText>
      {!!repo && !!videoDemo && submission && (
        <>
          <Separator />
          <View style={{gap: 12}}>
            <StyledText style={{fontSize: 28, color: Colors.Primary}}>
              {submission.team.name}
            </StyledText>
            <StyledText style={{fontSize: 14, color: Colors.Gray[400]}}>
              Submitted {formatTimeAgo(fromFireDate(submission.createdAt))}
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

            <Separator />
          </View>
        </>
      )}
    </Layout>
  );
}
