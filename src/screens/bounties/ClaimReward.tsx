import {View} from 'react-native';
import Separator from 'src/components/ui/Separator';
import StyledButton from 'src/components/ui/styled/StyledButton';
import StyledText from 'src/components/ui/styled/StyledText';
import useMutation from 'src/hooks/usePost';
import Layout from 'src/layout/Layout';
import useBountyStore from 'src/stores/bountyStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {type ConfirmRewardPostData} from 'src/sharedTypes';
import useSolanaContext from 'src/web3/SolanaProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from 'src/StackNavigator';
import useMemberStore from 'src/stores/membersStore';
import BottomBar from 'src/components/ui/styled/BottomBar';

export default function ClaimReward() {
  const selectedBounty = useBountyStore(state => state.selectedBounty);
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);
  const selectedSubmission = useBountyStore(state => state.selectedSubmission);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);
  const {data, loading, error, mutate} = useMutation(
    getServerEndpoint(Endpoints.CONFIRM_REWARD),
  );
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  async function onSubmit() {
    if (!selectedBounty?.winningSubmissionID) {
      console.error('No winningSubmissionID');
      return;
    }
    if (!walletAddress) {
      console.error('No walletAddress');
      return;
    }
    const body: ConfirmRewardPostData = {
      submissionID: selectedBounty.winningSubmissionID,
    };
    const data = await mutate(body);
    if (data) {
      setSelectedBounty(selectedBounty?.id);
      fetchMyProfile();

      navigation.reset({
        index: 0,
        routes: [
          {name: 'HomeNavigation'}, // Add the appropriate name for the HomeNavigation stack
          {name: 'MyWallet'}, // The name of the MyWallet screen
        ],
      });
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
        <BottomBar>
          <StyledButton onPress={onSubmit} loading={loading} error={!!error}>
            Confirm and claim reward
          </StyledButton>
        </BottomBar>
      </View>
    </Layout>
  );
}
