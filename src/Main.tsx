import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from './styles/styles';

import WelcomeSetupProfile from './screens/welcome/WelcomeSetupProfile';
import WelcomeMintMembershipToken from './screens/welcome/WelcomeMintMembershipToken';
import WelcomeComplete from './screens/welcome/WelcomeComplete';
import WelcomeWalletFailed from './screens/welcome/WelcomeWalletFailed';
import WelcomeNoMembershipToken from './screens/welcome/WelcomeNoMembershipToken';
import WelcomeMintFailed from './screens/welcome/WelcomeMintFailed';
import TabNavigation from './screens/app/TabNavigator';
import ProjectByID from './screens/projects/ProjectByID';
import TeamByID from './screens/teams/TeamByID';
import Welcome from './screens/welcome/Welcome';
import ViewBounty from './screens/bounties/ViewBounty';

export type StackParamList = WelcomeStackParamList & {
  Welcome: undefined;
  ProjectByID: undefined;
  TeamByID: undefined;

  WelcomeNoMembershipToken: undefined;
  WelcomeSetupProfile: undefined;
  WelcomeMintMembershipToken: undefined;
  WelcomeMintFailed: undefined;

  WelcomeComplete: undefined;
  WelcomeWalletFailed: undefined;
  HomeNavigation: undefined;
  ViewBounty: undefined;
};

export type WelcomeStackParamList = {
  WelcomeHome: undefined;
  WelcomeNoMembershipToken: undefined;
  WelcomeSetupProfile: undefined;
  WelcomeMintMembershipToken: undefined;
  WelcomeMintFailed: undefined;

  WelcomeComplete: undefined;
  WelcomeWalletFailed: undefined;
  HomeNavigation: undefined;
};

const Stack = createStackNavigator<StackParamList>();

const ShowHeaderOnRoutes = ['Welcome', 'ViewBounty'];

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
          headerShown: ShowHeaderOnRoutes.includes(route.name),
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
          name="WelcomeNoMembershipToken"
          component={WelcomeNoMembershipToken}
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
          name="WelcomeMintFailed"
          component={WelcomeMintFailed}
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
        <Stack.Screen name="HomeNavigation" component={TabNavigation} />
        <Stack.Screen name="ViewBounty" component={ViewBounty} />
        <Stack.Screen name="ProjectByID" component={ProjectByID} />
        <Stack.Screen name="TeamByID" component={TeamByID} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
