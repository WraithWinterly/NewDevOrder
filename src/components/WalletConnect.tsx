import {useContext} from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {PhantomContext} from '../web3/PhantomContext';

export default function WalletConnect() {
  const phantom = useContext(PhantomContext);
  const isDarkMode = useColorScheme() === 'dark';
  const textStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };

  return (
    <>
      <Button
        title="Connect Wallet"
        onPress={() => {
          !!phantom.connect && phantom.connect();
        }}
      />
      <Text style={textStyle}>
        Your Wallet Address:{' '}
        {phantom.publicKey?.toBase58().toString() || 'Not Connected'}
      </Text>
      <Button
        title="Disconnect Wallet"
        onPress={() => {
          !!phantom.disconnect && phantom.disconnect();
        }}
      />
    </>
  );
}
