import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {RefreshControl, Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useInboxStore from 'src/stores/inboxStore';
import {Notification} from 'src/sharedTypes';
import useMemberStore from 'src/stores/membersStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';

export default function Inbox() {
  const id = useId();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setMemberAddrViewing = useMemberStore(state => state.fetchProfile);
  const setTeam = useTeamsStore(state => state.setSelectedTeam);

  const [refreshing, setRefreshing] = useState(false);

  const removeNotification = useInboxStore(state => state.removeNotification);
  const notifications = useInboxStore(state => state.notifications);
  const fetchNotifications = useInboxStore(state => state.fetchInbox);

  useEffect(() => {
    fetchNotifications();
  }, []);

  function onConfirm(noti: Notification) {
    switch (noti.type) {
      case 'InvitedJoinTeam':
        navigation.navigate('TeamVar');
        break;
      case 'RequestJoinTeam':
        navigation.navigate('TeamVar');
        break;
      case 'BountyWon':
        navigation.navigate('ViewBounty');
        break;
    }
  }

  function onDelete(noti: Notification) {
    // remove from array with this ID
    removeNotification(noti.id);
  }

  function onRefresh() {
    setRefreshing(true);
    fetchNotifications().then(() => setRefreshing(false));
  }

  return (
    <Layout>
      <StyledText style={{fontWeight: '500', fontSize: 20, marginBottom: 8}}>
        Latest Messages
      </StyledText>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item: notification, index}) => (
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
              {notification.type === 'InvitedJoinTeam' ||
              notification.type === 'RequestJoinTeam' ? (
                <Text style={{fontSize: 16, lineHeight: 28}}>
                  <Text
                    onPress={() => {
                      setMemberAddrViewing(notification.user.walletAddress);
                      navigation.navigate('Profile');
                    }}
                    style={{color: Colors.Primary}}>
                    {notification.user.firstName}
                  </Text>
                  <Text>
                    {notification.type === 'InvitedJoinTeam'
                      ? ' invited you to join their team, '
                      : ' requested to join your team, '}
                  </Text>
                  <Text
                    onPress={() => {
                      setTeam(notification.user.walletAddress);
                      navigation.navigate('TeamVar');
                    }}
                    style={{color: Colors.Primary}}>
                    {notification.team?.title}
                  </Text>
                  .
                </Text>
              ) : (
                <Text style={{fontSize: 16, lineHeight: 28}}>
                  <Text
                    onPress={() => {
                      setMemberAddrViewing(notification.user.walletAddress);
                      navigation.navigate('Profile');
                    }}
                    style={{color: Colors.Text}}>
                    Congratulations! Your team,{' '}
                  </Text>
                  <Text
                    style={{color: Colors.Primary}}
                    onPress={() => {
                      setTeam(notification.team?.id || '0');
                      navigation.navigate('TeamVar');
                    }}>
                    {notification.team?.title}
                  </Text>
                  <Text> won the bounty </Text>
                  <Text
                    onPress={() => {
                      setMemberAddrViewing(notification.bounty?.id);
                      navigation.navigate('ViewBounty');
                    }}
                    style={{color: Colors.Primary}}>
                    {notification.bounty?.title}
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
                <StyledButton
                  type="borderNoFill"
                  onPress={() => onConfirm(notification)}>
                  <Text>
                    {notification.type === 'InvitedJoinTeam'
                      ? 'Join Team'
                      : notification.type === 'RequestJoinTeam'
                      ? 'Accept'
                      : 'Claim reward'}
                  </Text>
                </StyledButton>
                {notification.type != 'BountyWon' && (
                  <StyledButton
                    type="noBgDanger"
                    onPress={() => onDelete(notification)}>
                    Delete
                  </StyledButton>
                )}
              </View>
            </View>
          </View>
        )}
      />
    </Layout>
  );
}
