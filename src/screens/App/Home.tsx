import {Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../Main';
import {StackNavigationProp} from '@react-navigation/stack';

import Layout from 'src/layout/Layout';

import {useState} from 'react';
import useAppContext from 'src/components/AppProvider';
import {NDO_TextInput} from 'src/components/ndo/NDO_TextInput';
import SearchIcon from 'src/components/images/SearchIcon';
import BountyList from 'src/components/home/BountyList';

export default function Home() {
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
      <BountyList />
    </Layout>
  );
}
