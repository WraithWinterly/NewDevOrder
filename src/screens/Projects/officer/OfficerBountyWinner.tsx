import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import MemberBox from 'src/components/MemberBox';
import BackArrow from 'src/components/icons/BackArrow';
import CopyIcon from 'src/components/icons/CopyIcon';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';

import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/useMutation';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

import Clipboard from '@react-native-clipboard/clipboard';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import useBountyStore from 'src/stores/bountyStore';
import useProjectsStore from 'src/stores/projectsStore';
import {
  FounderConfirmPayPostData,
  OfficerConfirmBountyWinnerPOSTData,
} from 'src/sharedTypes';
import useOfficerStore from 'src/stores/officerStore';

type Props = NativeStackScreenProps<StackParamList, 'OfficerBountyWinner'>;
export default function OfficerBountyWinner({route, navigation}: Props) {
  const submission = route.params?.submission;

  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const setSelectedSubmission = useBountyStore(
    state => state.setSelectedSubmission,
  );
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );

  const fetchItems = useOfficerStore(state => state.fetchItems);

  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.FINANCIAL_OFFICER_BOUNTY_WINNER_PAID),
  );
  async function onSubmit() {
    const data = await mutate({
      submissionID: submission.id,
    } as OfficerConfirmBountyWinnerPOSTData);
    if (!!data) {
      fetchItems();
      navigation.navigate('HomeNavigation');
    }
  }
  return (
    <Layout>
      <ScrollView>
        <StyledText style={{fontSize: 28, color: Colors.Primary}}>
          {submission.team?.name}
        </StyledText>
        <StyledText>@{submission.team.creator.username}</StyledText>
        <View>
          <Separator />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingBottom: 12,
            }}>
            <BackArrow />
            <StyledText>OUT: ${submission.bounty?.reward}</StyledText>
          </View>
          <StyledText style={{color: Colors.Gray[400]}}>
            You are responsible for sending this money to the team creator.
          </StyledText>
          <View style={{height: 24}} />
          <StyledButton loading={loading} error={!!error} onPress={onSubmit}>
            <StyledText style={{color: Colors.BtnTextColor}}>
              I confirm that NDO has sent ${submission?.bounty.reward}.
            </StyledText>
          </StyledButton>
          <Separator />
          <View style={{gap: 4}}>
            <StyledText>Owed To:</StyledText>
            <MemberBox member={submission?.team?.creator} />
            <StyledText>Address:</StyledText>
            <View style={{flexDirection: 'row'}}>
              <StyledText style={{flex: 1, gap: 2}}>
                {submission?.team?.creator?.id}
              </StyledText>
              <TouchableOpacity
                style={{padding: 8}}
                onPress={() =>
                  Clipboard.setString(submission?.team?.creator?.id)
                }>
                <CopyIcon />
              </TouchableOpacity>
            </View>
            <Separator />
            <View style={{gap: 18}}>
              <StyledButton
                type="normal2"
                onPress={() => {
                  setSelectedBounty(submission.bounty.id);
                  setSelectedSubmission(submission.id);
                  setSelectedProject(submission.bounty.project.id);
                  navigation.navigate('PendingProposal');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <StyledText>View Project</StyledText>
                  <RightArrowIcon />
                </View>
              </StyledButton>
              <StyledButton
                type="normal2"
                onPress={() => {
                  setSelectedBounty(submission.bounty.id);
                  setSelectedSubmission(submission.id);
                  setSelectedProject(submission.bounty.project.id);
                  navigation.navigate('ViewBounty');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <StyledText>View Bounty</StyledText>
                  <RightArrowIcon />
                </View>
              </StyledButton>
              <StyledButton
                type="normal2"
                onPress={() => {
                  setSelectedBounty(submission.bounty.id);
                  setSelectedSubmission(submission.id);
                  navigation.navigate('StartTestCases');
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <StyledText>View Submission</StyledText>
                  <RightArrowIcon />
                </View>
              </StyledButton>
            </View>
          </View>
        </View>
        <View style={{height: 24}}></View>
      </ScrollView>
    </Layout>
  );
}
