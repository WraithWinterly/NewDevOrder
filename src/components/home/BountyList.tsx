import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import StyledText from '../ui/styled/StyledText';
import {FlatList} from 'react-native';
import {useId} from 'react';
import CashIcon from '../icons/CashIcon';
import TeamsIcon from '../icons/TeamsIcon';
import CalendarIcon from '../icons/CalendarIcon';
import RightArrowIcon from '../icons/RightArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

import useBountyStore, {Bounty} from 'src/stores/bountyStore';
import Bubble from '../ui/Bubble';
import CheckIcon from '../icons/CheckIcon';
import WarningIcon from '../icons/WarningIcon';
import StyledButton from '../ui/styled/StyledButton';

export default function BountyList({
  bounties,
  onRefresh,
  refreshing,
  designerView,
  validatorView,
}: {
  bounties: Bounty[] | undefined;
  onRefresh: () => void;
  refreshing: boolean;
  designerView?: boolean;
  validatorView?: boolean;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();

  const setSelectedFullBounty = useBountyStore(
    state => state.setSelectedBounty,
  );

  const fetchBounties = useBountyStore(state => state.fetchBounties);

  return (
    <>
      {!bounties && (
        <View style={{alignItems: 'center'}}>
          <StyledText>No Bounties Found Yet</StyledText>
          <StyledButton onPress={() => fetchBounties()}>Refresh</StyledButton>
        </View>
      )}
      <FlatList
        data={bounties}
        renderItem={({item: bounty, index: i}) => (
          <View
            key={`${bounty.id}-${i}-${id}`}
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
              <View
                style={{
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <CheckIcon />
                <StyledText>
                  You posted this bounty {formatTimeAgo(bounty.postDate)}.
                </StyledText>
              </View>
            )}
            {!designerView && !validatorView && bounty.stage === 'Active' && (
              <StyledText
                style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
                Posted {formatTimeAgo(bounty.postDate)}
              </StyledText>
            )}
            {validatorView && bounty.stage === 'ReadyForTests' && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 6,
                  alignItems: 'center',
                  paddingVertical: 8,
                }}>
                <WarningIcon />
                <StyledText>Required action: Add test cases</StyledText>
              </View>
            )}
            {validatorView && bounty.stage === 'Active' && (
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
            )}

            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
              }}>
              <Bubble type="purple" text={bounty.projectName} />
              {bounty.stage === 'Active' && (
                <Bubble type="green" text="Accepting Submissions" />
              )}
              {bounty.stage === 'Completed' && (
                <Bubble type="green" text="Completed" />
              )}
              <Bubble type="normal" text={bounty.type} />
            </View>
            <StyledText
              style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
              {bounty.description}
            </StyledText>

            <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
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
            <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
              <TeamsIcon small />
              <StyledText>
                Teams Currently Hacking: {bounty.teamCount}
              </StyledText>
            </View>
            {bounty.stage === 'Active' && !designerView && !validatorView && (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  paddingTop: 8,
                }}
                onPress={() => {
                  setSelectedFullBounty(bounty.id);
                  navigation.navigate('ViewBounty');
                }}>
                <StyledText style={{color: '#D0BCFF'}}>View Details</StyledText>
                <RightArrowIcon />
              </TouchableOpacity>
            )}
            {designerView && bounty.stage === 'Active' && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 24,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <StyledText style={{color: Colors.Primary}}>
                  Edit Bounty
                </StyledText>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 12,
                    paddingVertical: 12,
                    paddingHorizontal: 22,
                    borderColor: Colors.BorderColor,
                    borderWidth: 1,
                    borderRadius: 50,
                  }}
                  onPress={() => {
                    setSelectedFullBounty(bounty.id);
                    navigation.navigate('ViewBounty');
                  }}>
                  <StyledText style={{color: '#D0BCFF'}}>
                    View Submisions
                  </StyledText>
                  <RightArrowIcon />
                </TouchableOpacity>
              </View>
            )}
            {designerView &&
              (bounty.stage === 'Draft' || bounty.stage === 'Completed') && (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 24,
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    marginHorizontal: 22,
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
                    onPress={() => {
                      setSelectedFullBounty(bounty.id);
                      navigation.navigate('ViewBounty');
                    }}>
                    <StyledText
                      style={{color: '#D0BCFF', alignItems: 'center'}}>
                      {bounty.stage === 'Draft'
                        ? 'Continue editing'
                        : 'View Details'}
                    </StyledText>
                    <RightArrowIcon />
                  </TouchableOpacity>
                </View>
              )}
            {validatorView && (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 24,
                  justifyContent: 'center',
                  alignItems: 'stretch',
                  marginHorizontal: 22,
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
                  onPress={() => {
                    setSelectedFullBounty(bounty.id);
                    navigation.navigate('ViewBounty', {
                      isValidator: true,
                    });
                  }}>
                  <StyledText style={{color: '#D0BCFF', alignItems: 'center'}}>
                    {bounty.stage === 'ReadyForTests'
                      ? 'View Bounty'
                      : 'View Submissions'}
                  </StyledText>
                  <RightArrowIcon />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[Colors.Primary]}
            progressBackgroundColor={Colors.Background}
          />
        }
        keyExtractor={item => `${id}-${item.id.toString()}`}
        ListFooterComponent={<View style={{height: 100}} />}></FlatList>
    </>
  );
}
