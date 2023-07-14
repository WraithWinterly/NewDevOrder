import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import BountyDetails from './BountyDetails';
import {Colors} from 'src/styles/styles';
import {Linking, View} from 'react-native';
import {useEffect, useId, useState} from 'react';
import asyncStorage from '@react-native-async-storage/async-storage';
import {Text} from 'react-native';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';
import NDO_Button from 'src/components/ndo/NDO_Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CloseIcon from 'src/components/images/CloseIcon';
import PlusIcon from 'src/components/images/PlusIcon';
import GrayCircleIcon from 'src/components/images/GrayCircleIcon';
import Project from '../Projects/Project';
import Team from '../Teams/Team';
import useAppContext from 'src/components/AppContext';

const Drawer = createDrawerNavigator();

export default function HomeNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
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
      <Drawer.Screen name="Developer" component={Developer} />
      <Drawer.Screen name="Project" component={Project} />
      <Drawer.Screen name="Team" component={Team} />
    </Drawer.Navigator>
  );
}

const teams = ['Team Solstice', 'Team 2', 'Team 3'];
const projects = ['Project Avalanche', 'New Dev Order'];

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {state, navigation, descriptors} = props;
  const id = useId();
  const id2 = useId();
  const {setTeam, setProject} = useAppContext();

  return (
    <DrawerContentScrollView
      {...props}
      style={{backgroundColor: Colors.Background}}>
      {/* <DrawerItemList {...props} /> */}
      <View style={{paddingHorizontal: 14}}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            paddingTop: 2,
            paddingBottom: 14,
          }}>
          <NDO_Text>My Teams</NDO_Text>
          <TouchableOpacity onPress={() => navigation.closeDrawer()}>
            <CloseIcon />
          </TouchableOpacity>
        </View>
        <DrawerItem
          label=""
          icon={() => (
            <View style={{flexDirection: 'row', gap: 18, alignItems: 'center'}}>
              <PlusIcon />
              <NDO_Text>Create a new team</NDO_Text>
            </View>
          )}
          labelStyle={{marginLeft: 0, color: Colors.Text}}
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
        />
        {teams.map((team, i) => (
          <DrawerItem
            label=""
            icon={() => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 22,
                  alignItems: 'center',
                  marginLeft: 3,
                }}>
                <GrayCircleIcon />
                <NDO_Text>{team}</NDO_Text>
              </View>
            )}
            labelStyle={{marginLeft: 0, color: Colors.Text}}
            onPress={() => {
              setTeam(team);
              navigation.navigate('Team');
            }}
            key={`${team}-${i}-${id}`}
          />
        ))}
        <View style={{borderBottomWidth: 2, borderColor: '#49454F'}}></View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            paddingVertical: 20,
          }}>
          <NDO_Text>My Projects</NDO_Text>
        </View>
        <DrawerItem
          label=""
          icon={() => (
            <View style={{flexDirection: 'row', gap: 18, alignItems: 'center'}}>
              <PlusIcon />
              <NDO_Text>Create a new project</NDO_Text>
            </View>
          )}
          labelStyle={{marginLeft: 0, color: Colors.Text}}
          onPress={() => Linking.openURL('https://mywebsite.com/help')}
        />
        {projects.map((project, i) => (
          <DrawerItem
            label=""
            icon={() => (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 22,
                  alignItems: 'center',
                  marginLeft: 3,
                }}>
                <GrayCircleIcon />
                <NDO_Text>{project}</NDO_Text>
              </View>
            )}
            labelStyle={{marginLeft: 0, color: Colors.Text}}
            onPress={() => {
              setProject(project);
              navigation.navigate('Project');
            }}
            key={`${project}-${i}-${id}`}
          />
        ))}
        {__DEV__ && (
          <>
            <View style={{borderBottomWidth: 2, borderColor: '#49454F'}}></View>
            <DrawerItem
              label="Developer_Test_Menu_Unofficial"
              labelStyle={{color: Colors.Text}}
              onPress={() => {
                navigation.navigate('Developer');
              }}
            />
          </>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

function Developer() {
  function onResetWelcomeScreen() {
    useEffect(() => {
      asyncStorage.removeItem('hasCompletedWelcome');
      asyncStorage.removeItem('walletConnectData');
    }, []);
  }

  return (
    <Layout>
      <NDO_Button onPress={onResetWelcomeScreen}>
        Reset Welcome Screen
      </NDO_Button>
    </Layout>
  );
}
