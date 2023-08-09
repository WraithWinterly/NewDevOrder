import {ActivityIndicator, Text, View} from 'react-native';
import LeaderboardIcon from 'src/components/icons/LeaderboardIcon';
import ProfileIcon from 'src/components/icons/ProfileIcon';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {Colors} from 'src/styles/styles';
import WalletIcon from 'src/components/icons/WalletIcon';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {StackParamList} from 'src/StackNavigator';
import Separator from 'src/components/ui/Separator';
import useMemberStore from 'src/stores/membersStore';
import {TouchableOpacity} from 'react-native';
import useBountyStore from 'src/stores/bountyStore';
import useTeamsStore from 'src/stores/teamsStore';
import useProjectsStore from 'src/stores/projectsStore';
import RefreshIcon from 'src/components/icons/RefreshIcon';
import {useState} from 'react';
import useSolanaContext from 'src/web3/SolanaProvider';

export default function HeaderRight() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  const setMemberIdViewing = useMemberStore(state => state.fetchProfile);
  const myProfile = useMemberStore(state => state.myProfile);

  const fetchBounties = useBountyStore(state => state.fetchBounties);
  const fetchTeams = useTeamsStore(state => state.fetchTeams);
  const fetchProjects = useProjectsStore(state => state.fetchProjects);
  const fetchMyProfile = useMemberStore(state => state.fetchMyProfile);

  const {wallet} = useSolanaContext();

  const [refreshing, setRefreshing] = useState(false);

  const [refreshError, setRefreshError] = useState<boolean>(false);

  const setSelectedTeam = useTeamsStore(state => state.setSelectedTeam);
  const setSelectedProject = useProjectsStore(
    state => state.setSelectedProject,
  );
  const setSelectedBounty = useBountyStore(state => state.setSelectedBounty);

  async function refresh() {
    // if (refreshing) return;
    setRefreshError(false);
    setRefreshing(true);
    try {
      await Promise.all([
        fetchBounties(),
        fetchTeams(),
        fetchProjects(),
        fetchMyProfile(wallet?.publicKey.toBase58().toString()),
      ]);
      setSelectedTeam(undefined);
      setSelectedProject(undefined);
      setSelectedBounty(undefined);
    } catch (e) {
      console.error((e as Error).message);
      setRefreshError(true);
    }

    setRefreshing(false);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 24,

        alignItems: 'center',
        paddingRight: 18,
      }}>
      <TouchableOpacity onPress={refresh}>
        {refreshing ? (
          <ActivityIndicator color={Colors.White} />
        ) : (
          <RefreshIcon red={refreshError} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
        <LeaderboardIcon />
      </TouchableOpacity>

      <Menu>
        <MenuTrigger>
          <ProfileIcon size={24} />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              backgroundColor: Colors.BackgroundLighter,
              marginTop: 40,
              marginLeft: -80,
              borderRadius: 12,
            },
            optionsWrapper: {
              backgroundColor: Colors.BackgroundDarker,
              padding: 10,
              borderRadius: 12,
              width: 280,
            },
          }}>
          {myProfile && (
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                marginBottom: 8,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 12,
                  gap: 12,
                }}>
                {/* Profile Picture */}
                <View
                  style={{
                    height: 38,
                    width: 38,
                    backgroundColor: Colors.Purple[400],
                    borderRadius: 100,
                  }}></View>
                <View style={{flexDirection: 'column'}}>
                  <Text style={{color: Colors.White, fontSize: 18}}>
                    {myProfile.firstName}
                  </Text>
                  <Text>{myProfile.username}</Text>
                </View>
                <View
                  style={{
                    backgroundColor: Colors.BackgroundLighter,
                    borderRadius: 12,
                    justifyContent: 'center',
                    paddingHorizontal: 18,
                    paddingVertical: 12,
                  }}>
                  <Text>Level {myProfile.level}</Text>
                </View>
              </View>
            </View>
          )}

          <MenuOption
            onSelect={() => {
              setMemberIdViewing(undefined);
              navigation.navigate('Profile');
            }}>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <ProfileIcon />
              <Text style={{color: 'white'}}>My Profile</Text>
            </View>
          </MenuOption>
          <Separator customH={6} />
          <MenuOption onSelect={() => navigation.navigate('MyWallet')}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <WalletIcon />
              <Text style={{color: 'white'}}>My Wallet</Text>
            </View>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
}
