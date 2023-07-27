import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import RightArrowIcon from 'src/components/icons/RightArrowIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';

export default function AddRewards() {
  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 20}}>
        Add Bounty Reward
      </Text>
      <Text style={{fontSize: 18, marginBottom: 20}}>project/bounty name</Text>
      <Text style={{marginBottom: 20}}>
        The Founder has committed $15000 to this project.
      </Text>
      <StyledButton>
        <Text style={{color: '#FFFFFF', fontWeight: 'bold', marginRight: 5}}>
          Mint Bounty NFT
        </Text>
        <RightArrowIcon />{' '}
        {/* Assuming you have the RightArrowIcon component */}
      </StyledButton>
    </View>
  );
}
