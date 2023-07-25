import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors} from 'src/styles/styles';
import LeaderboardBountyHunters from './LeaderboardBountyHunters';
import LeaderboardFounders from './LeaderboardFounders';

const Tab = createMaterialTopTabNavigator();

export default function LeaderboardNavigation() {
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
      <Tab.Screen name="Bounty Hunters" component={LeaderboardBountyHunters} />
      <Tab.Screen name="Founders" component={LeaderboardFounders} />
    </Tab.Navigator>
  );
}
