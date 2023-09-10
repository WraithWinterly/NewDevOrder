import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useMutation from 'src/hooks/useMutation';
import Layout from 'src/layout/Layout';
import {CreateTeamPOSTData} from 'src/sharedTypes';
import useProjectsStore from 'src/stores/projectsStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function CreateTeam() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const wallet = useSolanaContext();

  const setCreateProposalData = useProjectsStore(
    state => state.setCreateProposalData,
  );

  const fetchTeams = useTeamsStore(state => state.fetchTeams);

  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.CREATE_TEAM),
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [webLink, setWebLink] = useState('https://');

  const [createTeamData, setCreateTeamData] = useState<CreateTeamPOSTData>();

  const canProceedCreateTeam =
    !!createTeamData && isCreateTeamValid(createTeamData);

  useEffect(() => {
    setCreateTeamData({
      name: name,
      description,
      link: webLink,
    });
  }, [name, description, webLink]);

  function isCreateTeamValid(data: CreateTeamPOSTData) {
    if (data.name.trim().length < 3) return false;
    if (data.description.trim().length < 3) return false;
    if (data.link.trim().length < 3) return false;
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!linkRegex.test(data.link)) return false;
    return true;
  }

  async function onSubmit() {
    if (!canProceedCreateTeam) return;

    const createData: CreateTeamPOSTData = {
      ...createTeamData!,
    };
    const data = await mutate(createData);

    if (data) {
      setCreateProposalData(undefined);
      navigation.navigate('HomeNavigation');
      fetchTeams();
    }
  }

  return (
    <Layout>
      <View style={{height: 64}}></View>
      <View style={{gap: 24}}>
        <StyledTextInput
          value={name}
          label="Team Name"
          onChangeText={e => setName(e)}
          placeholder="Enter team name"
        />
        <StyledTextInput
          value={description}
          onChangeText={e => setDescription(e)}
          placeholder="Enter a short description of your team"
          label="Description"
        />
        <StyledTextInput
          value={webLink}
          onChangeText={e => setWebLink(e)}
          placeholder="Enter link to website"
          label="Link"
          isLinkInput
        />
        <View style={{gap: 4, paddingLeft: 4}}>
          <StyledText>Notes:</StyledText>
          <StyledText>
            All entries must have at least three characters.
          </StyledText>
          <StyledText>
            Link to website must be a valid link, starting with http(s)://
          </StyledText>
        </View>
        <StyledButton
          loading={loading}
          error={!!error}
          enabled={canProceedCreateTeam}
          onPress={onSubmit}>
          Create Team
        </StyledButton>
      </View>
    </Layout>
  );
}
