import {useEffect, useId} from 'react';
import {Text, View} from 'react-native';
import Bubble from 'src/components/ui/Bubble';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';

import useSolanaContext from 'src/web3/SolanaProvider';
import {StackParamList} from 'src/StackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChangeRolePOSTData, Member, RoleType} from 'src/sharedTypes';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import useMutation from 'src/hooks/usePost';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import StyledButton from 'src/components/ui/styled/StyledButton';
import addSpaceCase from 'src/utils/utils';

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

  const displayProfile = !!viewProfileAddress
    ? memberViewing
    : !!myProfile
    ? myProfile
    : undefined;

  const isMyProfile =
    !viewProfileAddress ||
    viewProfileAddress === wallet?.wallet?.publicKey.toBase58().toString();

  useEffect(() => {
    if (!isMyProfile) {
      fetchProfile(viewProfileAddress.toString());
      return;
    } else {
      fetchMyProfile();
    }
  }, [isMyProfile]);

  return (
    <Layout>
      {!!displayProfile && (
        <ProfileCard profile={displayProfile} isMyProfile={isMyProfile} />
      )}
    </Layout>
  );
}

function ProfileCard({
  profile,
  isMyProfile,
}: {
  profile: Member;
  isMyProfile: boolean;
}) {
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

  const {
    loading: loadingUpdateRoles,
    error: errorUpdateRoles,
    mutate: mutateUpdateRoles,
  } = useMutation(getServerEndpoint(Endpoints.UPDATE_MY_ROLES));

  const AvailableRoleDict = RoleDict.filter(({title}) =>
    myProfile?.roles?.includes(title.replace(' ', '') as RoleType),
  );

  async function onSubmit() {
    if (!walletAddress) {
      console.error('No walletAddress');
      return;
    }

    const data = await mutateUpdateRoles({});
    if (data) {
      fetchMyProfile();
    }
  }

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
          <Bubble key={`${i}-${id}-${role}`} text={addSpaceCase(role) || ''} />
        ))}
      </View>

      <Text>
        {profile.bountiesWon} bounties won • {profile.teamsJoined} teams joined
        • {profile.membersInvited} members invited
      </Text>
      {isMyProfile && (
        <View style={{width: '100%'}}>
          <StyledText
            style={{
              paddingVertical: 8,
              marginBottom: -10,
              marginLeft: 4,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            I am...
          </StyledText>
          <DropdownMenu
            name="role"
            data={AvailableRoleDict || []}
            onSelect={async (itemID, itemIndex) => {
              const role = AvailableRoleDict?.find(role => role.id == itemID);

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
              } as unknown as ChangeRolePOSTData;
              const data = await mutateRole(body);
              if (data) {
                fetchMyProfile();
              }
            }}
            // Add space between capital letters
            // Eg. Change BountyType.BountyHunter to Bounty Hunter
            displayText={addSpaceCase(myProfile?.playingRole) || ''}
            selectedValue={
              RoleDict.find(role => role.title == myProfile?.playingRole)?.id ||
              ''
            }
            loading={loadingRole}
          />
          <View style={{height: 12}} />
          <StyledText>
            If you recently minted a role NFT, you may need to update roles.
          </StyledText>
          <View style={{height: 12}} />
          <StyledButton
            loading={loadingUpdateRoles}
            error={!!errorUpdateRoles}
            onPress={onSubmit}>
            Update roles
          </StyledButton>
        </View>
      )}
    </View>
  );
}
