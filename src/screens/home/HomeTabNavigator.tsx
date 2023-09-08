import Home from './Home';
import Projects from '../projects/Projects';
import Teams from '../teams/Teams';

import {Colors} from 'src/styles/styles';
import Inbox from '../inbox/Inbox';
import {ReactNode, useEffect, useState} from 'react';
import {Platform, View} from 'react-native';
import HomeIcon from 'src/components/icons/HomeIcon';
import InboxIcon from 'src/components/icons/InboxIcon';
import ProjectsIcon from 'src/components/icons/ProjectsIcon';
import TeamsIcon from 'src/components/icons/TeamsIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DeveloperMenu from './DeveloperMenu';
import StyledText from 'src/components/ui/styled/StyledText';
import CodeIcon from 'src/components/icons/CodeIcon';

import HeaderRight from './HeaderRight';

import useMemberStore from 'src/stores/membersStore';
import useBountyStore from 'src/stores/bountyStore';
import {RoleType} from 'src/sharedTypes';
import Admin from '../admin/Admin';
import AdminIcon from 'src/components/icons/AdminIcon';

export type MainTabsParams = {
  Home: undefined;
  Teams: undefined;
  Bounties: undefined;
  Inbox: undefined;
  Projects: undefined;
  Admin: undefined;
  Dev: undefined;
};

const tabToHeaderText = {
  Home: 'Home',
  Teams: 'Your Teams',
  Bounties: 'Bounties',
  Inbox: 'Inbox',
  Projects: 'Your Projects',
  Admin: 'Admin',
  Dev: '__DEVELOPER__',
};

const Tab = createBottomTabNavigator<MainTabsParams>();

export default function HomeTabNavigator() {
  const playingRole = useMemberStore(state => state.myProfile?.playingRole);

  const fetchBounties = useBountyStore(state => state.fetchBounties);
  const myProfile = useMemberStore(state => state.myProfile);
  useEffect(() => {
    fetchBounties();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: Colors.Background,
      }}
      screenOptions={({route}) => ({
        headerLeft: () =>
          route.name === 'Home' ? (
            <StyledText
              style={{paddingLeft: 30, fontWeight: 'bold', fontSize: 20}}>
              Welcome
            </StyledText>
          ) : (
            <StyledText style={{marginLeft: 20, fontSize: 20}}>
              {tabToHeaderText[route.name]}
            </StyledText>
          ),

        headerRight: () => <HeaderRight />,
        headerTitle: '',

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
        headerShadowVisible: false,

        headerTitleStyle: {
          color: Colors.Text,
        },
        tabBarStyle: {
          backgroundColor: Colors.AppBar,
          borderTopColor: Colors.AppBar,
          paddingHorizontal: 8,
          height: Platform.OS === 'ios' ? 98 : 68,
          paddingBottom: Platform.OS === 'ios' ? 0 : 12,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          color: Colors.Text2,
          fontSize: 14,
          fontWeight: 'bold',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon={<HomeIcon />} />
          ),
        }}
      />

      <Tab.Screen
        name="Teams"
        component={Teams}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon={<TeamsIcon />} />
          ),
        }}
      />

      <Tab.Screen
        name="Inbox"
        component={Inbox}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon={<InboxIcon />} />
          ),
        }}
      />
      {playingRole !== RoleType.BountyHunter && (
        <Tab.Screen
          name="Projects"
          component={Projects}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon focused={focused} icon={<ProjectsIcon />} />
            ),
          }}
        />
      )}
      {myProfile?.admin && myProfile.adminec && (
        <Tab.Screen
          name="Admin"
          component={Admin}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon focused={focused} icon={<AdminIcon />} />
            ),
          }}
        />
      )}
      {__DEV__ && (
        <Tab.Screen
          name="Dev"
          component={DeveloperMenu}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon focused={focused} icon={<CodeIcon />} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

function TabBarIcon({focused, icon}: {focused: boolean; icon: ReactNode}) {
  const [touching, setTouching] = useState(false);
  return (
    <View
      onTouchStart={() => setTouching(true)}
      onTouchEnd={() => setTouching(false)}
      style={{
        backgroundColor:
          focused || touching ? Colors.Secondary : Colors.Transparent,

        paddingHorizontal: 18,
        paddingVertical: 4,
        borderRadius: 50,
        marginBottom: 4,
      }}>
      {icon}
    </View>
  );
}
