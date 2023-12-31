import {useEffect, useId, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Bubble from 'src/components/ui/Bubble';
import StyledText from 'src/components/ui/styled/StyledText';
import Layout from 'src/layout/Layout';
import useMemberStore from 'src/stores/membersStore';

import useSolanaContext from 'src/web3/SolanaProvider';
import {StackParamList} from 'src/StackNavigator';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ChangeRolePOSTData, Member, RoleType} from 'src/sharedTypes';
import DropdownMenu from 'src/components/ui/DropdownMenu';
import useMutation from 'src/hooks/useMutation';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import StyledButton from 'src/components/ui/styled/StyledButton';
import addSpaceCase from 'src/utils/utils';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import {Colors} from 'src/styles/styles';
import DropdownIcon from 'src/components/icons/DropdownIcon';
import useQuery from 'src/hooks/useQuery';
import useProjectsStore from 'src/stores/projectsStore';
import useTeamsStore from 'src/stores/teamsStore';
import useBountyStore from 'src/stores/bountyStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CopyIcon from 'src/components/icons/CopyIcon';
import Clipboard from '@react-native-clipboard/clipboard';
type Props = NativeStackScreenProps<StackParamList, 'Profile'>;

export default function Profile({route, navigation}: Props) {
  const myProfile = useMemberStore(state => state.myProfile);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);

  const viewProfileAddress = route.params?.viewProfileAddress ?? undefined;

  const {data, loading, error, query} = useQuery(
    getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS),
  );

  const [displayProfile, setDisplayProfile] = useState<Member | undefined>();

  const [rememberedID, setRememberedID] = useState<string>();

  const isMyProfile =
    viewProfileAddress === rememberedID || viewProfileAddress === myProfile?.id;

  // Prevent flickering from ID nullifying after refresh / role switching
  useEffect(() => {
    AsyncStorage.getItem('walletAddress').then(value => {
      if (value) setRememberedID(value);
    });
  }, []);

  useEffect(() => {
    if (!isMyProfile && !!viewProfileAddress) {
      query(
        `${getServerEndpoint(
          Endpoints.GET_MEMBER_BY_WALLET_ADDRESS,
        )}/${viewProfileAddress}`,
      ).then(data => {
        if (data) {
          const member = data as Member;
          setDisplayProfile(member);
        }
      });
    } else {
      fetchMyProfile();
      setDisplayProfile(myProfile);
    }
  }, [viewProfileAddress]);

  return (
    <Layout>
      <ProfileCard profile={displayProfile} isMyProfile={isMyProfile} />
    </Layout>
  );
}

