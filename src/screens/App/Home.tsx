import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DiscoverBounties from './DiscoverBounties';
import YourBounties from './YourBounties';
import {Colors} from 'src/styles/styles';

const Tab = createMaterialTopTabNavigator();

export default function Home() {
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

// export default function Home() {
//   const navigation = useNavigation<StackNavigationProp<StackParamList>>();

//   const {team} = useAppContext();
//   const [searchBounties, setSearchBounties] = useState('');
//   return (
//     <Layout>
//       <NDO_TextInput
//         value={searchBounties}
//         onChangeText={e => setSearchBounties(e)}
//         placeholder="Search Bounties"
//         icon={<SearchIcon />}
//       />
//       <BountyList />
//     </Layout>
//   );
// }
