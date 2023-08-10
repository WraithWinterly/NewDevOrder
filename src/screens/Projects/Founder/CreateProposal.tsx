import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledPhoneInput from 'src/components/ui/styled/StyledPhoneInput';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import useMutation from 'src/hooks/usePost';
import Layout from 'src/layout/Layout';
import {CreateProjectPOSTData} from 'src/sharedTypes';

import useMemberStore from 'src/stores/membersStore';

import useProjectsStore from 'src/stores/projectsStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function CreateProposal() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const myProfile = useMemberStore(state => state.myProfile);
  const [createProposalData, setCreateProposalData] =
    useState<CreateProjectPOSTData>();

  const fetchProjects = useProjectsStore(state => state.fetchProjects);

  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.CREATE_PROPOSAL),
  );

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState(myProfile?.email ?? '');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('1');

  useEffect(() => {
    setCreateProposalData({
      title: projectName,
      description,
      email,
      phone: countryCode + phone,
      walletAddress: walletAddress || '',
    });
  }, [projectName, description, email, phone]);

  function canProceedCreateProposal() {
    if (!createProposalData) return false;
    if (createProposalData.title.trim().length < 3) return false;
    if (createProposalData.description.trim().length < 3) return false;
    if (createProposalData.email.trim().length < 3) return false;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!emailReg.test(createProposalData.email)) return false;
    if (createProposalData.phone.trim().length < 10) return false;

    return true;
  }

  async function onSubmit() {
    if (!canProceedCreateProposal()) return;

    Keyboard.dismiss();

    const data = await mutate(createProposalData);
    if (data) {
      fetchProjects();
      setCreateProposalData(undefined);
      navigation.navigate('HomeNavigation');
    }
  }

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
          enabled={canProceedCreateProposal()}
          onPress={onSubmit}
          loading={loading}>
          Submit Proposal
        </StyledButton>
      </ScrollView>
    </Layout>
  );
}
