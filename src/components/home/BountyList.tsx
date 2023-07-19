import {TouchableOpacity, View} from 'react-native';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import NDO_Text from '../ndo/NDO_Text';
import {ScrollView} from 'react-native-gesture-handler';
import {useId} from 'react';
import CashIcon from '../images/CashIcon';
import TeamsIcon from '../images/TeamsIcon';
import CalendarIcon from '../images/CalendarIcon';
import RightArrowIcon from '../images/RightArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/Main';
import useAppContext from '../AppProvider';

interface Bounties {
  data: Array<Bounty>;
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  projectName: string;
  active: boolean;
  type: 'Frontend' | 'Backend' | 'Fullstack' | 'Web3';
  reward: number;
  deadline: Date;
  teamCount: number;
}
const Bounties: Bounties = {
  data: [
    {
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
    },
    {
      id: '2',
      title: 'Emoji Translator',
      description:
        "Do you love emojis? We need someone to develop an emoji translator that can convert text into emojis and vice versa. Let's make communication more fun!",
      postDate: new Date('2023-07-15'),
      projectName: 'Project Emoji',
      active: true,
      type: 'Web3',
      reward: 50,
      deadline: new Date('2023-08-31'),
      teamCount: 1,
    },
    {
      id: '3',
      title: 'Time-Traveling Website',
      description:
        'Ever wished you could go back in time? We want you to build a website that simulates time travel. Let users experience historical events as if they were there!',
      postDate: new Date('2023-07-14'),
      projectName: 'Project Time Warp',
      active: true,
      type: 'Fullstack',
      reward: 200,
      deadline: new Date('2023-12-31'),
      teamCount: 2,
    },
    {
      id: '4',
      title: 'AI Stand-up Comedian',
      description:
        "Are you a programming genius with a great sense of humor? We're looking for someone to create an AI stand-up comedian that can crack jokes about coding and technology. Make the nerds laugh!",
      postDate: new Date('2023-07-13'),
      projectName: 'Project LOLCode',
      active: true,
      type: 'Backend',
      reward: 150,
      deadline: new Date('2024-02-28'),
      teamCount: 1,
    },
    {
      id: '5',
      title: 'Reverse-Engineering Puzzle',
      description:
        'Calling all puzzle enthusiasts and code breakers! We have a mysterious device that needs to be reverse-engineered. Solve the puzzle and unveil its secrets!',
      postDate: new Date('2023-07-12'),
      projectName: 'Project Enigma',
      active: true,
      type: 'Web3',
      reward: 75,
      deadline: new Date('2023-10-31'),
      teamCount: 3,
    },
  ],
};

export default function BountyList() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  const {setViewBountyId} = useAppContext();
  return (
    <ScrollView style={{gap: 10, height: '100%', paddingBottom: 400}}>
      {Bounties.data.map((bounty, i) => (
        <View
          key={`${bounty.id}-${i}-${id}`}
          style={{
            backgroundColor: Colors.BackgroundLighter,
            padding: 18,
            borderRadius: 10,
            marginVertical: 10,
            gap: 8,
          }}>
          <NDO_Text style={{fontWeight: 'bold', fontSize: 20}}>
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
                paddingHorizontal: 12,
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
                paddingHorizontal: 12,
                paddingVertical: 2,
                height: 44,
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
                paddingHorizontal: 18,
                paddingVertical: 2,
                height: 44,
                justifyContent: 'center',
              }}>
              <NDO_Text>{bounty.type}</NDO_Text>
            </View>
          </View>
          <NDO_Text
            style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
            {bounty.description}
          </NDO_Text>

          <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
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
          <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
            <TeamsIcon small />
            <NDO_Text>Teams Currently Hacking: {bounty.teamCount}</NDO_Text>
          </View>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingTop: 8,
            }}
            onPress={() => {
              setViewBountyId(bounty.id);
              navigation.navigate('ViewBounty');
            }}>
            <NDO_Text style={{color: '#D0BCFF'}}>View Details</NDO_Text>
            <RightArrowIcon />
          </TouchableOpacity>
        </View>
      ))}
      <View style={{height: 100}} />
    </ScrollView>
  );
}
