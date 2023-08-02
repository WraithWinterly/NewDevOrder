import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import {BountyMgrSetQuotePricePOSTData} from 'src/sharedTypes';
import useProjectsStore from 'src/stores/projectsStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function AcceptAndSendQuote() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const selectedProject = useProjectsStore(state => state.selectedProject);
  const projects = useProjectsStore(state => state.projects);
  const fetchProjects = useProjectsStore(state => state.fetchProjects);

  const [quoteAmount, setQuoteAmount] = useState<number | undefined>();
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    // Set quote price and remove the cash icon upon submission for our data purposes
    try {
      console.log(!selectedProject);

      if (!!quoteAmount && !!selectedProject && quoteAmount > 0) {
        console.log('');
        Keyboard.dismiss();
        const body: BountyMgrSetQuotePricePOSTData = {
          quotePrice: quoteAmount,
          projectID: selectedProject.id,
        };
        const data = await axios.post(
          getServerEndpoint(Endpoints.BOUNTYMGR_SET_QUOTE_PRICE),
          body,
        );
        if (data.status === 200) {
          fetchProjects();
          navigation.navigate('HomeNavigation');
        } else {
          throw data;
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <StyledText style={{fontSize: 26, fontWeight: 'bold', marginBottom: 22}}>
        Accept and send quote to Founder
      </StyledText>
      <StyledText style={{fontSize: 18, marginBottom: 18}}>
        The quote will be sent to Founder for approval.
      </StyledText>
      <StyledTextInput
        onChangeText={e =>
          setQuoteAmount(
            e.replace('$', '').length > 0
              ? Number(e.replace('$', ''))
              : undefined,
          )
        }
        value={`$${quoteAmount ?? ''}`}
        placeholder="Enter quote for project"
        numberInput></StyledTextInput>
      <View style={{height: 24}}></View>
      <StyledButton
        onPress={onSubmit}
        loading={loading}
        enabled={!!quoteAmount && Number(quoteAmount) > 0}>
        Send to Founder
      </StyledButton>
    </Layout>
  );
}
