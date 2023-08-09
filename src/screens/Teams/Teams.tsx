import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId, useState} from 'react';
import {LogBox, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import Bubble from 'src/components/ui/Bubble';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useTeamsStore from 'src/stores/teamsStore';
import {Colors} from 'src/styles/styles';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function Teams() {
  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const teams = useTeamsStore(state => state.teams);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();
  const id = useId();
  const id2 = useId();

  useEffect(() => {
    fetchTeams();
  }, []);

  const [teamsCreated, setTeamsCreated] = useState<typeof teams>([]);
  const [teamsJoined, setTeamsJoined] = useState<typeof teams>([]);
  const [otherTeams, setOtherTeams] = useState<typeof teams>([]);

  useEffect(() => {
    if (!teams) return;

    const userTeams = teams.filter(team => {
      if (team.creatorAddress === walletAddress) return true;
      return (
        team.members?.some(member => member.walletAddress === walletAddress) &&
        team.creatorAddress !== walletAddress
      );
    });

    setTeamsCreated(
      userTeams.filter(team => team.creatorAddress === walletAddress),
    );
    setTeamsJoined(
      userTeams.filter(team => team.creatorAddress !== walletAddress),
    );
    setOtherTeams(
      teams.filter(
        team =>
          team.creatorAddress !== walletAddress &&
          !team.members?.some(member => member.walletAddress === walletAddress),
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
        {!!teamsCreated && teamsCreated.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Teams Created</StyledText>
            {teamsCreated.map(item => (
              <View key={`${item.id}-${id}`}>
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.members?.length || 0}
                  description={item.description}
                />
                <View style={{height: 12}} />
              </View>
            ))}
            <Separator />
          </>
        )}

        {!!teamsJoined && teamsJoined.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Teams Joined</StyledText>
            {teamsJoined.map(item => (
              <View key={`${item.id + 1}-${id2}`}>
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.members?.length || 0}
                  description={item.description}
                />
                <View style={{height: 12}} />
              </View>
            ))}
            <Separator />
          </>
        )}
        {!!otherTeams && otherTeams.length > 0 && (
          <>
            <StyledText style={{marginBottom: 16}}>Other Teams</StyledText>
            {otherTeams.map(item => (
              <View key={`${item.id + 1}-${id2}`}>
                <TeamCard
                  id={item.id}
                  title={item.name}
                  members={item.members?.length || 0}
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
