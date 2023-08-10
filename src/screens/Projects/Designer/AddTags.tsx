import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProjectStage} from 'prisma/generated';
import {BountyType} from 'prisma/generated';
import {Bounty} from 'prisma/generated';
import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import CheckIcon from 'src/components/icons/CheckIcon';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledCheckbox from 'src/components/ui/styled/StyledCheckbox';
import StyledText from 'src/components/ui/styled/StyledText';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useProjectsStore from 'src/stores/projectsStore';
import {Colors} from 'src/styles/styles';

export default function AddTags() {
  const project = useProjectsStore(state => state.selectedProject);
  const create = useBountyStore(state => state.createBountyData);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const createBountyData = useBountyStore(state => state.createBountyData);

  const [typeFrontEnd, setTypeFrontEnd] = useState(
    createBountyData?.types.includes(BountyType.Frontend) ? true : false,
  );
  const [typeBackend, setTypeBackend] = useState(
    createBountyData?.types.includes(BountyType.Backend) ? true : false,
  );
  const [typeWeb3, setTypeWeb3] = useState(
    createBountyData?.types.includes(BountyType.Web3) ? true : false,
  );
  const [typeFullstack, setTypeFullstack] = useState(
    createBountyData?.types.includes(BountyType.Fullstack) ? true : false,
  );

  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  function onNextStep() {
    if (!createBountyData) {
      console.error('Missing create bounty data!');
      return;
    }
    const types: BountyType[] = [];

    if (typeFrontEnd) {
      types.push(BountyType.Frontend);
    }
    if (typeBackend) {
      types.push(BountyType.Backend);
    }
    if (typeFullstack) {
      types.push(BountyType.Fullstack);
    }
    if (typeWeb3) {
      types.push(BountyType.Web3);
    }

    setCreateBountyData({
      ...createBountyData,
      types,
    });
    navigation.navigate('AddRewards');
  }
  return (
    <Layout>
      <View style={{gap: 20}}>
        <StyledText style={{fontSize: 24}}>Add Bounty Tags</StyledText>
        <StyledText style={{marginTop: -12, color: Colors.Gray[400]}}>
          {project?.title} / {create?.title}
        </StyledText>
        <StyledText>Add tags to this project (optional)</StyledText>
        <StyledCheckbox
          title="Frontend"
          value={typeFrontEnd}
          onValueChange={setTypeFrontEnd}
        />
        <StyledCheckbox
          title="Backend"
          value={typeBackend}
          onValueChange={setTypeBackend}
        />
        <StyledCheckbox
          title="Fullstack"
          value={typeFullstack}
          onValueChange={setTypeFullstack}
        />
        <StyledCheckbox
          title="Web3"
          value={typeWeb3}
          onValueChange={setTypeWeb3}
        />

        <StyledButton onPress={onNextStep}>Next Step</StyledButton>
      </View>
    </Layout>
  );
}
