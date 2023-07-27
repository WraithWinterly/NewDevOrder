import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from 'src/styles/styles';
import ActiveBounties from './ActiveBounties';
import Drafts from './Drafts';
import Completed from './Completed';

type ProjectWorkspaceNavigatorParamList = {
  ActiveBounties: undefined;
  Drafts: undefined;
  Completed: undefined;
};

const Tab = createMaterialTopTabNavigator<ProjectWorkspaceNavigatorParamList>();

export default function ProjectWorkspaceNavigator() {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: Colors.Background,
      }}
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.Background,
          shadowColor: Colors.Purple[300],
        },
        tabBarIndicatorStyle: {
          backgroundColor: Colors.Purple[300],
        },
        tabBarActiveTintColor: Colors.Purple[300],
        tabBarInactiveTintColor: Colors.Gray[300],
      }}>
      <Tab.Screen
        name="ActiveBounties"
        component={ActiveBounties}
        options={{title: 'Active Bounties'}}
      />
      <Tab.Screen name="Drafts" component={Drafts} />
      <Tab.Screen name="Completed" component={Completed} />
    </Tab.Navigator>
  );
}
