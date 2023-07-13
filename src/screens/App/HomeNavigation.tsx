import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import BountyDetails from './BountyDetails';
import {Colors} from 'src/styles/styles';

const Drawer = createDrawerNavigator();

export default function HomeNavigation() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.Background,
        },
        headerShadowVisible: false,

        headerTitleStyle: {
          color: Colors.Text,
        },
        sceneContainerStyle: {
          backgroundColor: Colors.Background,
        },
        drawerContentStyle: {
          backgroundColor: Colors.Background,
        },
        drawerLabelStyle: {
          color: Colors.Text2,
        },
        // cardStyle: {
        //   backgroundColor: Colors.Background,
        // },
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="BountyDetails" component={BountyDetails} />
    </Drawer.Navigator>
  );
}
