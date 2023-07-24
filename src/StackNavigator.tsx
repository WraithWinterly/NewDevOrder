import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Colors} from './styles/styles';

import WelcomeSetupProfile from './screens/welcome/WelcomeSetupProfile';
import WelcomeMintMembershipToken from './screens/welcome/WelcomeMintMembershipToken';
import WelcomeComplete from './screens/welcome/WelcomeComplete';
import WelcomeWalletConnectFailed from './screens/welcome/WelcomeWalletConnectFailed';
import WelcomeNoMembershipToken from './screens/welcome/WelcomeNoMembershipToken';
import WelcomeMintFailed from './screens/welcome/WelcomeMintFailed';
import HomeTabNavigator from './screens/home/HomeTabNavigator';
import ProjectByID from './screens/projects/ProjectByID';
import TeamVar from './screens/teams/TeamVar';
import Welcome from './screens/welcome/Welcome';
import ViewBounty from './screens/bounties/ViewBounty';
import StartBounty from './screens/bounties/StartBounty';
import MyWallet from './screens/wallet/MyWallet';
import MintNFTs from './screens/wallet/MintNFTs';
import MintNFTConfirm from './screens/wallet/MintNFTConfirm';
import MintRoleNFT from './screens/wallet/MintRoleNFT';
import StackHeaderRight from './StackHeaderRight';
import NFTDetails from './screens/wallet/NFTDetails';
import MintVarNFT from './screens/wallet/MintVarNFT';
import useMintStore from './stores/mintStore';
import useTeamsStore from './stores/teamsStore';
import InviteMembers from './screens/teams/InviteMembers';
import CreateTeam from './screens/teams/CreateTeam';
import Profile from './screens/profile/Profile';

export type WelcomeStackParamList = {
  Welcome: undefined;
  WelcomeNoMembershipToken: undefined;
  WelcomeSetupProfile: undefined;
  WelcomeMintMembershipToken: undefined;
  WelcomeMintFailed: undefined;

  WelcomeComplete: undefined;
  WelcomeWalletFailed: undefined;
};

export type TeamParamList = {
  TeamVar: undefined;
  InviteMembers: undefined;
  CreateTeam: undefined;
};

export type WalletParamList = {
  MyWallet: undefined;
  MintNFTs: undefined;
  MintNFTConfirm: undefined;
  MintRoleNFT: undefined;
  MintVarNFT: undefined;
  NFTDetails: undefined;
};

export type StackParamList = WelcomeStackParamList &
  WalletParamList &
  TeamParamList & {
    Profile: undefined;
    ProjectByID: undefined;
    HomeNavigation: undefined;
    ViewBounty: undefined;
    StartBounty: undefined;
  };

const Stack = createStackNavigator<StackParamList>();

const HideStackHeader = ['HomeNavigation'];

export default function StackNavigator() {
  const nftToMint = useMintStore(state => state.nftToMint);
  const teamTitle = useTeamsStore(state => state.selectedTeam);
  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          primary: 'rgb(10, 132, 255)',
          background: 'rgb(22, 22, 22)',
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
          headerLeftContainerStyle: {
            paddingTop: 8,
          },
          headerTitleContainerStyle: {
            paddingTop: 8,
          },
          headerRightContainerStyle: {
            paddingTop: 8,
          },
          headerRight: () => <StackHeaderRight route={route.name} />,
          headerShadowVisible: false,
          headerShown: !HideStackHeader.includes(route.name),
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
          component={WelcomeWalletConnectFailed}
          options={{title: ''}}
        />
        <Stack.Screen name="HomeNavigation" component={HomeTabNavigator} />
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
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProjectByID" component={ProjectByID} />
        <Stack.Screen
          name="TeamVar"
          component={TeamVar}
          options={{
            title: teamTitle?.title || '',
          }}
        />
        <Stack.Screen
          name="InviteMembers"
          component={InviteMembers}
          options={{
            title: 'Invite Members',
          }}
        />
        <Stack.Screen
          name="CreateTeam"
          component={CreateTeam}
          options={{
            title: 'Create New Team',
          }}
        />
        {/* MyWallet: undefined; MintNFTs: undefined; MintNFTConfirm: undefined;
        MintRoleNFT: undefined; */}
        <Stack.Screen
          name="MyWallet"
          component={MyWallet}
          options={{title: 'My Wallet'}}
        />
        <Stack.Screen
          name="MintNFTs"
          component={MintNFTs}
          options={{title: 'Mint NFTs'}}
        />
        <Stack.Screen name="MintNFTConfirm" component={MintNFTConfirm} />
        <Stack.Screen
          name="MintRoleNFT"
          component={MintRoleNFT}
          options={{title: 'Mint Role NFT'}}
        />
        <Stack.Screen
          name="MintVarNFT"
          component={MintVarNFT}
          options={{
            title: `Mint ${nftToMint} NFT`,
          }}
        />
        <Stack.Screen
          name="NFTDetails"
          component={NFTDetails}
          options={{title: ''}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
