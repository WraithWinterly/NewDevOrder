import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';

import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import {Colors} from 'src/styles/styles';
import useBountyStore from 'src/stores/bountyStore';
import Separator from 'src/components/ui/Separator';
import useSolanaContext from 'src/web3/SolanaProvider';
import useTeamsStore from 'src/stores/teamsStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {useEffect} from 'react';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import useMutation from 'src/hooks/useMutation';
import {StartBountyPOSTData} from 'src/sharedTypes';
import ProjBountyBreadcrumb from 'src/components/ui/ProjBountyBreadcrumb';
import {fromFireDate} from 'src/utils/utils';
import WarningIcon from 'src/components/icons/WarningIcon';

export default function StartBounty() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const selectedTeam = useTeamsStore(state => state.selectedTeam);
  const fetchBounties = useBountyStore(state => state.fetchBounties);

  const teams = useTeamsStore(state => state.teams);
  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.START_BOUNTY),
  );

  const viewTeams = teams
    ?.filter(t => t.creatorAddress == walletAddress)
    .filter(team => !selectedBounty?.participantsTeamIDs?.includes(team.id));

  useEffect(() => {
    // setSelectedTeam(undefined);
    setSelectedTeam((!!viewTeams && viewTeams[0]?.id) || undefined);
  }, []);

  async function startBounty() {
    // start bounty
    if (!selectedTeam?.id || !walletAddress || !selectedBounty?.id) {
      console.error(
        'missing data',
        selectedTeam?.id,
        walletAddress,
        selectedBounty?.id,
      );
      return;
    }

    const data = await mutate({
      address: walletAddress,
      forTeam: selectedTeam.id,
      bountyID: selectedBounty.id,
    } as StartBountyPOSTData);
    if (data) {
      // Force refetch bounty
      setSelectedBounty(selectedBounty.id);
      fetchBounties();
      navigation.navigate('ViewBounty');
    }
  }

  return (
    <Layout>
      <View style={{justifyContent: 'space-between', height: '98%'}}>
        <View style={{gap: 10}}>
          <StyledText style={{fontSize: 24}}>Start Bounty</StyledText>

          <ProjBountyBreadcrumb bounty={selectedBounty} />
          <Separator />
          {selectedBounty?.stage === 'Active' &&
            (fromFireDate(selectedBounty?.deadline)?.getTime() || 0) <
              new Date().getTime() && (
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 4,
                  gap: 8,
                  alignItems: 'center',
                }}>
                <WarningIcon />
                <StyledText style={{width: '90%'}}>
                  Warning: The bounty is past it's deadline!
                </StyledText>
              </View>
            )}
          <View style={{height: 24}}></View>
          <StyledText>
            Choose a team to start this bounty on behalf of:
          </StyledText>
          <DropdownMenu
            name="team"
            disabled={!viewTeams || viewTeams.length == 0}
            data={
              viewTeams?.map(team => ({id: team.id, title: team.name})) || []
            }
            onSelect={(itemID, itemIndex) => {
              const v = viewTeams?.find(team => team.id == itemID);

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
          error={!!error}>
          <StyledText style={{color: Colors.BtnTextColor, alignSelf: 'center'}}>
            Start Bounty for Team {selectedTeam?.name}
          </StyledText>
        </StyledButton>
      </View>
    </Layout>
  );
}
