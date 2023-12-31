import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/useMutation';
import Layout from 'src/layout/Layout';
import {BountyMgrDeclineProjectPOSTData} from 'src/sharedTypes';

import useProjectsStore from 'src/stores/projectsStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function ConfirmDecline() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const proj = useProjectsStore(state => state.selectedProject);
  const fetchProjects = useProjectsStore(state => state.fetchProjects);

  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.BOUNTYMGR_DECLINE),
  );

  async function onDecline() {
    if (!proj?.id) {
      console.error('No project');
      return;
    }
    const body: BountyMgrDeclineProjectPOSTData = {
      projectID: proj.id,
    };
    const data = await mutate(body);
    if (data) {
      fetchProjects();
      navigation.navigate('HomeNavigation');
    }
  }
  return (
    <Layout>
      <View style={{height: '80%', justifyContent: 'space-between'}}>
        <View>
          <StyledText
            style={{fontSize: 26, fontWeight: 'bold', marginBottom: 12}}>
            Confirm you would like to decline the proposal
          </StyledText>
          <StyledText style={{fontSize: 18, marginBottom: 18}}>
            The proposal will be closed after you send.
          </StyledText>
          <View style={{height: 24}}></View>
          <StyledText style={{fontSize: 18, marginBottom: 12}}>
            Project information
          </StyledText>
          <StyledText>
            <Text style={{fontWeight: 'bold'}}>Name: </Text> {proj?.title}
          </StyledText>
          <StyledText>
            <Text style={{fontWeight: 'bold'}}>Details: </Text>
            {proj?.description}
          </StyledText>
        </View>
      </View>

      <View>
        <StyledButton onPress={onDecline} error={!!error} loading={loading}>
          Decline Proposal
        </StyledButton>
        <StyledButton
          type="noBgPurple"
          onPress={() => navigation.navigate('PendingProposal')}>
          Go back
        </StyledButton>
      </View>
    </Layout>
  );
}
