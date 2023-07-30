import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import useMemberStore from 'src/stores/membersStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';

export default function Inbox() {
  const id = useId();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setMemberAddrViewing = useMemberStore(state => state.fetchProfile);
  const setTeam = useTeamsStore(state => state.setSelectedTeam);
  const myProfile = useMemberStore(state => state.myProfile);
  const [refreshing, setRefreshing] = useState(false);

  function onConfirm() {
    // switch (noti.type) {
    //   case 'InvitedJoinTeam':
    //     navigation.navigate('TeamVar');
    //     break;
    //   case 'RequestJoinTeam':
    //     navigation.navigate('TeamVar');
    //     break;
    //   case 'BountyWon':
    //     navigation.navigate('ViewBounty');
    //     break;
    // }
  }

  function onDelete() {
    // remove from array with this ID
    // removeNotification(noti.id);
  }

  function onRefresh() {
    // setRefreshing(true);
    // fetchNotifications().then(() => setRefreshing(false));
  }

  return (
    <Layout>
      <StyledText style={{fontWeight: '500', fontSize: 20, marginBottom: 8}}>
        Latest Messages
      </StyledText>
      {!!myProfile && myProfile.pendingTeamInvites.length > 0 && (
        <FlatList
          data={myProfile.pendingTeamInvites}
          keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item, index}) => (
            <View
              style={{
                backgroundColor: Colors.BackgroundLighter,
                padding: 12,
                marginVertical: 8,
                borderRadius: 12,
                flexDirection: 'row',
                gap: 12,
              }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  backgroundColor: Colors.Gray[200],
                  borderRadius: 50,
                }}></View>
              <View key={`${id}-${index}`} style={{width: '80%'}}>
                {myProfile.pendingTeamInvites.length > 0 && (
                  <Text style={{fontSize: 16, lineHeight: 28}}>
                    <Text
                      onPress={() => {
                        setMemberAddrViewing(item.fromAddress);
                        navigation.navigate('Profile', {
                          viewProfileAddress: item.fromAddress,
                        });
                      }}
                      style={{color: Colors.Primary}}>
                      {item.fromName}
                    </Text>
                    <Text> invited you to join their team, </Text>
                    <Text
                      onPress={() => {
                        setTeam(item.toTeamId);
                        navigation.navigate('TeamVar');
                      }}
                      style={{color: Colors.Primary}}>
                      {item.toTeamName}
                    </Text>
                    .
                  </Text>
                )}

                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: 12,
                    alignItems: 'center',
                  }}>
                  <StyledButton type="borderNoFill" onPress={() => onConfirm()}>
                    <Text>Join Team</Text>
                  </StyledButton>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </Layout>
  );
}
