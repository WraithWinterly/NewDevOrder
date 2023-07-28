import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native';
import StyledPhoneInput from 'src/components/ui/styled/StyledPhoneInput';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useProjectsStore from 'src/stores/projectsStore';

export default function CreateProject() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('1');

  const setCreateProjectData = useProjectsStore(
    state => state.setCreateProjectData,
  );

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
          Create a new project
        </StyledText>
        <StyledText style={{marginBottom: 64}}>
          Write your ideas for your project. Your proposal will be sent to a
          Bounty Manager. They will reach out to you to discuss more about the
          project.
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
      </ScrollView>
    </Layout>
  );
}
