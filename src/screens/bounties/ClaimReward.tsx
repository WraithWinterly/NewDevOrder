import {useEffect} from 'react';
import {View} from 'react-native';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/usePost';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import {Colors} from 'src/styles/styles';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {type ConfirmRewardPostData} from 'src/sharedTypes';
import useSolanaContext from 'src/web3/SolanaProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from 'src/StackNavigator';
import useMemberStore from 'src/stores/membersStore';
export default function ClaimReward() {
  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const selectedBountyWinner = useBountyStore(
    state => state.selectedBountyWinner,
  );
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);
  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.CONFIRM_REWARD),
  );
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  async function onSubmit() {
    if (!selectedBountyWinner?.id) {
      console.error('No selected bounty winner');
      return;
    }
    if (!walletAddress) {
      console.error('No walletAddress');
      return;
    }
    const body: ConfirmRewardPostData = {
      submissionWinnerID: selectedBountyWinner?.id,
      walletAddress,
    };
    const data = await mutate(body);
    if (data) {
      setSelectedBounty(selectedBounty?.id);
      fetchMyProfile(walletAddress);
      navigation.navigate('MyWallet');
    }
  }
  return (
    <Layout>
      <View style={{height: '100%'}}>
        <StyledText style={{fontSize: 24, fontWeight: 'bold'}}>
          {selectedBounty?.title}
        </StyledText>
        <Separator />
        <StyledText>Take home reward amount:</StyledText>
        <StyledText style={{fontSize: 24, fontWeight: 'bold'}}>
          ${selectedBounty?.reward}
        </StyledText>
        <View style={{height: 24}} />
        <StyledText>Gas fees: $1.00</StyledText>
        <View
          style={{
            position: 'absolute',
            bottom: -28,
            width: '110%',
            paddingHorizontal: 24,
            marginLeft: -18,
            paddingVertical: 14,
            // height: 42,
            backgroundColor: Colors.AppBar,
            zIndex: 1,
          }}>
          <StyledButton onPress={onSubmit} loading={loading} error={!!error}>
            Confirm and claim reward
          </StyledButton>
        </View>
      </View>
    </Layout>
  );
}
