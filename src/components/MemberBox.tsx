import {View} from 'react-native';
import {Colors} from 'src/styles/styles';
import StyledText from './ui/styled/StyledText';
import {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';
import useSolanaContext from 'src/web3/SolanaProvider';
import {Member} from 'src/sharedTypes';

export default function MemberBox({
  member,
  rightChildren,
}: {
  member?: Member;
  rightChildren?: ReactNode;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();

  const walletAddress = useSolanaContext()
    .wallet?.publicKey.toBase58()
    .toString();

  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor:
          walletAddress === member?.id
            ? Colors.Purple[900]
            : Colors.BackgroundLighter,
        borderRadius: 12,
      }}
      onPress={() => {
        if (!!member?.id)
          navigation.navigate('Profile', {
            viewProfileAddress: member?.id,
          });
      }}>
      <View style={{padding: 8, borderRadius: 8}}>
        <StyledText suspense trigger={member}>
          {member?.firstName}
        </StyledText>
        <StyledText
          style={{color: Colors.Gray[400], fontSize: 15}}
          suspense
          trigger={member}>
          @{member?.username}
        </StyledText>
      </View>
      {rightChildren}
      {/* <Bubble lowHeight text={member.role} /> */}
    </TouchableOpacity>
  );
}
