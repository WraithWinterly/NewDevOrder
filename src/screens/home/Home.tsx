import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DiscoverBounties from './DiscoverBounties';
import YourBounties from './YourBounties';
import {Colors} from 'src/styles/styles';
import useMemberStore from 'src/stores/membersStore';
import {RoleType} from 'src/sharedTypes';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
  const myProfile = useMemberStore(state => state.myProfile);
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
      {myProfile?.playingRole === RoleType.BountyHunter && (
        <Tab.Screen name="Discover Bounties" component={DiscoverBounties} />
      )}

      <Tab.Screen name="Your Bounties" component={YourBounties} />
    </Tab.Navigator>
  );
}
