import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProjectStage} from 'prisma/generated';
import {Bounty} from 'prisma/generated';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function AddRewards() {
  const project = useProjectsStore(state => state.selectedProject);
  const create = useBountyStore(state => state.createBountyData);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const [bountyRewardAmount, setBountyRewardAmount] = useState(
    String(create?.amount) || '',
  );
  const createBountyData = useBountyStore(state => state.createBountyData);
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  function onNextStep() {
    if (!createBountyData) {
      console.error('Missing create bounty data!');
      return;
    }
    setCreateBountyData({
      ...createBountyData,
      amount: Number(bountyRewardAmount) || 0,
    });
    navigation.navigate('AddSections');
  }
  return (
    <Layout>
      <View style={{gap: 20}}>
        <StyledText style={{fontSize: 24}}>Add Bounty Reward</StyledText>
        <StyledText style={{marginTop: -12, color: Colors.Gray[400]}}>
          {project?.title} / {create?.title}
        </StyledText>
        <StyledText>
          The Founder has committed {project?.quotePrice} to this project.
        </StyledText>
        <StyledText>Enter bounty reward amount:</StyledText>
        <StyledTextInput
          placeholder="Enter bounty reward amount"
          numberInput
          value={bountyRewardAmount}
          onChangeText={e => setBountyRewardAmount(e)}></StyledTextInput>
        <StyledButton onPress={onNextStep}>Next Step</StyledButton>
      </View>
    </Layout>
  );
}
