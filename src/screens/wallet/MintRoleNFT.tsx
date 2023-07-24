import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import LongLinkNavigation from 'src/components/ui/LongLinkNavigation';

import Layout from 'src/layout/Layout';
import useMintStore from 'src/stores/mintStore';
import {type Roles} from 'src/styles/types';

export default function MintRoleNFT() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const setNftToMint = useMintStore(state => state.setNftToMint);
  function handlePress(nftType: Roles) {
    setNftToMint(nftType);
    navigation.navigate('MintVarNFT');
  }
  return (
    <Layout>
      <ScrollView>
        <LongLinkNavigation
          name="Bounty Hunter License"
          description="Allows you to compete for bounties and earn rewards."
          bottomText="Requirements: 1 SOL"
          onPress={() => handlePress('Bounty Hunter')}
        />
        <LongLinkNavigation
          name="Founder License"
          description="Allows you to create projects and post bounties to the NDO app.
After minting your Founder role, an NDO admin will reach out to you."
          bottomText="Requirements: 1 SOL"
          onPress={() => handlePress('Founder')}
        />
        <LongLinkNavigation
          name="Bounty Manager License"
          description="Your role is to communicate with Founders and Bounty Designers. Understand requirements and determine the scope of the MVP."
          enabled={false}
          bottomText="Requirements: 1 SOL, Level 15"
          onPress={() => handlePress('Bounty Manager')}
        />
        <LongLinkNavigation
          name="Bounty Designer License"
          description="Your role is to create the Bounty Design Document, used by Bounty Hunters."
          enabled={false}
          bottomText="Requirements: 1 SOL, Level 15"
          onPress={() => handlePress('Bounty Designer')}
        />
        <LongLinkNavigation
          name="Bounty Validator License"
          description="Your role is to judge the solutions submitted by Bounty Hunters to determine which solutions is best given the requirements."
          enabled={false}
          bottomText="Requirements: 1 SOL, Level 15"
          onPress={() => handlePress('Bounty Validator')}
        />
      </ScrollView>
    </Layout>
  );
}
