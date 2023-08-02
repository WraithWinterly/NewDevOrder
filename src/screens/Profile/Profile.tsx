import {useEffect, useId} from 'react';
import {Text, View} from 'react-native';
import Bubble from 'src/components/ui/Bubble';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';

import useSolanaContext from 'src/web3/SolanaProvider';
import {StackParamList} from 'src/StackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Member} from 'prisma/generated';

type Props = NativeStackScreenProps<StackParamList, 'Profile'>;

export default function Profile({route, navigation}: Props) {
  const myProfile = useMemberStore(state => state.myProfile);
  const memberViewing = useMemberStore(state => state.memberViewing);
  const fetchProfile = useMemberStore(state => state.fetchProfile);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);
  const wallet = useSolanaContext();

  const viewProfileAddress = route.params?.viewProfileAddress ?? undefined;

  const displayProfile = !!viewProfileAddress ? memberViewing : myProfile;

  useEffect(() => {
    if (!!viewProfileAddress) {
      fetchProfile(viewProfileAddress.toString());
      return;
    } else {
      fetchMyProfile(wallet?.wallet?.publicKey.toBase58().toString());
    }
  }, []);

  return (
    <Layout>
      {!!displayProfile ? (
        <ProfileCard profile={displayProfile} />
      ) : (
        displayProfile && <ProfileCard profile={displayProfile} />
      )}
    </Layout>
  );
}

function ProfileCard({profile}: {profile: Member}) {
  const id = useId();
  return (
    <View style={{gap: 12, alignItems: 'flex-start'}}>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 12}}>
        <StyledText style={{fontSize: 24, fontWeight: '500'}}>
          {profile.firstName}
        </StyledText>
        <Bubble lowHeight text={`Level ${profile.level}`} />
      </View>

      <StyledText>@{profile.username}</StyledText>
      <View style={{flexWrap: 'wrap', flexDirection: 'row', gap: 14}}>
        {profile.roles.map((role, i) => (
          <Bubble key={`${i}-${id}-${role}`} text={role} />
        ))}
      </View>

      <Text>
        {profile.bountiesWon} bounties won • {profile.teamsJoined} teams joined
        • {profile.membersInvited} members invited
      </Text>
    </View>
  );
}
