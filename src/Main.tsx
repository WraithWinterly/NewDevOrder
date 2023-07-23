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
import StartBounty from './screens/bounties/StartBounty';
import MyWallet from './screens/wallet/MyWallet';
import MintNFTs from './screens/wallet/MintNFTs';
import MintNFTConfirm from './screens/wallet/MintNFTConfirm';
import MintRoleNFT from './screens/wallet/MintRoleNFT';

export type WelcomeStackParamList = {
  Welcome: undefined;
  WelcomeNoMembershipToken: undefined;
  WelcomeSetupProfile: undefined;
  WelcomeMintMembershipToken: undefined;
  WelcomeMintFailed: undefined;

  WelcomeComplete: undefined;
  WelcomeWalletFailed: undefined;
};

export type WalletParamList = {
  MyWallet: undefined;
  MintNFTs: undefined;
  MintNFTConfirm: undefined;
  MintRoleNFT: undefined;
};

export type StackParamList = WelcomeStackParamList &
  WalletParamList & {
    ProjectByID: undefined;
    TeamByID: undefined;
    HomeNavigation: undefined;
    ViewBounty: undefined;
    StartBounty: undefined;
  };

const Stack = createStackNavigator<StackParamList>();

const ShowHeaderOnRoutes = ['Welcome', 'ViewBounty', 'StartBounty'];

export default function Main() {
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: 'rgb(10, 132, 255)',
          background: 'rgb(43, 35, 35)',
          card: 'rgb(18, 18, 18)',
          text: 'rgb(229, 229, 231)',
          border: 'rgb(39, 39, 41)',
          notification: 'rgb(255, 69, 58)',
        },
      }}>
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
        <Stack.Screen
          name="ViewBounty"
          component={ViewBounty}
          options={{title: 'View Bounty'}}
        />
        <Stack.Screen
          name="StartBounty"
          component={StartBounty}
          options={{title: ''}}
        />
        <Stack.Screen name="ProjectByID" component={ProjectByID} />
        <Stack.Screen name="TeamByID" component={TeamByID} />
        {/* MyWallet: undefined; MintNFTs: undefined; MintNFTConfirm: undefined;
        MintRoleNFT: undefined; */}
        <Stack.Screen name="MyWallet" component={MyWallet} />
        <Stack.Screen name="MintNFTs" component={MintNFTs} />
        <Stack.Screen name="MintNFTConfirm" component={MintNFTConfirm} />
        <Stack.Screen name="MintRoleNFT" component={MintRoleNFT} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
