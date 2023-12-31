import React, {useEffect, useState} from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'src/styles/styles';
import PhantomIcon from '../icons/PhantomIcon';
import useSolanaContext from 'src/web3/SolanaProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';
import {useNavigation} from '@react-navigation/native';
import useWalletStore from 'src/stores/walletStore';
import useMemberStore from 'src/stores/membersStore';
import {PublicKey} from '@solana/web3.js';
import useMutation from 'src/hooks/useMutation';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SharedPreferences from 'react-native-shared-preferences';
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

  const {
    data: dataAuthorize,
    loading: loadingAuthorize,
    error: errorAuthorize,
    mutate: mutateAuthorize,
  } = useMutation(getServerEndpoint(Endpoints.AUTHORIZE));

  const {
    data: dataRequestNonce,
    loading: loadingRequestNonce,
    error: errorRequestNonce,
    mutate: mutateRequestNonce,
  } = useMutation(getServerEndpoint(Endpoints.REQUEST_NONCE));

  const [message, setMessage] = useState<Uint8Array[] | null>();

  // Once you have a wallet address and signed message, this will request a JWT token and save it in the global variable for future query / mutation use.
  useEffect(() => {
    async function receiveJWT() {
      if (!message || !walletAddress) return;
      if ((globalThis.authToken?.length || 0) > 0) return;

      const msg = new Array<number>();
      message[0].forEach(byte => {
        msg.push(Number(byte));
      });

      const data = await mutateAuthorize({
        walletAddress: walletAddress,
        signedMessage: msg,
      });

      if (data && data.accessToken && data.refreshToken) {
        globalThis.authToken = data.accessToken;
        SharedPreferences.setItem('key', data.accessToken);
        // setRefreshToken(data.refreshToken);
        onSuccess(walletAddress);
      } else {
      }
    }
    receiveJWT();
  }, [message, walletAddress]);

  // Triggers the sign message prompt when appropriate. If this wasn't here, the part 2 sign message wallet prompt would not show up. This cannot be thrown into a function because the authorize token states need to be updated first.
  useEffect(() => {
    if (
      (globalThis.authToken?.length || 0) === 0 &&
      !message
      // !walletAddress
    ) {
      walletStep2Sign();
    }
  }, [walletAddress, message, globalThis.authToken]);

  async function onWalletConnectComplete(publicKey: PublicKey | null) {
    if (!publicKey) {
      navigator.navigate('WelcomeWalletFailed');
      setWalletConnectError('Wallet address not found');
      return;
    }
    AsyncStorage.setItem('walletAddress', publicKey.toBase58());
  }
  async function walletStep2Sign() {
    if (!walletAddress) return;
    const data = await mutateRequestNonce({
      walletAddress,
    });

    if (data) {
      const message = await solana.signMessage(data.nonce);
      if (!message) {
        globalThis.authToken = '';
        // throw new Error('Did not authenticate with server.');
      }
      setMessage(message);
      Promise.resolve();
    }
    globalThis.authToken = '';
    // throw new Error('Did not authenticate with server.');
  }

  const connecting =
    (loadingAuthorize || loadingRequestNonce || !!walletAddress || !!message) &&
    !globalThis.authToken;
  return (
    <TouchableOpacity
      style={{
        padding: 16,
        borderRadius: 50,
        backgroundColor: Colors.Phantom,
      }}
      onPress={() => {
        // if (connecting) return;
        // if (!!walletAddress) return;
        globalThis.authToken = '';
        setMessage(null);
        solana
          .initializeWallet()
          .then(publicKey => {
            onWalletConnectComplete(publicKey).catch(e => {
              setWalletConnectError('Did not authenticate with server.');
              navigator.navigate('WelcomeWalletFailed');
            });
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
        {connecting ? (
          <ActivityIndicator color={Colors.Primary} />
        ) : (
          <PhantomIcon />
        )}

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
