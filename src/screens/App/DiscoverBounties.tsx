import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useState} from 'react';
import {Text} from 'react-native';
import {StackParamList} from 'src/Main';
import useAppContext from 'src/components/AppProvider';
import BountyList from 'src/components/home/BountyList';
import SearchIcon from 'src/components/images/SearchIcon';
import NDO_Text from 'src/components/ndo/NDO_Text';
import {NDO_TextInput} from 'src/components/ndo/NDO_TextInput';
import Layout from 'src/layout/Layout';

export default function DiscoverBounties() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const {team} = useAppContext();
  const [searchBounties, setSearchBounties] = useState('');
  return (
    <Layout>
      <NDO_TextInput
        value={searchBounties}
        onChangeText={e => setSearchBounties(e)}
        placeholder="Search Bounties"
        icon={<SearchIcon />}
      />
      <BountyList searchText={searchBounties} yourBounties={false} />
    </Layout>
  );
}

// export default function Home() {
//   const navigation = useNavigation<StackNavigationProp<StackParamList>>();

//   const {team} = useAppContext();
//   const [searchBounties, setSearchBounties] = useState('');
//   return (
//     <Layout>
//       <NDO_TextInput
//         value={searchBounties}
//         onChangeText={e => setSearchBounties(e)}
//         placeholder="Search Bounties"
//         icon={<SearchIcon />}
//       />
//       <BountyList />
//     </Layout>
//   );
// }
