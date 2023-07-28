import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from 'src/styles/styles';
import PendingBounties from './PendingBounties';
import PendingSubmissions from './PendingSubmissions';

type ProjectWorkspaceNavigatorParamList = {
  PendingBounties: undefined;
  PendingSubmissions: undefined;
};

const Tab = createMaterialTopTabNavigator<ProjectWorkspaceNavigatorParamList>();

export default function ValidatorNavigator() {
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
        name="PendingBounties"
        component={PendingBounties}
        options={{title: 'Pending Bounties'}}
      />
      <Tab.Screen
        name="PendingSubmissions"
        component={PendingSubmissions}
        options={{title: 'Pending Submissions'}}
      />
    </Tab.Navigator>
  );
}
