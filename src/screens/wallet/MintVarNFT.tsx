import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import TokenIcon from 'src/components/icons/TokenIcon';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';

import Layout from 'src/layout/Layout';
import useMintStore from 'src/stores/mintStore';
import {Colors} from 'src/styles/styles';

export default function MintVarNFT() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const nftToMint = useMintStore(state => state.nftToMint);

  function onMintPressed() {
    // Mint functionality
    const mintSuccess = true;
    if (mintSuccess) {
      navigation.goBack();
    } else {
      // navigation.navigate('WelcomeMintFailed');
    }
  }

  return (
    <Layout>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 10,
          height: '85%',
        }}>
        <View style={{gap: 18, paddingTop: 0}}>
          <View style={{alignItems: 'center'}}>
            <TokenIcon />
            <Text
              style={{
                fontSize: 32,
                color: Colors.Text,
              }}>
              Mint Price: 1 SOL
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'column',
            gap: 20,
            width: '100%',
            paddingTop: 80,
          }}>
          <StyledButton onPress={onMintPressed}>
            <StyledText style={{color: Colors.Black, alignSelf: 'center'}}>
              Mint my {nftToMint} NFT
            </StyledText>
          </StyledButton>
        </View>
      </View>
    </Layout>
  );
}
