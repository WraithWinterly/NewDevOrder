import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/App/Home';
import BountyDetails from './screens/App/BountyDetails';
import Header from './layout/Header';
import {Colors} from './styles/styles';
import Welcome from './screens/Welcome/Welcome';
import WelcomeSetupProfile from './screens/Welcome/WelcomeSetupProfile';
import WelcomeMintMembershipToken from './screens/Welcome/WelcomeMintMembershipToken';
import WelcomeComplete from './screens/Welcome/WelcomeComplete';
import WelcomeWalletFailed from './screens/Welcome/WelcomeWalletFailed';

import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigation from './screens/App/HomeNavigation';

export type StackParamList = {
  Welcome: undefined;
  WelcomeSetupProfile: undefined;
  WelcomeMintMembershipToken: undefined;
  WelcomeComplete: undefined;
  WelcomeWalletFailed: undefined;
  HomeNavigation: undefined;
  BountyDetails: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const Drawer = createDrawerNavigator();
export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={({route}) => ({
          headerStyle: {
            backgroundColor: Colors.Background,
          },
          headerShadowVisible: false,
          headerShown: route.name.includes('Welcome'),

          headerTitleStyle: {
            color: Colors.Text,
          },

          cardStyle: {
            backgroundColor: Colors.Background,
          },
        })}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{title: ''}}
        />
        <Stack.Screen
          name="WelcomeSetupProfile"
          component={WelcomeSetupProfile}
          options={{title: ''}}
        />
        <Stack.Screen
          name="WelcomeMintMembershipToken"
          component={WelcomeMintMembershipToken}
          options={{title: ''}}
        />
        <Stack.Screen
          name="WelcomeComplete"
          component={WelcomeComplete}
          options={{title: ''}}
        />
        <Stack.Screen
          name="WelcomeWalletFailed"
          component={WelcomeWalletFailed}
          options={{title: ''}}
        />

        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
        <Stack.Screen name="BountyDetails" component={BountyDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
