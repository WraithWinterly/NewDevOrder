import {View} from 'react-native';
import StyledText from './components/ui/styled/StyledText';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from './StackNavigator';
import {Colors} from './styles/styles';

import StyledButton from './components/ui/styled/StyledButton';
import RefreshIcon from './components/icons/RefreshIcon';
import useTeamsStore from './stores/teamsStore';
import useSolanaContext from './web3/SolanaProvider';

export default function StackHeaderRight({route}: {route: string}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const selectedTeam = useTeamsStore(state => state.selectedTeam);

  return (
    <View style={{paddingRight: 18}}>
      {route === 'MyWallet' ? (
        <StyledText
          onPress={() => navigation.navigate('MintNFTs')}
          style={{color: Colors.Primary}}>
          Mint NFTs
        </StyledText>
      ) : route === 'TeamVar' ? (
        selectedTeam?.creatorID === walletAddress && (
          <StyledText
            onPress={() => navigation.navigate('InviteMembers')}
            style={{color: Colors.Primary}}>
            Invite
          </StyledText>
        )
      ) : route === 'InviteMembers' ? (
        <StyledText
          onPress={async () => {
            navigation.goBack();
          }}
          style={{color: Colors.Primary}}>
          Done
        </StyledText>
      ) : route === 'DesignerWorkspaceNavigator' ||
        route === 'ViewProjectBounties' ? (
        <StyledText
          style={{color: Colors.Primary, width: 110, textAlign: 'right'}}
          onPress={() => navigation.navigate('PendingProposal')}>
          View Proposal
        </StyledText>
      ) : route === 'MyWallet' ? (
        <StyledButton>
          <RefreshIcon />
        </StyledButton>
      ) : null}
    </View>
  );
}
