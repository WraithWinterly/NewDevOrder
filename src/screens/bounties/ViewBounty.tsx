import {Linking, TouchableOpacity, View} from 'react-native';
import useAppContext from 'src/components/AppProvider';

import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';

import Collapsible from 'react-native-collapsible';
import {Dispatch, SetStateAction, useId, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import CollapsibleArrow from 'src/components/images/CollapsibleArrow';
import TeamsIcon from 'src/components/images/TeamsIcon';
import CalendarIcon from 'src/components/images/CalendarIcon';
import CashIcon from 'src/components/images/CashIcon';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import NDO_Button from 'src/components/ndo/NDO_Button';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from 'src/Main';
import {StackNavigationProp} from '@react-navigation/stack';
import {FullBounty} from 'src/types/types';

const sampleData: FullBounty = {
  id: '1',
  title: 'Front-End Cross-Platform Flutter Application',
  description:
    'Build working and deployable code and final software package for Front-End Cross-Platform application, built using Flutter.',
  postDate: new Date('2021-01-01'),
  projectName: 'Project 1',
  active: true,
  type: 'Frontend',
  reward: 100,
  deadline: new Date(),
  teamCount: 1,
  youJoined: true,

  submissions: ['Team Solvers', 'Team Solvers', 'Team Givers'],

  aboutProject:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, rerum.',
  recentActivity: '3 teams started this bounty',
  questions: ['How do I get started?'],
  headerSections: {
    'Tech Stack': [
      'Flutter: A UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.',
      'https://docs.flutter.dev',
      'Dart: The programming language used by Flutter to build applications.',
      'https://dart.dev/',
      'Vercel: Vercel to deploy the application on Web. You may use a platform of your choice to deploy on web as well.',
      'https://vercel.com/',
      'Github: A web-based platform for version control and collaboration that allows developers to host and review code, manage projects, and build software alongside millions of other developers.',
      'https://github.com/',
    ],

    'Requirements Specifications': [
      'Home Page: User Info - First name... (Input, Required)',
      'Home Page: User Info - Last name... (Input, Required)',
      'Button - CTA (Button Text): Wallet Connect',
      'Result Page - Upon clicking "Wallet Connect" button, show the following, success message, opt-in CTA message.',
    ],

    'Solution Constraints': [
      'Deployable on three platforms',
      'Performance',
      'Passes all test cases on three platforms',
    ],

    'Tools to Use': [
      'use: flutter',
      'use: any IDE',
      'use: Dart, DartPad',
      'use: Best practices and recommendations from Flutter',
    ],

    Deliverables: [
      'Completed Code checked in to the repository with a unique folder name that indicates your contribution. It is the parent folder for all deliverables.',
    ],
  },

  founder: {
    name: 'Dr Whetsel',
    tag: '@drwhetsel',
    bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, ipsa.',
  },
};

export default function ViewBounty() {
  const {viewBountyId, setSelectedFullBounty} = useAppContext();

  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  function getBountyByID(id: string) {
    const data = sampleData;
    setSelectedFullBounty(data);
    return sampleData;
  }
  const bounty = getBountyByID(viewBountyId);

  return (
    <Layout>
      <ScrollView>
        <View style={{flexDirection: 'column', gap: 10}}>
          <NDO_Text style={{fontWeight: 'bold', fontSize: 28}}>
            {bounty.title}
          </NDO_Text>
          <NDO_Text
            style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
            {formatTimeAgo(bounty.postDate)}
          </NDO_Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}>
            <View
              style={{
                backgroundColor: '#4F378B',
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 2,
              }}>
              <NDO_Text
                style={{
                  padding: 8,
                  borderRadius: 100,
                }}>
                {bounty.projectName}
              </NDO_Text>
            </View>

            <View
              style={{
                backgroundColor: '#485844',
                borderRadius: 12,
                paddingHorizontal: 18,
                paddingVertical: 2,
                justifyContent: 'center',
              }}>
              <NDO_Text>
                {bounty.active ? 'Accepting Submissions' : 'Not Active'}
              </NDO_Text>
            </View>
            <View
              style={{
                backgroundColor: '#4A4458',
                borderRadius: 12,
                paddingHorizontal: 24,
                paddingVertical: 2,
                height: 44,
                justifyContent: 'center',
              }}>
              <NDO_Text>{bounty.type}</NDO_Text>
            </View>
          </View>

          <View style={{height: 12}}></View>
          <DropdownSection title="Bounty Overview">
            <View style={{flexDirection: 'column', gap: 10}}>
              <NDO_Text>{bounty.description}</NDO_Text>
              <View
                style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                <CashIcon />
                <NDO_Text style={{fontWeight: '500'}}>
                  Bonty Reward: {bounty.reward} SOL
                </NDO_Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                  paddingTop: 2,
                }}>
                <CalendarIcon />
                <NDO_Text>Deadline: {bounty.deadline.toDateString()}</NDO_Text>
              </View>
              <View
                style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                <TeamsIcon small />
                <NDO_Text>Teams Currently Hacking: {bounty.teamCount}</NDO_Text>
              </View>
            </View>
          </DropdownSection>

          {Object.keys(bounty.headerSections).map((section, i) => (
            <DropdownSection title={section} key={`${id}-${i}`}>
              {bounty.headerSections[section].map((text, index) => (
                <NDO_Text key={index}>- {text}</NDO_Text>
              ))}
            </DropdownSection>
          ))}

          {/* Founder */}
          <View
            style={{
              padding: 16,
              backgroundColor: Colors.BackgroundLighter,
              borderRadius: 20,
              marginBottom: 38,
            }}>
            <NDO_Text style={{fontSize: 20, fontWeight: 'bold'}}>
              Meet the founder - {bounty.founder.name}
            </NDO_Text>
            <NDO_Text style={{color: Colors.Gray[400]}}>
              {bounty.founder.tag}
            </NDO_Text>
            <NDO_Text style={{paddingTop: 4}}>{bounty.founder.bio}</NDO_Text>
          </View>
        </View>
        <NDO_Button onPress={() => navigation.navigate('StartBounty')}>
          Start Bounty
        </NDO_Button>
        <View style={{paddingVertical: 30}}></View>
      </ScrollView>
    </Layout>
  );
}

function DropdownSection({
  title,

  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setCollapsed(prev => !prev)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
          }}>
          <NDO_Text style={{fontSize: 20, fontWeight: '500'}}>{title}</NDO_Text>
          <CollapsibleArrow faceDown={!collapsed} />
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>{children}</Collapsible>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: '#79747E',
          padding: 8,

          marginBottom: 14,
        }}></View>
    </>
  );
}
