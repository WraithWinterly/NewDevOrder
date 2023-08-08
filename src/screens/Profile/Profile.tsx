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
import {ChangeRolePOSTData} from 'src/sharedTypes';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import useMutation from 'src/hooks/usePost';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {RoleType} from 'prisma/generated';

type Props = NativeStackScreenProps<StackParamList, 'Profile'>;

const RoleDict = [
  {
    id: '5',
    title: 'Bounty Designer',
  },
  {
    id: '1',
    title: 'Bounty Hunter',
  },
  {
    id: '2',
    title: 'Bounty Manager',
  },
  {
    id: '3',
    title: 'Bounty Validator',
  },
  {
    id: '4',
    title: 'Founder',
  },
];

export default function Profile({route, navigation}: Props) {
  const myProfile = useMemberStore(state => state.myProfile);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);
  const memberViewing = useMemberStore(state => state.memberViewing);
  const fetchProfile = useMemberStore(state => state.fetchProfile);
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
  const myProfile = useMemberStore(state => state.myProfile);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);
  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  const {
    loading: loadingRole,
    error: errorRole,
    mutate: mutateRole,
  } = useMutation(getServerEndpoint(Endpoints.CHANGE_ROLE));
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
      <StyledText
        style={{paddingVertical: 8, marginBottom: -10, marginLeft: 4}}>
        Play as role...
      </StyledText>
      <DropdownMenu
        data={RoleDict || []}
        onSelect={async (itemID, itemIndex) => {
          console.log('ac');
          // console.log(itemID);
          const role = RoleDict?.find(role => role.id == itemID);

          if (!walletAddress) {
            console.error('No wallet address');
            return;
          }
          if (!role) {
            console.error('Selected role not found');
            return;
          }
          const title = role.title.replace(' ', '');

          const body = {
            role: title,
            walletAddress: walletAddress,
          } as ChangeRolePOSTData;
          const data = await mutateRole(body);
          if (data) {
            fetchMyProfile(walletAddress);
          }
        }}
        // Add space between capital letters
        // Eg. Change BountyType.BountyHunter to Bounty Hunter
        displayText={
          myProfile?.playingRole.replace(/([a-z])([A-Z])/g, '$1 $2') || ''
        }
        selectedValue={
          RoleDict.find(role => role.title == myProfile?.playingRole)?.id || ''
        }
        loading={loadingRole}
      />
    </View>
  );
}
