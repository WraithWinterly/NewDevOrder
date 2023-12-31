import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import BountyList from 'src/components/home/BountyList';
import AddButtonIcon from 'src/components/icons/AddButtonIcon';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useProjectsStore from 'src/stores/projectsStore';

export default function Drafts() {
  const bounties = useProjectsStore(state => state.bountiesForProject);
  // Used to force refresh project info, which will refetch bounties

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );

  const shown = bounties?.filter(bounty => bounty.stage === 'Draft');

  return (
    <Layout>
      <View style={{height: '100%'}}>
        <ScrollView>
          <BountyList bounties={shown} designerView noSort2 />
          {shown?.length === 0 && (
            <StyledText
              style={{
                textAlign: 'center',
                marginTop: 32,
                fontWeight: '500',
                fontSize: 18,
              }}>
              There are no drafts currently.
            </StyledText>
          )}
        </ScrollView>
      </View>

      <View style={{position: 'absolute', bottom: 0, right: 4}}>
        <TouchableOpacity
          onPress={() => {
            setCreateBountyData(undefined);
            navigation.navigate('CreateBounty', {
              existingID: undefined,
            });
          }}>
          <AddButtonIcon />
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
