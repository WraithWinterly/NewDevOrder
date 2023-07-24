import {View} from 'react-native';
import StyledText from './components/ui/styled/StyledText';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from './StackNavigator';
import {Colors} from './styles/styles';
import useTeamsStore from './stores/teamsStore';
import useProjectsStore from './stores/projectsStore';

export default function StackHeaderRight({route}: {route: string}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const createTeamData = useTeamsStore(state => state.createTeamData);
  const setCreateTeamData = useTeamsStore(state => state.setCreateTeamData);
  const isCreateTeamValid = useTeamsStore(state => state.isCreateTeamValid);
  const finalizeCreateTeam = useTeamsStore(state => state.finalizeCreateTeam);
  const canProceedCreateTeam =
    !!createTeamData && isCreateTeamValid(createTeamData);

  const createProjectData = useProjectsStore(state => state.createProjectData);
  const setCreateProjectData = useProjectsStore(
    state => state.setCreateProjectData,
  );
  const isCreateProjectValid = useProjectsStore(
    state => state.isCreateProjectValid,
  );
  const finalizeCreateProject = useProjectsStore(
    state => state.finalizeCreateProject,
  );
  const canProceedCreateProject =
    !!createProjectData && isCreateProjectValid(createProjectData);

  return (
    <View style={{paddingRight: 18}}>
      {route === 'MyWallet' ? (
        <StyledText
          onPress={() => navigation.navigate('MintNFTs')}
          style={{color: Colors.Primary}}>
          Mint NFTs
        </StyledText>
      ) : route === 'TeamVar' ? (
        <StyledText
          onPress={() => navigation.navigate('InviteMembers')}
          style={{color: Colors.Primary}}>
          Invite
        </StyledText>
      ) : route === 'InviteMembers' ? (
        <StyledText
          onPress={() => {
            // Is invite in normal team
            if (!canProceedCreateTeam) {
              navigation.goBack();
              return;
            }

            // post data to server
            finalizeCreateTeam();
            // Create team
            setCreateTeamData(undefined);

            // return
            navigation.navigate('HomeNavigation');
          }}
          style={{color: Colors.Primary}}>
          {canProceedCreateTeam ? 'Create Team' : 'Done'}
        </StyledText>
      ) : route === 'CreateTeam' ? (
        <StyledText
          onPress={() =>
            canProceedCreateTeam ? navigation.navigate('InviteMembers') : {}
          }
          style={{
            color: canProceedCreateTeam ? Colors.Primary : Colors.Gray[500],
          }}>
          Next
        </StyledText>
      ) : route === 'CreateProject' ? (
        <StyledText
          onPress={() => {
            if (canProceedCreateProject) {
              // post data to server
              finalizeCreateProject();
              // Create team
              setCreateProjectData(undefined);

              // return
              navigation.navigate('HomeNavigation');
            }
          }}
          style={{
            color: canProceedCreateProject ? Colors.Primary : Colors.Gray[500],
          }}>
          Send
        </StyledText>
      ) : null}
    </View>
  );
}
