import {Text, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../Main';
import {StackNavigationProp} from '@react-navigation/stack';

import NDO_Button from 'src/components/ndo/NDO_Button';
import NDO_Text from 'src/components/ndo/NDO_Text';
import Layout from 'src/layout/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import useAppContext from 'src/components/AppProvider';
import {NDO_TextInput} from 'src/components/ndo/NDO_TextInput';
import SearchIcon from 'src/components/images/SearchIcon';

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
        icon={<SearchIcon />}></NDO_TextInput>
    </Layout>
  );
}
