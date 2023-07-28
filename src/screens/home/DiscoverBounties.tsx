import {useState} from 'react';
import BountyList from 'src/components/home/BountyList';
import SearchIcon from 'src/components/icons/SearchIcon';
import StyledTextInput from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';

export default function DiscoverBounties() {
  const [searchText, setSearchBounties] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const bounties = useBountyStore(state => state.bounties);
  const fetchBounties = useBountyStore(state => state.fetchBounties);

  const search = bounties?.filter(bounty => {
    if (bounty.title.includes(searchText || '') && bounty.stage === 'Active') {
      // if (yourBounties) {
      //   return bounty.youJoined;
      // }
      return bounty;
    }
  });

  function onRefresh() {
    setRefreshing(true);
    fetchBounties().then(() => {
      setRefreshing(false);
    });
  }

  return (
    <Layout>
      <StyledTextInput
        value={searchText}
        onChangeText={e => setSearchBounties(e)}
        placeholder="Search Bounties"
        icon={<SearchIcon />}
      />
      <BountyList
        refreshing={refreshing}
        bounties={search}
        onRefresh={onRefresh}
      />
    </Layout>
  );
}
