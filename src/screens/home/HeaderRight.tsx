import {Text, View} from 'react-native';
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

export default function HeaderRight() {
  const navigation = useNavigation<NavigationProp<StackParamList>>();
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 24,

        alignItems: 'center',
        paddingRight: 18,
      }}>
      <LeaderboardIcon />

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
              // gap: 10,
              padding: 10,
              borderRadius: 12,
              width: 280,
            },
          }}>
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
                  Christina Vu
                </Text>
                <Text>@christinavu</Text>
              </View>
              <View
                style={{
                  backgroundColor: Colors.BackgroundLighter,
                  borderRadius: 12,
                  justifyContent: 'center',
                  paddingHorizontal: 18,
                  paddingVertical: 12,
                }}>
                <Text>Level 12</Text>
              </View>
            </View>
          </View>
          <MenuOption onSelect={() => {}}>
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