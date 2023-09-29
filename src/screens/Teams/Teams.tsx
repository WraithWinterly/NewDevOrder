import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import AdminIcon from 'src/components/icons/AdminIcon';
import Bubble from 'src/components/ui/Bubble';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';

export default function Teams() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const walletAddress = useMemberStore(state => state.myProfile)?.id;

  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const teams = useTeamsStore(state => state.teams);

  const id = useId();
  const id2 = useId();

  const [teamsCreated, setTeamsCreated] = useState<typeof teams>([]);
  const [teamsJoined, setTeamsJoined] = useState<typeof teams>([]);
  const [otherTeams, setOtherTeams] = useState<typeof teams>([]);

  useEffect(() => {
    fetchTeams();
  }, []);

  useEffect(() => {
    if (!teams) return;

    const userTeams = teams.filter(team => {
      if (team.creatorID === walletAddress) return true;
      return (
        team.memberIDs?.some(member => member === walletAddress) &&
        team.creatorID !== walletAddress
      );
    });

    setTeamsCreated(userTeams.filter(team => team.creatorID === walletAddress));
    setTeamsJoined(userTeams.filter(team => team.creatorID !== walletAddress));
    setOtherTeams(
      teams.filter(
        team =>
          team.creatorID !== walletAddress &&
          !team.memberIDs?.some(member => member === walletAddress),
      ),
    );
  }, [teams, walletAddress]);

  return (
    <Layout>
      <ScrollView>
        <View style={{height: 20}}></View>
        <StyledButton onPress={() => navigation.navigate('CreateTeam')}>
          Create new team
        </StyledButton>
        <Separator />
        {!teams && (
          <>
            <StyledText suspense trigger={null} shimmerWidth={120}>
              Loading Teams
            </StyledText>
            {/* <Separator /> */}
            <View style={{height: 12}} />
            <TeamCard
              description=""
              id=""
              members={0}
              title=""
              key={1234}
              suspense
            />
            <View style={{height: 12}} />
            <TeamCard
              description=""
              id=""
              members={0}
              title=""
              key={1234567}
              suspense
            />
          </>
        )}
        {!!teams && !!teamsCreated && teamsCreated.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Teams Created</StyledText>
            {teamsCreated?.map(item => (
              <View key={`${item.id}-${id}`}>
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.memberIDs?.length || 0}
                  description={item.description}
                />
                <View style={{height: 12}} />
              </View>
            ))}
            <Separator />
          </>
        )}

        {!!teams && !!teamsJoined && teamsJoined.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Teams Joined</StyledText>
            {teamsJoined.map(item => (
              <View key={`${item.id + 1}-${id2}`}>
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.memberIDs?.length || 0}
                  description={item.description}
                />
                <View style={{height: 12}} />
              </View>
            ))}
            <Separator />
          </>
        )}
        {!!teams && !!otherTeams && otherTeams.length > 0 && (
          <>
            <View
              style={{flexDirection: 'row', alignContent: 'center', gap: 8}}>
              <StyledText style={{marginBottom: 16}}>Other Teams</StyledText>
              <AdminIcon />
            </View>

            {otherTeams.map(item => (
              <View key={`${item.id + 1}-${id2}`}>
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.memberIDs?.length || 0}
                  description={item.description}
                />
                <View style={{height: 12}} />
              </View>
            ))}
            <Separator />
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
  suspense,
}: {
  id: string;
  title: string;
  members: number;
  description: string;
  suspense?: boolean;
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
        <StyledText
          style={{fontSize: 16, fontWeight: '500'}}
          suspense={suspense}>
          {title}
        </StyledText>
        <Bubble
          lowHeight={true}
          text={`${members} Members`}
          suspense={suspense}
        />
      </View>

      <StyledText
        style={{marginTop: 12}}
        suspense={suspense}
        shimmerWidth={240}>
        {description}
      </StyledText>
    </TouchableOpacity>
  );
}
