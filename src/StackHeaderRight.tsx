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

import {CreateTeamPOSTData} from './sharedTypes';

import {Endpoints, getServerEndpoint} from './utils/server';
import useMutation from './hooks/usePost';

export default function StackHeaderRight({route}: {route: string}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const createTeamData = useTeamsStore(state => state.createTeamData);
  const setCreateTeamData = useTeamsStore(state => state.setCreateTeamData);
  const isCreateTeamValid = useTeamsStore(state => state.isCreateTeamValid);

  const canProceedCreateTeam =
    !!createTeamData && isCreateTeamValid(createTeamData);
  const wallet = useSolanaContext();
  const createProjectData = useProjectsStore(state => state.createProjectData);
  const setCreateProjectData = useProjectsStore(
    state => state.setCreateProjectData,
  );

  const fetchTeams = useTeamsStore(state => state.fetchTeams);

  const {
    data: createTeamMutationData,
    loading: createTeamLoading,
    error: createTeamError,
    mutate: createTeamMutate,
  } = useMutation(getServerEndpoint(Endpoints.CREATE_TEAM));

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

            const walletAddress = wallet.wallet?.publicKey
              .toBase58()
              .toString();
            const createData: CreateTeamPOSTData = {
              ...createTeamData!,
              creatorAddress: walletAddress!,
            };
            const data = await createTeamMutate(createData);

            if (data) {
              setCreateProjectData(undefined);
              navigation.navigate('HomeNavigation');
              fetchTeams();
            }
          }}
          style={{color: createTeamError ? Colors.Red[500] : Colors.Primary}}>
          {createTeamLoading ? (
            <ActivityIndicator
              color={createTeamError ? Colors.Red[500] : Colors.White}
            />
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
