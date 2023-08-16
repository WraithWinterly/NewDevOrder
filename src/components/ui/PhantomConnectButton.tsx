import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View, Text, Linking} from 'react-native';
import {Colors} from 'src/styles/styles';
import PhantomIcon from '../icons/PhantomIcon';
import useSolanaContext from 'src/web3/SolanaProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import useWalletStore from 'src/stores/walletStore';
import useMemberStore from 'src/stores/membersStore';
import {PublicKey} from '@solana/web3.js';
import useMutation from 'src/hooks/usePost';
import {Endpoints, getServerEndpoint} from 'src/utils/server';

export default function PhantomConnectButton({
  onSuccess,
}: {
  onSuccess: (wallet: string) => void;
}) {
  const navigator = useNavigation<StackNavigationProp<StackParamList>>();
  const solana = useSolanaContext();

  const setWalletConnectError = useWalletStore(
    state => state.setWalletConnectError,
  );
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);
  // const {setAuthToken, setRefreshToken} = solana;
  const walletAddress = solana.wallet?.publicKey.toBase58().toString();

  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.AUTHORIZE),
  );
  const {
    data: dataRequestNonce,
    loading: loadingRequestNonce,
    error: errorRequestNonce,
    mutate: mutateRequestNonce,
  } = useMutation(getServerEndpoint(Endpoints.REQUEST_NONCE));

  const [message, setMessage] = useState<Uint8Array[] | null>();

  useEffect(() => {
    async function run() {
      if (!!message && !!walletAddress) {
        console.log(walletAddress);
        const msg = new Array<number>();
        message[0].forEach(byte => {
          msg.push(Number(byte));
        });

        const data = await mutate({
          walletAddress: walletAddress,
          signedMessage: msg,
        });
        if (data && data.accessToken && data.refreshToken) {
          // setAuthToken(data.accessToken);
          globalThis.authToken = data.accessToken;
          // setRefreshToken(data.refreshToken);
          onSuccess(walletAddress);
        } else {
          console.log(`No Data result: ${data}`);
        }
      } else {
        console.log(`Missing address message, ${walletAddress} ${message}`);
      }
    }
    run();
  }, [message, walletAddress]);

  async function onWalletConnectComplete(publicKey: PublicKey | null) {
    if (!publicKey) {
      navigator.navigate('WelcomeWalletFailed');
      setWalletConnectError('Wallet address not found');
      return;
    }
    const data = await mutateRequestNonce({
      walletAddress: publicKey.toBase58().toString(),
    });

    if (data) {
      const message = await solana.signMessage(data.nonce);
      setMessage(message);
    }
    // // Check Solana Token
    // const hasMemberShipToken = true;
    // if (hasMemberShipToken) {
    //   onSuccess(publicKey.toBase58().toString());
    // } else {
    //   navigator.navigate('WelcomeNoMembershipToken');
    // }
    // // Fetch user profile
    // try {
    //   fetchMyProfile(publicKey.toBase58().toString());
    // } catch {}
  }

  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderRadius: 50,
        backgroundColor: Colors.Phantom,
      }}
      onPress={() => {
        solana
          .initializeWallet()
          .then(publicKey => {
            onWalletConnectComplete(publicKey);
          })
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
            navigator.navigate('WelcomeWalletFailed');
          });
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: 12,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <PhantomIcon />
        <Text
          style={{
            color: Colors.White,
            paddingRight: 10,
          }}>
          Connect Wallet
        </Text>
      </View>
    </TouchableOpacity>
  );
}
