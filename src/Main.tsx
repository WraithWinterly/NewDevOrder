import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from './styles/styles';

import WelcomeSetupProfile from './screens/Welcome/WelcomeSetupProfile';
import WelcomeMintMembershipToken from './screens/Welcome/WelcomeMintMembershipToken';
import WelcomeComplete from './screens/Welcome/WelcomeComplete';
import WelcomeWalletFailed from './screens/Welcome/WelcomeWalletFailed';
import WelcomeNoMembershipToken from './screens/Welcome/WelcomeNoMembershipToken';
import WelcomeMintFailed from './screens/Welcome/WelcomeMintFailed';
import TabNavigation from './screens/App/TabNavigator';
import ProjectByID from './screens/Projects/ProjectByID';
import TeamByID from './screens/Teams/TeamByID';
import Welcome from './screens/Welcome/Welcome';

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
        <Stack.Screen name="ProjectByID" component={ProjectByID} />
        <Stack.Screen name="TeamByID" component={TeamByID} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
