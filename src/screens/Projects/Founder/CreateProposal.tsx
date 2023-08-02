import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledPhoneInput from 'src/components/ui/styled/StyledPhoneInput';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import {CreateProjectDataPOSTData} from 'src/sharedTypes';
import useProjectsStore from 'src/stores/projectsStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function CreateProposal() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('1');
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [createProjectData, setCreateProjectData] =
    useState<CreateProjectDataPOSTData>();

  function canProceedCreateProject() {
    if (!createProjectData) return false;
    if (createProjectData.title.trim().length < 3) return false;
    if (createProjectData.description.trim().length < 3) return false;
    if (createProjectData.email.trim().length < 3) return false;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!emailReg.test(createProjectData.email)) return false;
    if (createProjectData.phone.trim().length < 10) return false;

    return true;
  }

  const [loading, setLoading] = useState(false);

  const fetchProjects = useProjectsStore(state => state.fetchProjects);

  async function onSubmit() {
    if (!canProceedCreateProject()) return;
    setLoading(true);
    try {
      Keyboard.dismiss();
      await axios.post(
        getServerEndpoint(Endpoints.CREATE_PROPOSAL),
        createProjectData,
      );
      fetchProjects();
      setCreateProjectData(undefined);
      navigation.navigate('HomeNavigation');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }

    // return
  }

  useEffect(() => {
    setCreateProjectData({
      title: projectName,
      description,
      email,
      phone: countryCode + phone,
    });
    console.log(countryCode + phone);
  }, [projectName, description, email, phone]);

  return (
    <Layout>
      <ScrollView>
        <StyledText style={{fontSize: 28, fontWeight: '500', marginBottom: 2}}>
          Create a new proposal
        </StyledText>
        <StyledText style={{marginBottom: 32}}>
          Write your ideas for your proposal. It will be sent to a Bounty
          Manager. They will reach out to you to discuss more about the project.
        </StyledText>
        <View style={{gap: 24}}>
          <StyledText>Contact Information</StyledText>

          <StyledTextInput
            value={email}
            onChangeText={e => setEmail(e)}
            placeholder="Your email address"
            isLinkInput
          />

          <StyledPhoneInput
            phoneNumber={phone}
            setPhoneNumber={setPhone}
            setCountryCode={setCountryCode}
          />
          <StyledText>Project Information</StyledText>

          <StyledTextInput
            value={projectName}
            onChangeText={e => setProjectName(e)}
            placeholder="Project name"
          />
          <StyledTextInput
            value={description}
            onChangeText={e => setDescription(e)}
            placeholder="Description of your project"
            multiLine
          />
          <View style={{gap: 4, paddingLeft: 4}}>
            <StyledText>Notes:</StyledText>
            <StyledText>
              All entries must have at least three characters.
            </StyledText>
            <StyledText>
              Email must be a valid email address (e.g. NewDevOrder@gmail.com)
            </StyledText>
            <StyledText>Phone number must be 10 digits or more.</StyledText>
          </View>
        </View>
        <View style={{height: 24}} />
        <StyledButton
          enabled={canProceedCreateProject()}
          onPress={onSubmit}
          loading={loading}>
          Submit Proposal
        </StyledButton>
      </ScrollView>
    </Layout>
  );
}
