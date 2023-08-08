import {TouchableOpacity, View} from 'react-native';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import StyledText from '../ui/styled/StyledText';
import {useId} from 'react';
import CashIcon from '../icons/CashIcon';
import TeamsIcon from '../icons/TeamsIcon';
import CalendarIcon from '../icons/CalendarIcon';
import RightArrowIcon from '../icons/RightArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

import useBountyStore from 'src/stores/bountyStore';
import Bubble from '../ui/Bubble';
import CheckIcon from '../icons/CheckIcon';
import WarningIcon from '../icons/WarningIcon';

import {Bounty, Project} from 'prisma/generated';
import {BountyStage} from 'prisma/generated';

export default function BountyList({
  bounties,
  designerView,
  validatorView,
}: {
  bounties: (Bounty & {
    project: Project;
  })[];
  designerView?: boolean;
  validatorView?: boolean;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();
  const id2 = useId();

  const setSelectedFullBounty = useBountyStore(
    state => state.setSelectedBounty,
  );

  const fetchBounties = useBountyStore(state => state.fetchBounties);

  return (
    <>
      {bounties.map((bounty, index) => (
        <View
          key={`${bounty.id}-${index}-${id}`}
          style={{
            backgroundColor: Colors.BackgroundLighter,
            padding: 18,
            borderRadius: 10,
            marginVertical: 10,
            gap: 8,
          }}>
          <StyledText style={{fontWeight: 'bold', fontSize: 20}}>
            {bounty.title}
          </StyledText>
          {designerView && bounty.stage === 'Active' && (
            <YouPostedThisBounty date={bounty.postDate} />
          )}
          {bounty.stage === 'Active' && (
            <StyledText
              style={{
                color: Colors.Text2,
                fontSize: 14,
                paddingVertical: 2,
              }}>
              Posted {formatTimeAgo(bounty.postDate)}
            </StyledText>
          )}
          {validatorView &&
            bounty.stage === 'Active' &&
            (bounty.testCases.length === 0 ? (
              <BountyWarning text="Required action: Add test cases" />
            ) : (
              <BountyWarning text="Required action: Review Submissions" />
            ))}
          {bounty.stage === 'PendingApproval' && (
            <BountyWarning text="Pending Approval" />
          )}
          {/* {validatorView && bounty.stage === 'Active' && (
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                alignItems: 'center',
                paddingVertical: 8,
              }}>
              <WarningIcon />
              <StyledText>
                There are submissions that need to be reviewed.
              </StyledText>
            </View>
          )} */}

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 8,
            }}>
            <Bubble type="purple" text={bounty.project.title} />
            {bounty.stage === 'Active' && (
              <Bubble type="green" text="Accepting Submissions" />
            )}
            {bounty.stage === 'Completed' && (
              <Bubble type="green" text="Completed" />
            )}

            {bounty.types.map((type, index) => (
              <Bubble type="normal" text={type} key={`type-${index}-${id2}`} />
            ))}
          </View>
          <StyledText
            style={{
              color: Colors.Text2,
              fontSize: 14,
              paddingVertical: 2,
            }}>
            {bounty.description}
          </StyledText>

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
              Teams Currently Hacking: {bounty.participantsTeamIDs.length}
            </StyledText>
          </View>
          {((bounty.stage === BountyStage.Active &&
            !designerView &&
            !validatorView) ||
            bounty.stage === 'Completed') && (
            <RoundArrowButton
              title="View Details"
              onPress={() => {
                setSelectedFullBounty(bounty.id);
                navigation.navigate('ViewBounty');
              }}
            />
          )}

          {designerView &&
            (bounty.stage === 'Draft' || bounty.stage === 'Completed' ? (
              <RoundArrowButton
                title={
                  bounty.stage === 'Draft' ? 'Continue Editing' : 'View Details'
                }
                onPress={() => {
                  setSelectedFullBounty(bounty.id);
                  navigation.navigate('ViewBounty', {
                    isDesigner: true,
                  });
                }}
              />
            ) : (
              bounty.stage === 'Active' && (
                <RoundArrowButton
                  title="View Submissions"
                  onPress={() => {
                    setSelectedFullBounty(bounty.id);
                    navigation.navigate('ViewBounty');
                  }}
                />
              )
            ))}
          {validatorView &&
            bounty.stage === 'Active' &&
            (bounty.testCases.length === 0 ? (
              <RoundArrowButton
                title="View Bounty"
                onPress={() => {
                  setSelectedFullBounty(bounty.id);
                  navigation.navigate('ViewBounty', {
                    isValidator: true,
                  });
                }}
              />
            ) : (
              <RoundArrowButton
                title="View Submissions"
                onPress={() => {
                  setSelectedFullBounty(bounty.id);
                  navigation.navigate('ViewBounty', {
                    isValidator: true,
                  });
                }}
              />
            ))}
          {bounty.stage === 'PendingApproval' && (
            <RoundArrowButton
              title="View Approvals"
              onPress={() => {
                setSelectedFullBounty(bounty.id);
                navigation.navigate('ViewBounty');
              }}
            />
          )}
        </View>
      ))}
    </>
  );
}

function BountyWarning({text}: {text: string}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        paddingVertical: 8,
      }}>
      <WarningIcon />
      <StyledText>{text}</StyledText>
    </View>
  );
}

function RoundArrowButton({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 24,
        justifyContent: 'center',
        alignItems: 'stretch',
        marginHorizontal: 22,
        paddingTop: 12,
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          paddingVertical: 12,
          paddingHorizontal: 22,
          borderColor: Colors.BorderColor,
          borderWidth: 1,
          borderRadius: 50,
          width: '100%',
        }}
        onPress={onPress}>
        <StyledText
          style={{
            color: '#D0BCFF',
            alignItems: 'center',
          }}>
          {title}
        </StyledText>
        <RightArrowIcon />
      </TouchableOpacity>
    </View>
  );
}

function YouPostedThisBounty({date}: {date: Date}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
        paddingVertical: 8,
      }}>
      <CheckIcon />
      <StyledText>You posted this bounty {formatTimeAgo(date)}.</StyledText>
    </View>
  );
}
