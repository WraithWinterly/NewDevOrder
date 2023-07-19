import Home from './Home';
import Projects from '../projects/Projects';
import Teams from '../teams/Teams';

import {Colors} from 'src/styles/styles';
import Inbox from '../inbox/Inbox';
import {ReactNode, useState} from 'react';
import {Platform, View} from 'react-native';
import HomeIcon from 'src/components/images/HomeIcon';
import InboxIcon from 'src/components/images/InboxIcon';
import ProjectsIcon from 'src/components/images/ProjectsIcon';
import TeamsIcon from 'src/components/images/TeamsIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import ProfileIcon from 'src/components/images/ProfileIcon';
import LeaderboardIcon from 'src/components/images/LeaderboardIcon';
import TeamSelector from 'src/components/TeamSelector';
import __DEVMenu__ from './__DEVMenu__';
import NDO_Text from 'src/components/ndo/NDO_Text';
import CodeIcon from 'src/components/images/CodeIcon';

export type MainTabsParams = {
  Home: undefined;
  Teams: undefined;
  Bounties: undefined;
  Inbox: undefined;
  Projects: undefined;
  Dev: undefined;
};

const tabToHeaderText = {
  Home: 'Home',
  ViewBounty: 'View Bounty',
  Teams: 'Your Teams',
  Bounties: 'Bounties',
  Inbox: 'Inbox',
  Projects: 'Your Projects',
  Dev: '__UNOFFICIAL__',
};

const Tab = createBottomTabNavigator<MainTabsParams>();

export default function TabNavigation() {
  const isFounder = false;

  return (
    <Tab.Navigator
      initialRouteName="Home"
      sceneContainerStyle={{
        backgroundColor: Colors.Background,
      }}
      screenOptions={({route}) => ({
        headerLeft: () =>
          route.name === 'Home' ? (
            <TeamSelector />
          ) : (
            <NDO_Text style={{marginLeft: 20, fontSize: 20}}>
              {tabToHeaderText[route.name]}
            </NDO_Text>
          ),

        headerRight: () => (
          <View
            style={{
              flexDirection: 'row',
              gap: 12,

              alignItems: 'center',
              paddingRight: 14,
            }}>
            <LeaderboardIcon />
            <ProfileIcon />
          </View>
        ),
        headerTitle: '',

        headerStyle: {
          backgroundColor: Colors.Background,
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
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
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
      {isFounder && (
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
      {__DEV__ && (
        <Tab.Screen
          name="Dev"
          component={__DEVMenu__}
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
