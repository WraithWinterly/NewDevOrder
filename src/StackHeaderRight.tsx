import {ActivityIndicator, View} from 'react-native';
import StyledText from './components/ui/styled/StyledText';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from './StackNavigator';
import {Colors} from './styles/styles';
import useTeamsStore from './stores/teamsStore';
import useProjectsStore from './stores/projectsStore';
import StyledButton from './components/ui/styled/StyledButton';
import RefreshIcon from './components/icons/RefreshIcon';
import useSolanaContext from './web3/SolanaProvider';

import {CreateTeam} from './sharedTypes';
import axios from 'axios';
import {Endpoints, getServerEndpoint} from './utils/server';
import {useState} from 'react';

export default function StackHeaderRight({route}: {route: string}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const createTeamData = useTeamsStore(state => state.createTeamData);
  const setCreateTeamData = useTeamsStore(state => state.setCreateTeamData);
  const isCreateTeamValid = useTeamsStore(state => state.isCreateTeamValid);
  const finalizeCreateTeam = useTeamsStore(state => state.finalizeCreateTeam);
  const canProceedCreateTeam =
    !!createTeamData && isCreateTeamValid(createTeamData);
  const wallet = useSolanaContext();
  const createProjectData = useProjectsStore(state => state.createProjectData);
  const setCreateProjectData = useProjectsStore(
    state => state.setCreateProjectData,
  );
  const isCreateProjectValid = useProjectsStore(
    state => state.isCreateProjectValid,
  );
  // const finalizeCreateProject = useProjectsStore(
  //   state => state.finalizeCreateProject,
  // );
  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const canProceedCreateProject =
    !!createProjectData && isCreateProjectValid(createProjectData);

  const [loading, setLoading] = useState(false);

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
          onPress={async () => {
            if (!canProceedCreateTeam) return;
            setLoading(true);
            try {
              const walletAddress = wallet.wallet?.publicKey
                .toBase58()
                .toString();
              const createData: CreateTeam = {
                ...createTeamData!,
                creatorAddress: walletAddress!,
              };
              const data = await axios.post(
                getServerEndpoint(Endpoints.CREATE_TEAM),
                createData,
              );
              if (data.status === 200) {
                setCreateProjectData(undefined);
                navigation.navigate('HomeNavigation');
              }
              fetchTeams();
            } catch (e) {
            } finally {
              setLoading(false);
            }
          }}
          style={{color: Colors.Primary}}>
          {loading ? (
            <ActivityIndicator color={Colors.White} />
          ) : canProceedCreateTeam ? (
            'Create Team'
          ) : (
            'Done'
          )}
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
      ) : route === 'MyWallet' ? (
        <StyledButton>
          <RefreshIcon />
        </StyledButton>
      ) : null}
    </View>
  );
}
