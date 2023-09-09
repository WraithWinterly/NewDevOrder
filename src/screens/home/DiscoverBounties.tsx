import {useState} from 'react';
import {ScrollView} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import SearchIcon from 'src/components/icons/SearchIcon';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useTeamsStore from 'src/stores/teamsStore';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function DiscoverBounties() {
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();
  const bounties = useBountyStore(state => state.bounties);

  const teams = useTeamsStore(state => state.teams);

  const [searchText, setSearchBounties] = useState('');

  const bountiesWithSearch = !!bounties
    ? bounties?.filter(bounty => {
        if (
          bounty.title.includes(searchText || '') &&
          bounty.stage === 'Active'
        ) {
          if (!walletAddress) return;
          const myTeams = teams?.filter(team =>
            team.memberIDs.includes(walletAddress),
          );
          const myTeamIDs = myTeams?.map(team => team.id);

          const doesNotInclude = myTeamIDs?.every(teamId => {
            return !bounty.participantsTeamIDs.includes(teamId);
          });
          return doesNotInclude;
        }
      })
    : undefined;

  return (
    <Layout>
      <ScrollView>
        <StyledTextInput
          value={searchText}
          onChangeText={e => setSearchBounties(e)}
          placeholder="Search Bounties"
          icon={<SearchIcon />}
        />
        <BountyList bounties={bountiesWithSearch} />
      </ScrollView>
    </Layout>
  );
}
