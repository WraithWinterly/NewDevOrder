import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';

import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';
import useProjectsStore, {Project} from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function Projects() {
  const fetchProjects = useProjectsStore(state => state.fetchProjects);
  const projects = useProjectsStore(state => state.projects);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [refreshing, setRefreshing] = useState(false);

  const id = useId();
  const id2 = useId();

  function onRefresh() {
    setRefreshing(true);
    fetchProjects().then(() => {
      setRefreshing(false);
    });
  }
  const playingRole = useMemberStore(state => state.myProfile?.playingRole);

  const projectsPending = projects?.filter(p => p.stage !== 'Ready');
  const projectsAccepted = projects?.filter(p => p.stage === 'Ready');

  return (
    <Layout>
      <View style={{height: 20}}></View>
      {playingRole?.title === 'Founder' && (
        <>
          <StyledButton onPress={() => navigation.navigate('CreateProject')}>
            Create a new project
          </StyledButton>
          <Separator />
        </>
      )}

      <StyledText style={{marginBottom: 16}}>Pending Projects</StyledText>
      <FlatList
        data={projectsPending}
        keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => <ProjectCard project={item}></ProjectCard>}
        ItemSeparatorComponent={() => (
          <View style={{height: 12}}></View>
        )}></FlatList>
      <Separator />
      <StyledText style={{marginBottom: 16}}>Projects</StyledText>
      <FlatList
        data={projectsAccepted}
        keyExtractor={(item, index) => `${item.id}-${index}-${id2}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => <ProjectCard project={item}></ProjectCard>}
        ItemSeparatorComponent={() => (
          <View style={{height: 12}}></View>
        )}></FlatList>
    </Layout>
  );
}

function ProjectCard({project}: {project: Project}) {
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const role = useMemberStore(state => state.myProfile?.playingRole);
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedProject(project.id);
        console.log(project.id);
        if (role?.title === 'Bounty Designer') {
          navigation.navigate('ProjectWorkspaceNavigator');
        }
        // navigation.navigate('TeamVar');
      }}
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
        {project.stage === 'WaitingBountyMgrQuote' ? 'Pending Review' : ''}
      </StyledText>

      <StyledText style={{paddingTop: 8}}>
        {project.description.substring(0, 20).trim()}
        {project.description.length > 20 ? '...' : ''}
      </StyledText>
    </TouchableOpacity>
  );
}
