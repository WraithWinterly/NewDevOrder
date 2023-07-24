import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DiscoverBounties from './DiscoverBounties';
import YourBounties from './YourBounties';
import {Colors} from 'src/styles/styles';
import {useEffect} from 'react';
import useBountyStore from 'src/stores/bountyStore';
import useTeamsStore from 'src/stores/teamsStore';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  const fetchBounties = useBountyStore(state => state.fetchBounties);
  const fetchTeams = useTeamsStore(state => state.fetchTeams);

  useEffect(() => {
    fetchBounties();
    fetchTeams();
  }, []);

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
      <Tab.Screen name="Discover Bounties" component={DiscoverBounties} />
      <Tab.Screen name="Your Bounties" component={YourBounties} />
    </Tab.Navigator>
  );
}
