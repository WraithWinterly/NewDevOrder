import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import DatePicker from 'react-native-date-picker';

import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import StyledButton from 'src/components/ui/styled/StyledButton';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import useProjectsStore from 'src/stores/projectsStore';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';
import useBountyStore from 'src/stores/bountyStore';
import {StackParamList} from 'src/StackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {fireDate} from 'src/utils/utils';

type Props = NativeStackScreenProps<StackParamList, 'CreateBounty'>;

export default function CreateBounty({route, navigation}: Props) {
  const projects = useProjectsStore(state => state.projects);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const selectedProject = useProjectsStore(state => state.selectedProject);

  const createBountyData = useBountyStore(state => state.createBountyData);
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  const [errors, setErrors] = useState<Array<string>>([]);
  const [bountyName, setBountyName] = useState(createBountyData?.title || '');
  const [bountyDescription, setBountyDescription] = useState(
    createBountyData?.description || '',
  );
  const [bountyAbout, setBountyAbout] = useState(
    createBountyData?.aboutProject || '',
  );
  const [postDate, setPostDate] = useState(
    !!createBountyData?.postDate
      ? new Date(createBountyData.postDate)
      : new Date(),
  );
  const [deadline, setDeadline] = useState(() => {
    if (createBountyData?.deadline) {
      return fireDate(createBountyData?.deadline);
    }
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate;
  });

  const existingID = route.params?.existingID ?? undefined;

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
    if (!postDate || !deadline) {
      localErrors.push('Please select a valid start and end date');
    }
    if (postDate.getTime() > deadline.getTime()) {
      localErrors.push('Start date must be before end date');
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
        aboutProject: bountyAbout,
        startDate: postDate,
        deadline: deadline,
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
          postDate: new Date(),
          id: existingID,
          reward: 0,
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
            name="project"
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
            placeholder="Enter Bounty Description"
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
            date={postDate}
            fadeToColor={Colors.Background}
            onDateChange={date => setPostDate(date)}
            mode="date"
          />

          <StyledText>Submission End Date:</StyledText>
          <DatePicker
            date={deadline}
            onDateChange={date => setDeadline(date)}
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
