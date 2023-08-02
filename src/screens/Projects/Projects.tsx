import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Project, RoleType} from 'prisma/generated';
import {useEffect, useId} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';

import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function Projects() {
  const fetchProjects = useProjectsStore(state => state.fetchProjects);
  const projects = useProjectsStore(state => state.projects);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const id = useId();
  const id2 = useId();

  useEffect(() => {
    fetchProjects();
  }, []);

  const playingRole = useMemberStore(state => state.myProfile?.playingRole);

  const projectsPending =
    typeof projects !== 'undefined'
      ? projects?.filter(p => p.stage == 'WaitingBountyMgrQuote')
      : undefined;
  const projectsAccepted =
    typeof projects !== 'undefined'
      ? projects?.filter(p => p.stage !== 'WaitingBountyMgrQuote')
      : undefined;

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
        {playingRole === RoleType.BountyManager && (
          <>
            <StyledButton onPress={() => navigation.navigate('CreateProject')}>
              Create a new project
            </StyledButton>
            <Separator />
          </>
        )}
        {!!projectsPending && projectsPending.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Pending Projects</StyledText>
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

function ProjectCard({project}: {project: Project}) {
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const role = useMemberStore(state => state.myProfile?.playingRole);

  async function onClick() {
    setSelectedProject(project.id);
    if (role === RoleType.BountyDesigner) {
      navigation.navigate('ProjectWorkspaceNavigator');
    } else if (role === RoleType.Founder || role === RoleType.BountyManager) {
      navigation.navigate('PendingProposal');
    } else if (role === RoleType.BountyValidator) {
      navigation.navigate('ValidatorNavigator');
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
        <StyledText style={{fontSize: 16, fontWeight: '500'}}>
          {project.title}
        </StyledText>
      </View>
      <StyledText style={{fontSize: 16, fontWeight: '500'}}>
        {project.stage === 'Ready' ? 'Ready' : ''}
        {project.stage === 'WaitingBountyMgrQuote' ? 'Pending Review' : ''}
        {project.stage === 'WaitingFounderPay' ? 'Pending founder payment' : ''}
        {project.stage === 'Declined' ? 'Declined' : ''}
        {project.stage === 'WaitingBountyDesign'
          ? 'Pending design from bounty designer'
          : ''}
      </StyledText>

      <StyledText style={{paddingTop: 8}}>
        {project.description.substring(0, 20).trim()}
        {project.description.length > 20 ? '...' : ''}
      </StyledText>
    </TouchableOpacity>
  );
}
