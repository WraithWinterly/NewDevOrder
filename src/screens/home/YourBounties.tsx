import {useState} from 'react';
import {ScrollView} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import SearchIcon from 'src/components/icons/SearchIcon';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useMemberStore from 'src/stores/membersStore';
import useTeamsStore from 'src/stores/teamsStore';

export default function YourBounties() {
  const walletAddress = useMemberStore(state => state.myProfile)?.id;
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
          return myTeamIDs?.some(teamId => {
            return bounty.participantTeamIDs.includes(teamId);
          });
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
