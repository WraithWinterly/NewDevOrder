import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView} from 'react-native';
import {StackParamList} from 'src/StackNavigator';
import LongLinkNavigation from 'src/components/ui/LongLinkNavigation';
import Layout from 'src/layout/Layout';
import {RoleType} from 'src/sharedTypes';
import useMemberStore from 'src/stores/membersStore';
import useMintStore from 'src/stores/mintStore';

export default function MintNFTs() {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setNftToMint = useMintStore(state => state.setNftToMint);
  const playingRole = useMemberStore(state => state.myProfile?.playingRole);

  return (
    <Layout>
      <ScrollView>
        {playingRole != RoleType.BountyHunter && (
          <LongLinkNavigation
            name="Mint Role NFT"
            description="Mint the following roles: Bounty Hunter, Founder, Bounty Manager, Bounty Designer, Bounty Validator, and Catalyst. Each role provides access to different functionalities."
            onPress={() => {
              navigation.navigate('MintRoleNFT');
            }}
          />
        )}

        <LongLinkNavigation
          name="Mint Bounty NFT"
          description="Allows Founders to create and post a bounty on NDO. This will be rewarded to the winners and the bounty reward is tied to this NFT."
          onPress={() => {
            setNftToMint(RoleType.BountyHunter);
            navigation.navigate('MintVarNFT');
          }}
        />
      </ScrollView>
    </Layout>
  );
}
