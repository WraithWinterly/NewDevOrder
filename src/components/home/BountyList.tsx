import {RefreshControl, TouchableOpacity, View} from 'react-native';
import {Colors} from 'src/styles/styles';
import {formatTimeAgo} from 'src/utils/utils';
import StyledText from '../ui/styled/StyledText';
import {FlatList} from 'react-native';
import {useEffect, useId, useState} from 'react';
import CashIcon from '../icons/CashIcon';
import TeamsIcon from '../icons/TeamsIcon';
import CalendarIcon from '../icons/CalendarIcon';
import RightArrowIcon from '../icons/RightArrowIcon';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

import useBountyStore from 'src/stores/bountyStore';
import Bubble from '../ui/Bubble';

export default function BountyList({
  searchText,
  yourBounties,
}: {
  searchText?: string;
  yourBounties: boolean;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const id = useId();

  const setSelectedFullBounty = useBountyStore(
    state => state.setSelectedFullBounty,
  );

  const bounties = useBountyStore(state => state.bounties);
  const fetchBounties = useBountyStore(state => state.fetchBounties);

  const search = bounties?.filter(bounty => {
    if (bounty.title.includes(searchText || '')) {
      if (yourBounties) {
        return bounty.youJoined;
      }
      return bounty;
    }
  });
  const [refreshing, setRefreshing] = useState(false);

  function onRefresh() {
    setRefreshing(true);
    fetchBounties().then(() => {
      setRefreshing(false);
    });
  }

  return (
    // <ScrollView style={{gap: 10, height: '100%', paddingBottom: 400}}>
    //   {search?.map((bounty, i) => (
    //     <View
    //       key={`${bounty.id}-${i}-${id}`}
    //       style={{
    //         backgroundColor: Colors.BackgroundLighter,
    //         padding: 18,
    //         borderRadius: 10,
    //         marginVertical: 10,
    //         gap: 8,
    //       }}>
    //       <StyledText style={{fontWeight: 'bold', fontSize: 20}}>
    //         {bounty.title}
    //       </StyledText>
    //       <StyledText
    //         style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
    //         {formatTimeAgo(bounty.postDate)}
    //       </StyledText>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           flexWrap: 'wrap',
    //           gap: 8,
    //         }}>
    //         <View
    //           style={{
    //             backgroundColor: '#4F378B',
    //             borderRadius: 12,
    //             paddingHorizontal: 12,
    //             paddingVertical: 2,
    //           }}>
    //           <StyledText
    //             style={{
    //               padding: 8,
    //               borderRadius: 100,
    //             }}>
    //             {bounty.projectName}
    //           </StyledText>
    //         </View>

    //         <View
    //           style={{
    //             backgroundColor: '#485844',
    //             borderRadius: 12,
    //             paddingHorizontal: 12,
    //             paddingVertical: 2,
    //             height: 44,
    //             justifyContent: 'center',
    //           }}>
    //           <StyledText>
    //             {bounty.active ? 'Accepting Submissions' : 'Not Active'}
    //           </StyledText>
    //         </View>
    //         <View
    //           style={{
    //             backgroundColor: '#4A4458',
    //             borderRadius: 12,
    //             paddingHorizontal: 18,
    //             paddingVertical: 2,
    //             height: 44,
    //             justifyContent: 'center',
    //           }}>
    //           <StyledText>{bounty.type}</StyledText>
    //         </View>
    //       </View>
    //       <StyledText
    //         style={{color: Colors.Text2, fontSize: 14, paddingVertical: 2}}>
    //         {bounty.description}
    //       </StyledText>

    //       <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
    //         <CashIcon />
    //         <StyledText style={{fontWeight: '500'}}>
    //           Bonty Reward: {bounty.reward} SOL
    //         </StyledText>
    //       </View>
    //       <View
    //         style={{
    //           flexDirection: 'row',
    //           gap: 6,
    //           alignItems: 'center',
    //           paddingTop: 2,
    //         }}>
    //         <CalendarIcon />
    //         <StyledText>Deadline: {bounty.deadline.toDateString()}</StyledText>
    //       </View>
    //       <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
    //         <TeamsIcon small />
    //         <StyledText>Teams Currently Hacking: {bounty.teamCount}</StyledText>
    //       </View>
    //       <TouchableOpacity
    //         style={{
    //           flexDirection: 'row',
    //           alignItems: 'center',
    //           gap: 8,
    //           paddingTop: 8,
    //         }}
    //         onPress={() => {
    //           setSelectedFullBounty(bounty.id);
    //           navigation.navigate('ViewBounty');
    //         }}>
    //         <StyledText style={{color: '#D0BCFF'}}>View Details</StyledText>
    //         <RightArrowIcon />
    //       </TouchableOpacity>
    //     </View>
    //   ))}
    //   <View style={{height: 100}} />
    // </ScrollView>

    <FlatList
      data={search}
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
            <Bubble type="purple" text={bounty.projectName} />
            <Bubble
              type="green"
              text={bounty.active ? 'Accepting Submissions' : 'Not Active'}
            />
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
            <StyledText>Deadline: {bounty.deadline.toDateString()}</StyledText>
          </View>
          <View style={{flexDirection: 'row', gap: 6, alignItems: 'center'}}>
            <TeamsIcon small />
            <StyledText>Teams Currently Hacking: {bounty.teamCount}</StyledText>
          </View>
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
  );
}
