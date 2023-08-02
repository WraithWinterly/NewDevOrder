import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';

import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';
import useBountyStore from 'src/stores/bountyStore';
import Separator from 'src/components/ui/Separator';
import useSolanaContext from 'src/web3/SolanaProvider';
import useTeamsStore from 'src/stores/teamsStore';
import axios from 'axios';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {StartBountyPOSTData} from 'src/sharedTypes';
import {useEffect, useState} from 'react';
import DropdownMenu from 'src/components/ui/DropdownMenu';

export default function StartBounty() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const selectedFullBounty = useBountyStore(state => state.selectedBounty);
  const selectedTeam = useTeamsStore(state => state.selectedTeam);

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchBounties = useBountyStore(state => state.fetchBounties);

  const teams = useTeamsStore(state => state.teams);
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);

  const viewTeams = teams
    ?.filter(t => t.creatorAddress == walletAddress)
    .filter(
      team => !selectedFullBounty?.participantsTeamIDs?.includes(team.id),
    );

  useEffect(() => {
    console.log('vewi teams changed');

    // setSelectedTeam(undefined);
    setSelectedTeam((!!viewTeams && viewTeams[0]?.id) || undefined);
  }, [viewTeams]);

  async function startBounty() {
    // start bounty
    if (!selectedTeam?.id) return;
    if (!walletAddress) return;
    if (!selectedFullBounty?.id) return;
    console.log('eh');
    try {
      setError(false);
      const body: StartBountyPOSTData = {
        address: walletAddress,
        forTeam: selectedTeam.id,
        bountyID: selectedFullBounty.id,
      };
      await axios.post(getServerEndpoint(Endpoints.START_BOUNTY), body);
      // redirect
      fetchBounties();
      navigation.goBack();
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }
  console.log(viewTeams?.map(team => ({id: team.id, title: team.name})));
  return (
    <Layout>
      <View style={{justifyContent: 'space-between', height: '98%'}}>
        <View style={{gap: 10}}>
          <StyledText style={{fontSize: 24}}>Start Bounty</StyledText>
          <StyledText>
            <Text style={{color: Colors.Gray[400]}}>
              {selectedFullBounty?.projectName} /{' '}
            </Text>{' '}
            {selectedFullBounty?.title}
          </StyledText>
          <Separator />
          <View style={{height: 24}}></View>
          <StyledText>
            Choose a team to start this bounty on behalf of:
          </StyledText>
          <DropdownMenu
            disabled={!viewTeams || viewTeams.length == 0}
            data={
              viewTeams?.map(team => ({id: team.id, title: team.name})) || []
            }
            onSelect={(itemID, itemIndex) => {
              console.warn('t: ', itemID);
              const v = viewTeams?.find(team => team.id == itemID);
              console.log('', itemID);
              console.log('', viewTeams);
              if (v) {
                setSelectedTeam(v.id);
              }
            }}
            displayText={selectedTeam?.name || 'No Teams Available'}
            selectedValue={selectedTeam?.id || ''}
          />
        </View>

        <StyledButton
          onPress={startBounty}
          enabled={!!selectedTeam}
          loading={loading}
          error={error}>
          <StyledText style={{color: Colors.BtnTextColor, alignSelf: 'center'}}>
            Start Bounty for Team {selectedTeam?.name}
          </StyledText>
        </StyledButton>
      </View>
    </Layout>
  );
}
