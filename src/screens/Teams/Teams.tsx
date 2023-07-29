import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {LogBox, TouchableOpacity, View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import Bubble from 'src/components/ui/Bubble';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';

export default function Teams() {
  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const teams = useTeamsStore(state => state.teams);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const [refreshing, setRefreshing] = useState(false);

  const id = useId();
  const id2 = useId();

  useEffect(() => {
    fetchTeams();
  }, []);

  function onRefresh() {
    setRefreshing(true);
    fetchTeams().then(() => {
      setRefreshing(false);
    });
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const teamsJoined = !!teams
    ? teams?.filter(team => team.creatorAddress === '')
    : undefined;
  const teamsCreated = !!teams
    ? teams?.filter(team => team.creatorAddress !== '')
    : undefined;

  return (
    <Layout>
      <ScrollView>
        <View style={{height: 20}}></View>
        <StyledButton onPress={() => navigation.navigate('CreateTeam')}>
          Create new team
        </StyledButton>
        <Separator />
        {!!teamsCreated && teamsCreated.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Teams Created</StyledText>
            <FlatList
              data={teamsCreated}
              keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
              renderItem={({item}) => (
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.members.length}
                  description={item.description}></TeamCard>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: 12}}></View>
              )}></FlatList>
            <Separator />
          </>
        )}

        {!!teamsJoined && teamsJoined.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Teams Joined</StyledText>

            <FlatList
              data={teamsJoined}
              keyExtractor={(item, index) => `${item.id}-${index}-${id2}`}
              renderItem={({item}) => (
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.members.length}
                  description={item.description}></TeamCard>
              )}
              ItemSeparatorComponent={() => (
                <View style={{height: 12}}></View>
              )}></FlatList>
          </>
        )}
      </ScrollView>
    </Layout>
  );
}

function TeamCard({
  id,
  title,
  members,
  description,
}: {
  id: string;
  title: string;
  members: number;
  description: string;
}) {
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        setSelectedTeam(id);
        navigation.navigate('TeamVar');
      }}
      style={{
        padding: 12,
        backgroundColor: Colors.BackgroundLighter,
        borderRadius: 16,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <StyledText style={{fontSize: 16, fontWeight: '500'}}>
          {title}
        </StyledText>
        <Bubble lowHeight={true} text={`${members} Members`} />
      </View>

      <StyledText style={{paddingTop: 8}}>{description}</StyledText>
    </TouchableOpacity>
  );
}
