import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
// import StyledText from '../ui/styled/StyledText';
// import StyledTextInput from '../ui/styled/StyledTextInput';
// import StyledButton from '../ui/styled/StyledButton';
import DatePicker from 'react-native-date-picker';

import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import StyledButton from 'src/components/ui/styled/StyledButton';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import useProjectsStore from 'src/stores/projectsStore';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';
import useBountyStore from 'src/stores/bountyStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

export default function CreateBounty() {
  const [bountyName, setBountyName] = useState('');
  const [bountyDescription, setBountyDescription] = useState('');
  const [bountyAbout, setBountyAbout] = useState('');
  const [submissionStartDate, setSubmissionStartDate] = useState(new Date());
  const [submissionEndDate, setSubmissionEndDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate;
  });

  const projects = useProjectsStore(state => state.projects);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const selectedProject = useProjectsStore(state => state.selectedProject);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [errors, setErrors] = useState<Array<string>>([]);
  console.log(submissionEndDate);
  const createBountyData = useBountyStore(state => state.createBountyData);
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  function validateData(): string[] {
    const localErrors: Array<string> = [];
    if (!bountyName || bountyName.length < 3) {
      localErrors.push('Please enter a valid bounty name');
    }
    if (!bountyDescription || bountyDescription.length < 10) {
      localErrors.push(
        'Please enter a valid bounty overview with at least 10 characters.',
      );
    }
    if (!bountyAbout || bountyAbout.length < 10) {
      localErrors.push(
        'Please enter a valid about bounty section with at least 10 characters.',
      );
    }
    if (!submissionStartDate || !submissionEndDate) {
      localErrors.push('Please select a valid start and end date');
    }
    if (localErrors.length > 0) {
      return localErrors;
    }
    return [];
  }

  const handleNextStep = () => {
    setErrors([]);
    if (!selectedProject?.id) {
      console.error('Please select a project');
      return;
    }
    if (validateData().length === 0) {
      const body = {
        title: bountyName,
        description: bountyDescription,
        about: bountyAbout,
        startDate: submissionStartDate,
        deadline: submissionEndDate,
        projectID: selectedProject.id,
      };
      if (!!createBountyData) {
        setCreateBountyData({
          ...createBountyData,
          ...body,
        });
      } else {
        setCreateBountyData({
          ...body,
          amount: 0,
          types: [],
          headerSections: {},
        });
      }

      navigation.navigate('AddTags');
    } else {
      setErrors(validateData());
    }
  };

  return (
    <Layout>
      <ScrollView>
        <View style={{gap: 12}}>
          {/* Dropdown for selecting the project */}
          <StyledText>Creating bounty for Project</StyledText>
          <DropdownMenu
            data={projects || []}
            onSelect={(itemID, itemIndex) => {
              const proj = projects?.find(proj => proj.id == itemID);

              if (proj) {
                setSelectedProject(proj.id);
              }
            }}
            displayText={selectedProject?.title || ''}
            selectedValue={selectedProject?.id || ''}
          />

          {/* Styled input for bounty name */}
          <StyledText>Bounty Name:</StyledText>
          <StyledTextInput
            value={bountyName}
            onChangeText={text => setBountyName(text)}
            placeholder="Enter Bounty Name"
          />

          {/* Styled input for bounty overview */}
          <StyledText>Bounty Description:</StyledText>
          <StyledTextInput
            value={bountyDescription}
            onChangeText={text => setBountyDescription(text)}
            placeholder="Enter Bounty Overview"
            multiLine
          />

          <StyledText>About This Bounty:</StyledText>
          <StyledTextInput
            value={bountyAbout}
            onChangeText={text => setBountyAbout(text)}
            placeholder="Tell us about it and the backstory!"
            multiLine
          />

          {/* Date inputs for submission start and end dates */}
          <StyledText>Submission Start Date:</StyledText>
          <DatePicker
            date={submissionStartDate}
            fadeToColor={Colors.Background}
            onDateChange={date => setSubmissionStartDate(date)}
            mode="date"
          />

          <StyledText>Submission End Date:</StyledText>
          <DatePicker
            date={submissionEndDate}
            onDateChange={date => setSubmissionEndDate(date)}
            fadeToColor={Colors.Background}
            mode="date"
            style={{gap: 10}}
          />

          {/* Button to submit the new bounty */}
          <StyledButton
            onPress={handleNextStep}
            enabled={validateData().length === 0}>
            Next Step
          </StyledButton>
        </View>
        {errors.map(error => (
          <StyledText key={error}>{validateData()}</StyledText>
        ))}
      </ScrollView>
    </Layout>
  );
}
