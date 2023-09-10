import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useEffect, useId} from 'react';
import {Linking, TouchableOpacity, View} from 'react-native';
import {FlatList} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';

import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';

import useWalletStore from 'src/stores/walletStore';
import {Colors} from 'src/styles/styles';

import useSolanaContext from 'src/web3/SolanaProvider';
import SharedPreferences from 'react-native-shared-preferences';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MyWallet() {
  const {balance, wallet, deauthorizeSession} = useSolanaContext();

  const nfts = useWalletStore(state => state.nfts);
  const fetchNFTs = useWalletStore(state => state.fetchNFTs);

  const id = useId();

  useEffect(() => {
    fetchNFTs();
  }, []);

  const solana = useSolanaContext();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setWalletConnectError = useWalletStore(
    state => state.setWalletConnectError,
  );
  useEffect(() => {
    if (!balance) {
      solana
        .initializeWallet()
        .then(publicKey => {})

        .catch(e => {
          const error = e as Error;
          setWalletConnectError(error.message);
          if (
            error.message.includes(
              'Found no installed wallet that supports the mobile wallet protocol.',
            )
          ) {
            Linking.openURL('market://details?id=app.phantom');
            return;
          }
          navigation.navigate('WelcomeWalletFailed');
        });
    }
  }, []);

  return (
    <Layout>
      <StyledText>Current Balance</StyledText>
      <StyledText
        style={{
          fontSize: 32,
          fontWeight: '400',
          paddingVertical: 2,
        }}>
        {balance} SOL
      </StyledText>
      <StyledText>Address: {wallet?.publicKey.toBase58()}</StyledText>
      <Separator />
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
      <StyledButton
        onPress={async () => {
          await deauthorizeSession();
          globalThis.authToken = '';
          SharedPreferences.removeItem('key');
          AsyncStorage.removeItem('walletAddress');
          AsyncStorage.removeItem('hasCompletedWelcome');
          navigation.reset({
            index: 0,
            routes: [{name: 'Welcome'}],
          });
        }}>
        Disconnect and Log Out
      </StyledButton>
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