function ProfileCard({
  profile,
  isMyProfile,
}: {
  profile: Member | undefined;
  isMyProfile: boolean;
}) {
  const id = useId();
  const myProfile = useMemberStore(state => state.myProfile);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);
  const playingRole = useMemberStore(state => state.myProfile)?.playingRole;

  const fetchProjects = useProjectsStore(state => state.fetchProjects);
  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const fetchBounties = useBountyStore(state => state.fetchBounties);

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

  async function onSubmit() {
    const data = await mutateUpdateRoles({});
    if (data) {
      fetchMyProfile();
    }
  }

  async function onSubmitRole(role: RoleType) {
    const data = await mutateRole({role} as ChangeRolePOSTData);
    if (!!data) {
      fetchMyProfile();
      fetchBounties();
      fetchProjects();
    }
  }

  return (
    <View style={{gap: 12, alignItems: 'flex-start'}}>
      {isMyProfile && (
        <View style={{width: '100%'}}>
          <Menu style={{marginTop: 12}}>
            <MenuTrigger>
              <View
                style={{
                  borderColor: Colors.BorderColor,
                  borderWidth: 2,
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  flexDirection: 'row',
                  gap: 8,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <StyledText
                  truncate
                  suspense
                  trigger={playingRole}
                  shimmerWidth={120}>
                  {addSpaceCase(playingRole)}
                </StyledText>
                <View style={{paddingTop: 4}}>
                  <DropdownIcon />
                </View>
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  backgroundColor: Colors.BackgroundLighter,
                  marginTop: 60,

                  borderRadius: 12,
                },
                optionsWrapper: {
                  backgroundColor: Colors.BackgroundDarker,
                  padding: 10,
                  borderRadius: 12,
                  width: 280,
                  gap: 10,
                },
              }}>
              <RoleMenuOption
                targetRole={RoleType.Founder}
                availableRoles={myProfile?.roles ?? []}
                currentRole={playingRole}
                onSelect={() => onSubmitRole(RoleType.Founder)}
              />
              <RoleMenuOption
                targetRole={RoleType.BountyHunter}
                availableRoles={myProfile?.roles ?? []}
                currentRole={playingRole}
                onSelect={() => onSubmitRole(RoleType.BountyHunter)}
              />
              <RoleMenuOption
                targetRole={RoleType.BountyManager}
                availableRoles={myProfile?.roles ?? []}
                currentRole={playingRole}
                onSelect={() => onSubmitRole(RoleType.BountyManager)}
              />
              <RoleMenuOption
                targetRole={RoleType.BountyDesigner}
                availableRoles={myProfile?.roles ?? []}
                currentRole={playingRole}
                onSelect={() => onSubmitRole(RoleType.BountyDesigner)}
              />
              <RoleMenuOption
                targetRole={RoleType.BountyValidator}
                availableRoles={myProfile?.roles ?? []}
                currentRole={playingRole}
                onSelect={() => onSubmitRole(RoleType.BountyValidator)}
              />
            </MenuOptions>
          </Menu>
        </View>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 12,
          // paddingBottom: 12,
        }}>
        <View>
          <StyledText
            style={{fontSize: 24, fontWeight: '500'}}
            suspense
            trigger={profile?.firstName}
            shimmerWidth={120}>
            {profile?.firstName}
          </StyledText>
          <StyledText suspense trigger={profile}>
            @{profile?.username}
          </StyledText>
        </View>

        <View
          style={{
            flexWrap: 'wrap',
            flex: 1,
            flexDirection: 'row',
            gap: 12,
            alignContent: 'center',
          }}>
          <Bubble
            lowHeight
            text={`Level ${profile?.level}`}
            suspense
            trigger={profile}
          />
          {profile?.admin && profile.adminec && (
            <Bubble
              lowHeight
              text={`Admin`}
              type="red"
              suspense
              trigger={profile}
            />
          )}
          {profile?.financialOfficer && (
            <Bubble
              lowHeight
              text={`Financial Officer`}
              type="green"
              suspense
              trigger={profile}
            />
          )}
        </View>
      </View>
      {!!profile?.id && (
        <TouchableOpacity
          style={{flexDirection: 'row', gap: 8, alignItems: 'center'}}
          onPress={() => Clipboard.setString(profile.id)}>
          <View style={{padding: 8}}>
            <CopyIcon />
          </View>
          <StyledText>Copy wallet address</StyledText>
        </TouchableOpacity>
      )}

      <View
        style={{
          flexWrap: 'wrap',
          flexDirection: 'row',
          gap: 14,
          paddingBottom: 12,
        }}>
        {!profile && (
          <>
            <Bubble text="" suspense />
            <Bubble text="" suspense />
          </>
        )}
        {profile?.roles.map((role, i) => (
          <Bubble key={`${i}-${id}-${role}`} text={addSpaceCase(role) || ''} />
        ))}
      </View>

      <StyledText suspense trigger={profile} shimmerWidth={240}>
        {profile?.bountiesWon} bounties won • {profile?.teamsJoined} teams
        joined • {profile?.membersInvited} members invited
      </StyledText>
      {isMyProfile && (
        <View style={{width: '100%'}}>
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

function RoleMenuOption({
  availableRoles,
  targetRole,
  currentRole,
  onSelect,
}: {
  availableRoles: RoleType[];
  targetRole: RoleType;
  currentRole?: RoleType;
  onSelect: () => void;
}) {
  if (availableRoles.includes(targetRole))
    return (
      <MenuOption onSelect={onSelect}>
        <View>
          <StyledText
            style={{
              color: currentRole === targetRole ? Colors.Primary : Colors.Text,
            }}>
            {addSpaceCase(targetRole)}
          </StyledText>
        </View>
      </MenuOption>
    );
  else return null;
}
