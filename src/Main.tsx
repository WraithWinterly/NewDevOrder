import {
  NavigationContainer,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './screens/Home';
import BountyDetails from './screens/BountyDetails';
import Header from './layout/Header';
import {Colors} from './styles/styles';
import Welcome from './screens/Welcome/Welcome';
import WelcomeSetupProfile from './screens/Welcome/WelcomeSetupProfile';
import WelcomeMintMembershipToken from './screens/Welcome/WelcomeMintMembershipToken';
import WelcomeComplete from './screens/Welcome/WelcomeComplete';
import WelcomeWalletFailed from './screens/Welcome/WelcomeWalletFailed';

export type StackParamList = {
  Welcome: undefined;
  WelcomeSetupProfile: undefined;
  WelcomeMintMembershipToken: undefined;
  WelcomeComplete: undefined;
  WelcomeWalletFailed: undefined;
  Home: undefined;
  BountyDetails: undefined;
};

const Stack = createStackNavigator<StackParamList>();
export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.Background,
          },
          headerShadowVisible: false,

          headerTitleStyle: {
            color: Colors.Text,
          },
          cardStyle: {
            backgroundColor: Colors.Background,
          },
        }}>
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

        <Stack.Screen name="Home" component={Home} options={{title: 'Home'}} />
        <Stack.Screen
          name="BountyDetails"
          component={BountyDetails}
          options={{title: 'Bounty Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
