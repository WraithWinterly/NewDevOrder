import React, {useEffect, useState} from 'react';
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
import {fromFireDate, isFireDate} from 'src/utils/utils';
import WarningIcon from 'src/components/icons/WarningIcon';
import CloseIcon from 'src/components/icons/CloseIcon';

type Props = NativeStackScreenProps<StackParamList, 'CreateBounty'>;

export default function CreateBounty({route, navigation}: Props) {
  const projects = useProjectsStore(state => state.projects);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const selectedProject = useProjectsStore(state => state.selectedProject);
  const bountiesForProject = useProjectsStore(
    state => state.bountiesForProject,
  );

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
  const [startDate, setStartDate] = useState(() => {
    if (createBountyData?.startDate) {
      return isFireDate(createBountyData.startDate)
        ? fromFireDate(createBountyData.startDate)
        : new Date(createBountyData.startDate);
    } else {
      return new Date();
    }
  });
  const [deadline, setDeadline] = useState(() => {
    if (createBountyData?.deadline) {
      return isFireDate(createBountyData.deadline)
        ? fromFireDate(createBountyData.deadline)
        : new Date(createBountyData.deadline);
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
    if (!startDate || !deadline) {
      localErrors.push('Please select a valid start and end date');
    }
    if (startDate!.getTime() > deadline!.getTime()) {
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
        startDate: startDate!,
        deadline: deadline!,
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
          startDate: new Date(),
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

  function calcReward() {
    let leftOver = selectedProject?.quotePrice || 0;
    const withoutMe = bountiesForProject?.filter(
      b => b.id !== createBountyData?.id,
    );
    withoutMe?.forEach(bounty => {
      leftOver -= bounty.reward;
    });

    return leftOver;
  }

  return (
    <Layout>
      <ScrollView>
        <View style={{gap: 12}}>
          {/* Dropdown for selecting the project */}
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 4,
              gap: 8,
              alignItems: 'center',
            }}>
            <WarningIcon />
            <StyledText style={{width: '90%'}}>
              You will lose your progress by backing out of this screen.
            </StyledText>
          </View>
          {calcReward() === 0 && (
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: 4,
                gap: 8,
                alignItems: 'center',
              }}>
              <CloseIcon />
              <StyledText style={{width: '90%', color: Colors.Red[500]}}>
                You do not have any funds left and will not be able to proceed
                with this bounty!
              </StyledText>
            </View>
          )}

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
            disabled
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
          <StyledText>Bounty Open Date:</StyledText>
          <DatePicker
            date={startDate!}
            fadeToColor={Colors.Background}
            onDateChange={date => setStartDate(date)}
            mode="date"
          />

          <StyledText>Bounty Deadline:</StyledText>
          <DatePicker
            date={deadline!}
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
