import {Linking, TouchableOpacity, View} from 'react-native';
import useAppContext from 'src/components/AppProvider';
import {Bounty} from 'src/components/home/BountyList';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';

import Collapsible from 'react-native-collapsible';
import {Dispatch, SetStateAction, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import CollapsibleArrow from 'src/components/images/CollapsibleArrow';
import TeamsIcon from 'src/components/images/TeamsIcon';
import CalendarIcon from 'src/components/images/CalendarIcon';
import CashIcon from 'src/components/images/CashIcon';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import NDO_Button from 'src/components/ndo/NDO_Button';

function getBountyByID(id: string) {
  type FullBounty = Bounty & {
    submissions: string[];
    aboutProject: string;
    recentActivity: string;
    questions: string[];
    techStack: {name: string; link: string}[];
    requirementsSpecifications: {section: string; description: string}[];
    solutionConstraints: string[];
    toolsToUse: string[];
    deliverables: string[];
    founder: {
      name: string;
      tag: string;
      bio: string;
    };
  };
  const data: FullBounty = {
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

    submissions: ['Team Solvers', 'Team Solvers', 'Team Givers'],

    aboutProject:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, rerum.',
    recentActivity: '3 teams started this bounty',
    questions: ['How do I get started?'],
    techStack: [
      {
        name: 'Flutter: A UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. ',
        link: 'https://docs.flutter.dev',
      },
      {
        name: 'Dart: The programming language used by Flutter to build applications.',
        link: 'https://dart.dev/',
      },
      {
        name: 'Vercel: Vercel to deploy the application on Web. You may use a platform of your choice to deploy on web as well.',
        link: 'https://vercel.com/',
      },
      {
        name: 'Github: A web-based platform for version control and collaboration that allows developers to host and review code, manage projects, and build software alongside millions of other developers.',
        link: 'https://github.com/',
      },
    ],
    requirementsSpecifications: [
      {
        section: 'Home Page: User Info',
        description: 'First name... (Input, Required)',
      },
      {
        section: 'Home Page: User Info',
        description: 'Last name... (Input, Required)',
      },
      {
        section: 'Button',
        description: 'CTA (Button Text): Wallet Connect',
      },
      {
        section: 'Result Page;',
        description:
          'Upon clicking "Wallet Connect" button, show the following, success message, opt-in CTA message.',
      },
    ],

    solutionConstraints: [
      'Deployable on three platforms',
      'Performance',
      'Passes all test cases on three platforms',
    ],
    toolsToUse: [
      'use: flutter',
      'use: any IDE',
      'use: Dart, DartPad',
      'use: Best practices and recommendations from Flutter',
    ],
    deliverables: [
      'Completed Code checked in to the repository with a unique folder name that indicates your contribution. It is the parent folder for all deliverables.',
    ],
    founder: {
      name: 'Dr Whetsel',
      tag: '@drwhetsel',
      bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, ipsa.',
    },
  };
  return data;
}

export default function ViewBounty() {
  const {viewBountyId} = useAppContext();
  const bounty = getBountyByID(viewBountyId);

  const [bountyOverviewCollapsed, setBountyOverviewCollapsed] = useState(false);

  const [techStackCollapsed, setTechStackCollapsed] = useState(false);
  const [requirementsCollapsed, setRequirementsCollapsed] = useState(false);
  const [flowCollapsed, setFlowCollapsed] = useState(false);
  const [constraintsCollapsed, setConstraintsCollapsed] = useState(false);
  const [toolsCollapsed, setToolsCollapsed] = useState(false);
  const [deliverablesCollapsed, setDeliverablesCollapsed] = useState(false);

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

          <View
            style={{
              padding: 20,
              backgroundColor: Colors.BackgroundLighter,
              borderRadius: 14,
            }}>
            <NDO_Text
              style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 8}}>
              About {bounty.projectName}
            </NDO_Text>
            <NDO_Text>{bounty.aboutProject} </NDO_Text>
          </View>

          <View
            style={{
              padding: 20,
              backgroundColor: Colors.BackgroundLighter,
              borderRadius: 14,
            }}>
            <NDO_Text
              style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 8}}>
              Recent Activity
            </NDO_Text>
            <NDO_Text>{bounty.recentActivity}</NDO_Text>
          </View>

          <View
            style={{
              padding: 20,
              backgroundColor: Colors.BackgroundLighter,
              borderRadius: 14,
            }}>
            <NDO_Text
              style={{fontSize: 20, fontWeight: 'bold', paddingBottom: 8}}>
              Questions
            </NDO_Text>
            <View>
              {bounty.questions.map(question => (
                <View
                  style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
                  <TeamsIcon small />
                  <NDO_Text>{question}</NDO_Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{paddingTop: 24}}></View>
          <DropdownSection
            title="Bounty Overview"
            collapsed={bountyOverviewCollapsed}
            setCollapsed={setBountyOverviewCollapsed}>
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

          {/* Tech Stack */}
          <DropdownSection
            title="Tech Stack"
            collapsed={techStackCollapsed}
            setCollapsed={setTechStackCollapsed}>
            <NDO_Text>
              <NDO_Text style={{fontStyle: 'italic'}}>{bounty.title}</NDO_Text>{' '}
              utilizes the following technologies and frameworks:
            </NDO_Text>

            {bounty.techStack.map((tech, index) => (
              <View key={index} style={{paddingVertical: 8}}>
                <NDO_Text>- {tech.name}</NDO_Text>
                <NDO_Text
                  onPress={() => Linking.openURL(tech.link)}
                  style={{textDecorationLine: 'underline'}}>
                  {tech.link}
                </NDO_Text>
              </View>
            ))}
          </DropdownSection>

          {/* Requirements Specifications */}
          <DropdownSection
            title="Requirements Specifications"
            collapsed={requirementsCollapsed}
            setCollapsed={setRequirementsCollapsed}>
            <NDO_Text>Requirements Specifications:</NDO_Text>
            {bounty.requirementsSpecifications.map((spec, index) => (
              <View key={index}>
                <NDO_Text>{spec.section}</NDO_Text>
                <NDO_Text>{spec.description}</NDO_Text>
              </View>
            ))}
          </DropdownSection>

          {/* The Flow */}
          <DropdownSection
            title="The Flow"
            collapsed={flowCollapsed}
            setCollapsed={setFlowCollapsed}>
            {/* Add the content for The Flow section */}
          </DropdownSection>

          {/* Solution Constraints */}
          <DropdownSection
            title="Solution Constraints"
            collapsed={constraintsCollapsed}
            setCollapsed={setConstraintsCollapsed}>
            {bounty.solutionConstraints.map((constraint, index) => (
              <NDO_Text key={index}>- {constraint}</NDO_Text>
            ))}
          </DropdownSection>

          {/* Tools to Use */}
          <DropdownSection
            title="Tools to Use"
            collapsed={toolsCollapsed}
            setCollapsed={setToolsCollapsed}>
            {bounty.toolsToUse.map((tool, index) => (
              <NDO_Text key={index}>- {tool}</NDO_Text>
            ))}
          </DropdownSection>

          {/* Deliverables */}
          <DropdownSection
            title="Deliverables"
            collapsed={deliverablesCollapsed}
            setCollapsed={setDeliverablesCollapsed}>
            {bounty.deliverables.map((deliverable, index) => (
              <NDO_Text key={index}>- {deliverable}</NDO_Text>
            ))}
          </DropdownSection>

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
        <NDO_Button>Start Bounty</NDO_Button>
        <View style={{paddingVertical: 30}}></View>
      </ScrollView>
    </Layout>
  );
}

function DropdownSection({
  title,
  collapsed,
  setCollapsed,
  children,
}: {
  title: string;
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
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
