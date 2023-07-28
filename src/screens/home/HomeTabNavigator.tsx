import Home from './Home';
import Projects from '../projects/Projects';
import Teams from '../teams/Teams';

import {Colors} from 'src/styles/styles';
import Inbox from '../inbox/Inbox';
import {ReactNode, useState} from 'react';
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

import useAppStore from 'src/stores/store';
import useMemberStore from 'src/stores/membersStore';

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
  Teams: 'Your Teams',
  Bounties: 'Bounties',
  Inbox: 'Inbox',
  Projects: 'Your Projects',
  Dev: '__UNOFFICIAL__',
};

const Tab = createBottomTabNavigator<MainTabsParams>();

export default function HomeTabNavigator() {
  const playingRole = useMemberStore(state => state.myProfile?.playingRole);

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
      {playingRole?.title === 'Bounty Hunter' && (
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon focused={focused} icon={<HomeIcon />} />
            ),
          }}
        />
      )}

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
      {playingRole?.title !== 'Bounty Hunter' && (
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
