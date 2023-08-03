import {TouchableOpacity, View} from 'react-native';

import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import Collapsible from 'react-native-collapsible';
import {useEffect, useId, useState} from 'react';
import {ScrollView} from 'react-native';
import CollapsibleArrow from 'src/components/icons/CollapsibleArrow';
import TeamsIcon from 'src/components/icons/TeamsIcon';
import CalendarIcon from 'src/components/icons/CalendarIcon';
import CashIcon from 'src/components/icons/CashIcon';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import StyledButton from 'src/components/ui/styled/StyledButton';

import {StackParamList} from 'src/StackNavigator';

import useBountyStore from 'src/stores/bountyStore';
import Separator from 'src/components/ui/Separator';
import Bubble from 'src/components/ui/Bubble';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import useTeamsStore from 'src/stores/teamsStore';

type Props = NativeStackScreenProps<StackParamList, 'ViewBounty'>;

export default function ViewBounty({route, navigation}: Props) {
  const bounty = useBountyStore(state => state.selectedBounty);
  const bounties = useBountyStore(state => state.bounties);
  // const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  const id2 = useId();
  // const route = useRoute <RouteProp<StackParamList>();
  const isValidator = route.params?.isValidator ?? false;

  const teams = useTeamsStore(state => state.teams);

  const [startedByTeams, setStartedByTeams] = useState<string[]>([]);

  function updateStartedBy() {
    if (!bounties) return;
    if (!bounty) return;

    const localTeams: Array<string> = [];

    teams?.forEach(team => {
      if (bounty?.participantsTeamIDs.includes(team.id)) {
        localTeams.push(team.name);
      }
    });

    setStartedByTeams(localTeams);
  }

  useEffect(() => {
    updateStartedBy();
  }, [bounty, bounties, teams]);

  useEffect(() => {
    updateStartedBy();
  }, []);

  return (
    <Layout>
      <View style={{height: '100%'}}>
        <View
          style={{
            position: 'absolute',
            bottom: -28,
            width: '110%',
            paddingHorizontal: 24,
            marginLeft: -18,
            paddingVertical: 14,
            // height: 42,
            backgroundColor: Colors.AppBar,
            zIndex: 1,
          }}>
          {isValidator ? (
            bounty?.stage === 'ReadyForTests' ? (
              <StyledButton
                type="normal2"
                onPress={() => navigation.navigate('AddTestCases')}>
                Add test cases
              </StyledButton>
            ) : (
              <StyledButton
                type="normal2"
                onPress={() => navigation.navigate('AddTestCases')}>
                View submissions
              </StyledButton>
            )
          ) : (
            <View>
              <StyledButton
                type="normal2"
                onPress={() => navigation.navigate('StartBounty')}>
                Start Bounty
              </StyledButton>

              {startedByTeams.length > 0 && (
                <View style={{paddingLeft: 8}}>
                  <View style={{height: 12}}></View>

                  {/* Creates a comma seperated list (ex: Started by: My Team, Team2, Team3) etc */}
                  <StyledText key={`${0}-${id2}`}>
                    Started by:{' '}
                    {startedByTeams.map(
                      (team, i) =>
                        `${team}${i === startedByTeams.length - 1 ? '' : ', '}`,
                    )}
                  </StyledText>
                </View>
              )}
            </View>
          )}
        </View>
        <ScrollView>
          {!!bounty && (
            <View style={{flexDirection: 'column', gap: 10}}>
              {isValidator && (
                <View>
                  <StyledText style={{fontWeight: 'bold', fontSize: 28}}>
                    Review bounty
                  </StyledText>
                  <StyledText style={{fontSize: 16}}>
                    This will be posted on the bounty feed when submitted and
                    reviewed.
                  </StyledText>
                  <Separator />
                </View>
              )}
              <StyledText style={{fontWeight: 'bold', fontSize: 28}}>
                {bounty.title}
              </StyledText>
              <StyledText
                style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
                {formatTimeAgo(bounty.postDate)}
              </StyledText>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 8,
                }}>
                <Bubble type="purple" text={bounty.project?.title} />

                {bounty.stage === 'Active' && (
                  <Bubble type="green" text="Accepting Submissions" />
                )}

                <Bubble type="normal" text={bounty.type} />
              </View>

              <View style={{height: 12}}></View>
              <DropdownSection title="Bounty Overview">
                <View style={{flexDirection: 'column', gap: 10}}>
                  <StyledText>{bounty.description}</StyledText>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'center',
                    }}>
                    <CashIcon />
                    <StyledText style={{fontWeight: '500'}}>
                      Bonty Reward: {bounty.reward} SOL
                    </StyledText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'center',
                      paddingTop: 2,
                    }}>
                    <CalendarIcon />
                    <StyledText>
                      Deadline: {new Date(bounty.deadline).toDateString()}
                    </StyledText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      gap: 6,
                      alignItems: 'center',
                    }}>
                    <TeamsIcon small />
                    <StyledText>
                      Teams Currently Hacking:{' '}
                      {bounty.participantsTeamIDs?.length}
                    </StyledText>
                  </View>
                </View>
              </DropdownSection>

              {/* {!!bounty.headerSections &&
                Object.keys(bounty.headerSections).map((section, i) => (
                  <DropdownSection title={section} key={`${id}-${i}`}>
                    {!!bounty.headerSections &&
                      (bounty.headerSections as {[key: string]: string[]}) &&
                      bounty.headerSections[section].map((text, index) => (
                        <StyledText key={index}>- {text}</StyledText>
                      ))}
                  </DropdownSection>
                ))} */}

              {/* Founder */}
              {!!bounty.founder && (
                <View
                  style={{
                    padding: 16,
                    backgroundColor: Colors.BackgroundLighter,
                    borderRadius: 20,
                    marginBottom: 38,
                  }}>
                  <StyledText style={{fontSize: 20, fontWeight: 'bold'}}>
                    Meet the founder - {bounty.founder?.firstName}
                  </StyledText>
                  <StyledText style={{color: Colors.Gray[400]}}>
                    {bounty.founder?.username}
                  </StyledText>
                  <StyledText style={{paddingTop: 4}}>
                    {bounty.founder?.bio}
                  </StyledText>
                </View>
              )}
            </View>
          )}
          <View style={{paddingVertical: 30}}></View>
        </ScrollView>
      </View>
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
          <StyledText style={{fontSize: 20, fontWeight: '500'}}>
            {title}
          </StyledText>
          <CollapsibleArrow faceDown={!collapsed} />
        </View>
      </TouchableOpacity>

      <Collapsible collapsed={collapsed}>{children}</Collapsible>
      <Separator />
    </>
  );
}
