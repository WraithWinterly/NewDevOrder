import {
  useNavigation,
  useNavigationState,
  useRoute,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native';
import {RefreshControl} from 'react-native';
import {Text} from 'react-native-svg';
import {StackParamList} from 'src/StackNavigator';
import StyledText from 'src/components/ui/styled/StyledText';
import useLeaderboardStore from 'src/stores/leaderboardStore';
import useMemberStore from 'src/stores/membersStore';
import useAppStore from 'src/stores/store';
import {Colors} from 'src/styles/styles';

export default function Leaderboard({type}: {type: 'members' | 'founders'}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const fetchTopMembers = useLeaderboardStore(state => state.fetchTopMembers);
  const fetchTopFounders = useLeaderboardStore(state => state.fetchTopFounders);
  const topMembers = useLeaderboardStore(state => state.topMembers);
  const topFounders = useLeaderboardStore(state => state.topFounders);

  const [refreshing, setRefreshing] = useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  const isFounder = type === 'founders';

  useNavigationState(state => {
    if (state.index != tabIndex) {
      setTabIndex(state.index);
    }
  });

  async function refetch() {
    if (!isFounder) fetchTopMembers(0);
    else {
      fetchTopFounders(0);
    }
  }

  useEffect(() => {
    refetch();
  }, [tabIndex]);

  const id = useId();

  function onRefresh() {
    setRefreshing(true);

    refetch().finally(() => setRefreshing(false));
  }
  const loading = !topMembers && !topFounders;

  const setMemberIdViewing = useMemberStore(state => state.setMemberIdViewing);
  return (
    <View
      style={{
        flexDirection: 'column',
        gap: 10,
        marginHorizontal: 18,
        paddingTop: 18,
      }}>
      {!loading && (
        <FlatList
          data={!isFounder ? topMembers : topFounders}
          keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ItemSeparatorComponent={() => <View style={{height: 12}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity
              onPress={() => {
                setMemberIdViewing(item.id);
                navigation.navigate('Profile');
              }}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: Colors.BackgroundLighter,
                paddingVertical: 12,
                paddingHorizontal: 12,
                borderRadius: 16,
                gap: 24,
              }}>
              <View
                style={{flexDirection: 'row', gap: 24, alignItems: 'center'}}>
                <StyledText
                  style={{
                    fontFamily: 'RussoOne-Regular',
                    textShadowColor: Colors.Black,
                    textShadowRadius: 2,
                    fontSize: 24,
                  }}>
                  {index}
                </StyledText>
                <View style={{flexDirection: 'column'}}>
                  <StyledText>{item.firstName}</StyledText>
                  <StyledText style={{color: Colors.Primary}}>
                    {item.tag}
                  </StyledText>
                </View>
              </View>

              <StyledText>Level {item.level}</StyledText>
            </TouchableOpacity>
          )}></FlatList>
      )}
    </View>
  );
}
