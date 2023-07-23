import {useState} from 'react';
import BountyList from 'src/components/home/BountyList';
import SearchIcon from 'src/components/icons/SearchIcon';
import {StyledTextInput} from 'src/components/ui/styled/StyledTextInput';
import Layout from 'src/layout/Layout';

export default function DiscoverBounties() {
  const [searchBounties, setSearchBounties] = useState('');

  return (
    <Layout>
      <StyledTextInput
        value={searchBounties}
        onChangeText={e => setSearchBounties(e)}
        placeholder="Search Bounties"
        icon={<SearchIcon />}
      />
      <BountyList searchText={searchBounties} yourBounties={false} />
    </Layout>
  );
}
