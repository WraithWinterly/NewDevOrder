import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId} from 'react';
import {ActivityIndicator, Linking, ScrollView, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import MemberBox from 'src/components/MemberBox';
import BackArrow from 'src/components/icons/BackArrow';
import CalendarIcon from 'src/components/icons/CalendarIcon';

import CashIcon from 'src/components/icons/CashIcon';
import ForwardArrow from 'src/components/icons/ForwardArrow';
import WarningIcon from 'src/components/icons/WarningIcon';
import Bubble from 'src/components/ui/Bubble';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useQuery from 'src/hooks/useQuery';
import Layout from 'src/layout/Layout';
import {Bounty, Member, Project, Submission, Team} from 'src/sharedTypes';
import useMemberStore from 'src/stores/membersStore';
import useOfficerStore from 'src/stores/officerStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function FinancialOfficer() {
  const items = useOfficerStore(state => state.items);
  const fetchItems = useOfficerStore(state => state.fetchItems);
  const id = useId();
  const id2 = useId();

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Layout>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            alignItems: 'center',
            gap: 18,
          }}>
          <CashIcon customSize={24} />
          <View style={{width: '90%'}}>
            <StyledText>You are a financial officer.</StyledText>
            <StyledText>
              You're responsible for paying people and receiving payments.
              Please track your payments as they are currently not logged.
            </StyledText>
          </View>
        </View>
        <Separator />

        <StyledText style={{marginBottom: 12}}>Projects: </StyledText>
        <View style={{gap: 12}}>
          {items?.projects.map((project, index) => (
            // <StyledText key={index}>{JSON.stringify(project)}</StyledText>
            <OfficerProjectCard key={`${index}-${id}`} project={project} />
          ))}
        </View>
        {!items && <ActivityIndicator size="small" color={Colors.Primary} />}
        {items?.projects.length === 0 && (
          <StyledText style={{marginBottom: 12}}>
            You have no projects pending payment.
          </StyledText>
        )}

        <View style={{height: 24}} />
        <StyledText style={{marginBottom: 12}}>Bounty Winners: </StyledText>
        {!items && <ActivityIndicator size="small" color={Colors.Primary} />}
        <View style={{gap: 12}}>
          {items?.submissions.map((submission, index) => (
            // <StyledText key={index}>{JSON.stringify(project)}</StyledText>
            // <ProjectCard key={index} project={project} />
            <OfficerSubmission
              key={`${index}-${id2}-${submission.id}`}
              submission={submission}
              index={index}
            />
          ))}
        </View>
        {items?.submissions.length === 0 && (
          <StyledText style={{marginBottom: 12}}>
            You have no bounties pending payment.
          </StyledText>
        )}
      </ScrollView>
    </Layout>
  );
}

function OfficerSubmission({
  submission,
  index,
}: {
  submission: Submission & {
    bounty: Bounty & {project: Project};
    team: Team & {
      creator: Member;
    };
  };
  index: number;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  function onClick() {
    navigation.navigate('OfficerBountyWinner', {
      submission: submission,
    });
  }
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        padding: 12,
        backgroundColor: Colors.BackgroundLighter,
        borderRadius: 16,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 18}}>
        <BackArrow />
        <StyledText style={{fontSize: 20, fontWeight: '500'}}>
          OUT: ${submission?.bounty.reward}
        </StyledText>
      </View>
      <View style={{height: 8}} />
      <StyledText style={{fontSize: 22, color: Colors.Primary}}>
        {submission.team?.name}
      </StyledText>
      <StyledText>
        Team leader: {submission?.team?.creator?.firstName}
      </StyledText>
      <StyledText>Project: {submission?.bounty.project?.title}</StyledText>
      <StyledText>Bounty: {submission?.bounty?.title}</StyledText>

      {/* <StyledText key={index} style={{fontSize: 18}}>
        Pay to: {submission.bounty.cre?.}
      </StyledText> */}

      <View style={{height: 12}} />
      {/* <StyledButton
        type="borderNoFill"
        onPress={() => {
          setSelectedSubmission(submission.id);
          navigation.navigate('StartTestCases');
        }}>
        Start Test Cases
      </StyledButton> */}
    </TouchableOpacity>
  );
}

function OfficerProjectCard({
  project,
  suspense,
}: {
  project: Project | undefined;
  suspense?: boolean;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const role = useMemberStore(state => state.myProfile?.playingRole);

  async function onClick() {
    setSelectedProject(project?.id);

    navigation.navigate('PendingProposal');
  }

  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        padding: 12,
        backgroundColor: Colors.BackgroundLighter,
        borderRadius: 16,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <ForwardArrow />
        <StyledText style={{fontSize: 20, fontWeight: '500'}}>
          IN: ${project?.quotePrice}
        </StyledText>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <StyledText
          style={{fontSize: 16, fontWeight: '500'}}
          suspense={suspense}
          shimmerWidth={120}>
          {project?.title}
        </StyledText>
      </View>

      <StyledText
        style={{paddingVertical: 8}}
        suspense={suspense}
        shimmerWidth={240}>
        {project?.description.substring(0, 80).trim()}
        {(project?.description.length || 0) > 80 ? '...' : ''}
      </StyledText>

      <StyledText>Email: {project?.email}</StyledText>
      <StyledText>Phone: {project?.phone}</StyledText>
    </TouchableOpacity>
  );
}
