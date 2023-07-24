import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {StackParamList} from 'src/StackNavigator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useAppStore from 'src/stores/store';
import useWalletStore from 'src/stores/walletStore';
import {Colors} from 'src/styles/styles';

import useSolanaContext from 'src/web3/SolanaProvider';

export default function MyWallet() {
  const {balance} = useSolanaContext();
  const id = useId();
  const nfts = useWalletStore(state => state.nfts);
  const fetchNFTs = useWalletStore(state => state.fetchNFTs);

  useEffect(() => {
    fetchNFTs();
  }, []);

  return (
    <Layout>
      <StyledText>Current Balance</StyledText>
      <StyledText
        style={{
          fontSize: 32,
          fontWeight: '400',
          paddingTop: 2,
          paddingBottom: 24,
          borderBottomColor: Colors.Gray[600],
          borderBottomWidth: 1,
        }}>
        {balance} SOL
      </StyledText>
      {!!nfts && (
        <FlatList
          style={{paddingTop: 14}}
          data={nfts}
          numColumns={2}
          renderItem={({index, item}) => <NFTCard index={index} {...item} />}
          keyExtractor={item => `${id}-${item.id}`}>
          <StyledText>Your NFTs will be displayed here...</StyledText>
        </FlatList>
      )}
    </Layout>
  );
}

function NFTCard({
  id,
  project,
  name,
  index,
}: {
  id: string;
  project: string;
  name: string;
  index: number;
}) {
  const setNFTId = useWalletStore(state => state.setNFTId);
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  return (
    <TouchableOpacity
      onPress={() => {
        setNFTId(id);
        navigation.navigate('NFTDetails');
      }}
      style={{
        marginHorizontal: 0,
        marginRight: index % 2 == 0 ? 20 : 0,
        marginVertical: 20,
        width: 160,
        flex: 1,
      }}>
      <View
        style={{
          height: 164,
          width: 164,
          marginVertical: 4,
          backgroundColor: Colors.Gray[700],
          borderRadius: 12,
        }}></View>
      <StyledText style={{color: Colors.Primary}}>{project}</StyledText>
      <StyledText truncate>{name}</StyledText>
    </TouchableOpacity>
  );
}
