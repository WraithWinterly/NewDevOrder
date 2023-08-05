import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import BountyList from 'src/components/home/BountyList';
import AddButtonIcon from 'src/components/icons/AddButtonIcon';
import PlusIcon from 'src/components/icons/PlusIcon';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useProjectsStore from 'src/stores/projectsStore';

export default function Drafts() {
  const bounties = useProjectsStore(state => state.bountiesForProject);
  // Used to force refresh project info, which will refetch bounties
  const selectedProject = useProjectsStore(state => state.selectedProject);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setCreateBountyData = useBountyStore(
    state => state.setCreateBountyData,
  );
  function onRefresh() {
    setRefreshing(true);
    if (!selectedProject) return;
    setSelectedProject(selectedProject.id).then(() => {
      setRefreshing(false);
    });
  }

  const shown = bounties?.filter(bounty => bounty.stage === 'Draft');

  return (
    <Layout>
      <View style={{height: '100%'}}>
        <ScrollView>
          {shown && (
            <>
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
              <BountyList
                refreshing={refreshing}
                bounties={shown}
                onRefresh={onRefresh}
                designerView
              />
            </>
          )}
        </ScrollView>
      </View>

      <View style={{position: 'absolute', bottom: 0, right: 4}}>
        <TouchableOpacity
          onPress={() => {
            setCreateBountyData(undefined);
            navigation.navigate('CreateBounty');
          }}>
          <AddButtonIcon />
        </TouchableOpacity>
      </View>
    </Layout>
  );
}
