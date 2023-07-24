import {View} from 'react-native';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useWalletStore from 'src/stores/walletStore';
import {Colors} from 'src/styles/styles';

export default function NFTDetails() {
  const nft = useWalletStore(state => state.nftById);
  return (
    <Layout>
      <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
        <StyledText type="header">{nft?.name}</StyledText>

        <View
          style={{
            backgroundColor: '#4F378B',
            borderRadius: 12,
            paddingHorizontal: 12,
            paddingVertical: 2,
            marginTop: 12,
          }}>
          <StyledText
            style={{
              padding: 8,
              borderRadius: 100,
            }}>
            Project {nft?.project}
          </StyledText>
        </View>
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
