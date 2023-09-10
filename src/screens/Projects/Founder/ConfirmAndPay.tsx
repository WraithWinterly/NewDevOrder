import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/useMutation';
import Layout from 'src/layout/Layout';
import {FounderConfirmPayPostData} from 'src/sharedTypes';

import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function ConfirmAndPay() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const proj = useProjectsStore(state => state.selectedProject);
  const fetchProjects = useProjectsStore(state => state.fetchProjects);

  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.FOUNDER_CONFIRM_PAY),
  );

  async function onSubmit() {
    if (!proj?.id) {
      console.error('No project.id');
      return;
    }
    const body = {
      projectID: proj.id,
    } as FounderConfirmPayPostData;

    const data = await mutate(body);
    if (data) {
      fetchProjects();
      navigation.navigate('HomeNavigation');
    }
  }

  return (
    <Layout>
      <View style={{height: '90%', justifyContent: 'space-around'}}>
        <View>
          <StyledText
            style={{fontSize: 26, fontWeight: 'bold', marginBottom: 22}}>
            Confirm and pay
          </StyledText>
          <StyledText style={{fontSize: 18, marginBottom: 18}}>
            Your quote is{' '}
            <Text style={{fontWeight: 'bold'}}>${proj?.quotePrice}</Text>.
          </StyledText>
          <StyledText>
            This amount is non-refundable. Once we've secured your funds, your
            proposal will be sent over to the Bounty Designer. When the Bounty
            Design Document is completed, you will need to review and approve
            that it meets your requirements. Then, it will be posted on the NDO
            app for Bounty Hunters to complete.
          </StyledText>
        </View>

        <StyledButton onPress={onSubmit} loading={loading} error={!!error}>
          <StyledText style={{fontSize: 18, color: Colors.BtnTextColor}}>
            Confirm and pay{' '}
            <Text style={{fontWeight: '500'}}>${proj?.quotePrice}</Text>.
          </StyledText>
        </StyledButton>
      </View>
    </Layout>
  );
}
