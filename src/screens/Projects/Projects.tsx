import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useEffect, useId} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';

import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {Project, ProjectStage, RoleType} from 'src/sharedTypes';
import useMemberStore from 'src/stores/membersStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function Projects() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const fetchProjects = useProjectsStore(state => state.fetchProjects);
  const projects = useProjectsStore(state => state.projects);

  const playingRole = useMemberStore(state => state.myProfile)?.playingRole;

  const id = useId();
  const id2 = useId();

  const projectsPending =
    typeof projects !== 'undefined'
      ? projects?.filter(p => getFirstFilter()?.includes(p.stage))
      : undefined;
  const projectsAccepted =
    typeof projects !== 'undefined'
      ? projects?.filter(p => !getFirstFilter()?.includes(p.stage))
      : undefined;

  useEffect(() => {
    fetchProjects();
  }, [playingRole]);

  function getFirstFilter(): ProjectStage[] | null {
    const role = playingRole ?? RoleType.BountyHunter;
    if (role === RoleType.BountyHunter) {
      return null;
    } else if (role === RoleType.BountyManager) {
      return [ProjectStage.PendingBountyMgrQuote];
    } else if (role === RoleType.BountyDesigner) {
      return [ProjectStage.PendingBountyDesign];
    } else if (role === RoleType.Founder) {
      return [
        ProjectStage.PendingFounderPay,
        ProjectStage.PendingBountyMgrQuote,
        ProjectStage.PendingBountyDesign,
      ];
    }
    return null;
  }

  return (
    <Layout>
      <ScrollView>
        <View style={{height: 20}}></View>
        {playingRole === RoleType.Founder && (
          <>
            <StyledButton onPress={() => navigation.navigate('CreateProposal')}>
              Create a new proposal
            </StyledButton>
            <Separator />
          </>
        )}
        {!projects && (
          <>
            <StyledText
              style={{marginBottom: 16}}
              suspense
              trigger={null}
              shimmerWidth={80}>
              Loading
            </StyledText>
            <ProjectCard project={undefined} suspense />
            <View style={{height: 12}}></View>
            <ProjectCard project={undefined} suspense />
            <View style={{height: 12}}></View>
            <ProjectCard project={undefined} suspense />
          </>
        )}

        {!!projectsPending && projectsPending.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>To Do</StyledText>
            {projectsPending.map((item, index) => (
              <View key={`${item.id}-${index}-${id}`}>
                <ProjectCard project={item}></ProjectCard>
                <View style={{height: 12}}></View>
              </View>
            ))}
            <Separator />
          </>
        )}
        {!!projectsAccepted && projectsAccepted.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Projects</StyledText>
            {projectsAccepted.map((item, index) => (
              <View key={`${item.id}-${index}-${id2}`}>
                <ProjectCard project={item}></ProjectCard>
                <View style={{height: 12}}></View>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </Layout>
  );
}

function ProjectCard({
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
    if (role === RoleType.BountyDesigner) {
      if (
        project?.stage === ProjectStage.PendingBountyDesign ||
        project?.stage === ProjectStage.Ready
      ) {
        navigation.navigate('DesignerWorkspaceNavigator');
      } else {
        navigation.navigate('PendingProposal');
      }
    } else if (role === RoleType.Founder || role === RoleType.BountyManager) {
      if ((project?.bountyIDs?.length || 0) > 0) {
        navigation.navigate('ViewProjectBounties');
        return;
      }
      navigation.navigate('PendingProposal');
    } else if (role === RoleType.BountyValidator) {
      if (project?.stage === ProjectStage.Ready) {
        navigation.navigate('ViewProjectBounties');
      } else {
        if ((project?.bountyIDs?.length || 0) > 0) {
          navigation.navigate('ViewProjectBounties');
          return;
        }
        navigation.navigate('PendingProposal');
      }
    }
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
        <StyledText
          style={{fontSize: 16, fontWeight: '500'}}
          suspense={suspense}
          shimmerWidth={120}>
          {project?.title}
        </StyledText>
      </View>
      <StyledText
        style={{
          fontSize: 15,
          fontWeight: '400',
          fontStyle: 'italic',
        }}
        suspense={suspense}
        shimmerWidth={80}>
        {project?.stage === 'Ready' ? 'Ready' : ''}
        {project?.stage === ProjectStage.PendingBountyMgrQuote
          ? 'Pending Price Quote'
          : ''}
        {project?.stage === ProjectStage.PendingFounderPay
          ? 'Pending founder payment'
          : ''}
        {project?.stage === ProjectStage.PendingOfficer
          ? 'Pending financial officer to receive payment.'
          : ''}
        {project?.stage === ProjectStage.Declined ? 'Declined' : ''}
        {project?.stage === ProjectStage.PendingBountyDesign
          ? 'Pending design from bounty designer'
          : ''}
      </StyledText>

      <StyledText
        style={{paddingTop: 8}}
        suspense={suspense}
        shimmerWidth={240}>
        {project?.description.substring(0, 80).trim()}
        {(project?.description.length || 0) > 80 ? '...' : ''}
      </StyledText>
    </TouchableOpacity>
  );
}
