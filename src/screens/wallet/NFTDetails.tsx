import {View} from 'react-native';
import Bubble from 'src/components/ui/Bubble';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useWalletStore from 'src/stores/walletStore';
import {Colors} from 'src/styles/styles';

export default function NFTDetails() {
  const nft = useWalletStore(state => state.nftById);

  return (
    <Layout>
      <View
        style={{flexDirection: 'column', alignItems: 'flex-start', gap: 18}}>
        <StyledText type="header">{nft?.name}</StyledText>

        <Bubble type="purple" text={nft?.project || 'Loading...'} />
        <View
          style={{
            width: 300,
            height: 300,

            borderRadius: 12,
            alignSelf: 'center',
            marginVertical: 12,
            backgroundColor: Colors.Gray[600],
          }}></View>
        <StyledText>Metadata...</StyledText>
      </View>
    </Layout>
  );
}
