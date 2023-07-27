import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
// import StyledText from '../ui/styled/StyledText';
// import StyledTextInput from '../ui/styled/StyledTextInput';
// import StyledButton from '../ui/styled/StyledButton';
// import DatePicker from '../ui/DatePicker';

import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import StyledButton from 'src/components/ui/styled/StyledButton';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import useProjectsStore from 'src/stores/projectsStore';

export default function NewBounty() {
  const [bountyName, setBountyName] = useState('');
  const [bountyOverview, setBountyOverview] = useState('');
  const [submissionStartDate, setSubmissionStartDate] = useState(new Date());
  const [submissionEndDate, setSubmissionEndDate] = useState(new Date());

  const projects = useProjectsStore(state => state.projects);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const selectedProject = useProjectsStore(state => state.selectedProject);

  // Function to handle creating the new bounty and submitting it.
  const handleCreateBounty = () => {
    // Implement your logic here to create and submit the new bounty.
    // You can use the state variables to access the selected project, bounty name, overview, and dates.
  };

  return (
    <View>
      {/* Dropdown for selecting the project */}
      <StyledText>Select Project:</StyledText>
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
      <StyledText>Bounty Overview:</StyledText>
      <StyledTextInput
        value={bountyOverview}
        onChangeText={text => setBountyOverview(text)}
        placeholder="Enter Bounty Overview"
        multiLine
      />

      {/* Date inputs for submission start and end dates */}
      <StyledText>Submission Start Date:</StyledText>
      {/* <DatePicker
        selectedDate={submissionStartDate}
        onDateChange={date => setSubmissionStartDate(date)}
      /> */}

      <StyledText>Submission End Date:</StyledText>
      {/* <DatePicker
        selectedDate={submissionEndDate}
        onDateChange={date => setSubmissionEndDate(date)}
      /> */}

      {/* Button to submit the new bounty */}
      <StyledButton onPress={handleCreateBounty}>Create Bounty</StyledButton>
    </View>
  );
}
