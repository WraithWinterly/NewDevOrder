import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProjectStage} from 'prisma/generated';
import {Bounty} from 'prisma/generated';
import React, {useId, useState} from 'react';
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
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const project = useProjectsStore(state => state.selectedProject);
  const bountiesForProject = useProjectsStore(
    state => state.bountiesForProject,
  );

  const create = useBountyStore(state => state.createBountyData);
  const createBountyData = useBountyStore(state => state.createBountyData);
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  const id = useId();

  const [bountyRewardAmount, setBountyRewardAmount] = useState(
    create?.reward || undefined,
  );
  const [errors, setErrors] = useState<string[]>([]);

  function calc() {
    let leftOver = project?.quotePrice || 0;
    const withoutMe = bountiesForProject?.filter(
      b => b.id !== createBountyData?.id,
    );
    withoutMe?.forEach(bounty => {
      leftOver -= bounty.reward;
    });

    return leftOver;
  }

  function onNextStep() {
    setErrors([]);
    let localErrors: Array<string> = [];

    if (!createBountyData) {
      console.error('Missing create bounty data!');
      return;
    }
    if ((bountyRewardAmount || 0) > calc()) {
      localErrors.push(
        'Insufficient funds for this action. Reduce your bounty reward.',
      );
    }
    if ((bountyRewardAmount || 0) <= 0) {
      localErrors.push('Please enter a valid bounty reward amount.');
    }
    if (localErrors.length > 0) {
      setErrors(localErrors);
      return;
    }

    setCreateBountyData({
      ...createBountyData,
      reward: Number(bountyRewardAmount) || 0,
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
        <StyledText>
          You have <Text style={{fontWeight: '500'}}>${calc()}</Text> remaining
          in funds.
        </StyledText>
        <StyledText>Enter bounty reward amount:</StyledText>
        <StyledTextInput
          placeholder="Enter bounty reward amount"
          numberInput
          value={`$${bountyRewardAmount ?? ''}`}
          onChangeText={e =>
            setBountyRewardAmount(
              e.replace('$', '').length > 0
                ? Number(e.replace('$', ''))
                : undefined,
            )
          }></StyledTextInput>
        {errors.length > 0 &&
          errors.map((e, i) => (
            <StyledText
              style={{color: Colors.Red[400]}}
              key={`error-${i}-${id}`}>
              {errors[0]}
            </StyledText>
          ))}
        <StyledButton
          onPress={onNextStep}
          enabled={
            (bountyRewardAmount || 0) <= calc() && (bountyRewardAmount || 0) > 0
          }>
          Next Step
        </StyledButton>
      </View>
    </Layout>
  );
}
