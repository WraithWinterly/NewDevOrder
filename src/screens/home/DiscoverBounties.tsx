import {useState} from 'react';
import {ScrollView} from 'react-native';
import BountyList from 'src/components/home/BountyList';
import SearchIcon from 'src/components/icons/SearchIcon';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import useTeamsStore from 'src/stores/teamsStore';

export default function DiscoverBounties() {
  const bounties = useBountyStore(state => state.bounties);

  const teams = useTeamsStore(state => state.teams);

  const [searchText, setSearchBounties] = useState('');

  const bountiesWithSearch = !!bounties
    ? bounties?.filter(bounty => {
        if (
          bounty.title.includes(searchText || '') &&
          bounty.stage === 'Active'
        ) {
          const myTeamIds = teams?.map(team => team.id);
          const doesNotInclude = myTeamIds?.every(teamId => {
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
        {!!bountiesWithSearch && <BountyList bounties={bountiesWithSearch} />}
      </ScrollView>
    </Layout>
  );
}
