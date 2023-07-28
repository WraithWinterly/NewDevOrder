import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useId, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList, RefreshControl} from 'react-native';
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

  function onRefresh() {
    setRefreshing(true);
    fetchTeams().then(() => {
      setRefreshing(false);
    });
  }

  const teamsJoined = !!teams
    ? teams?.filter(team => team.creatorID === '')
    : undefined;
  const teamsCreated = !!teams
    ? teams?.filter(team => team.creatorID !== '')
    : undefined;

  return (
    <Layout>
      <View style={{height: 20}}></View>
      <StyledButton onPress={() => navigation.navigate('CreateTeam')}>
        Create new team
      </StyledButton>
      <Separator />
      <StyledText style={{marginBottom: 16}}>Teams Created</StyledText>
      <FlatList
        data={teamsCreated}
        keyExtractor={(item, index) => `${item.id}-${index}-${id}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <TeamCard
            id={item.id}
            title={item.title}
            members={item.memberCount}
            description={item.description}></TeamCard>
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: 12}}></View>
        )}></FlatList>
      <Separator />
      <StyledText style={{marginBottom: 16}}>Teams Joined</StyledText>
      {!teams && (
        <View style={{alignItems: 'center'}}>
          <StyledText>No Teams Found Yet</StyledText>
          <StyledButton onPress={() => fetchTeams()}>Refresh</StyledButton>
        </View>
      )}
      <FlatList
        data={teamsJoined}
        keyExtractor={(item, index) => `${item.id}-${index}-${id2}`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({item}) => (
          <TeamCard
            id={item.id}
            title={item.title}
            members={item.memberCount}
            description={item.description}></TeamCard>
        )}
        ItemSeparatorComponent={() => (
          <View style={{height: 12}}></View>
        )}></FlatList>
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
