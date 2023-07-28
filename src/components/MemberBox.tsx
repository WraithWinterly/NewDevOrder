import {View} from 'react-native';
import useMemberStore, {Member} from 'src/stores/membersStore';
import {Colors} from 'src/styles/styles';
import StyledText from './ui/styled/StyledText';
import Bubble from './ui/Bubble';
import {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from 'src/StackNavigator';

export default function MemberBox({
  member,
  rightChildren,
}: {
  member: Member;
  rightChildren?: ReactNode;
}) {
  const navigation = useNavigation<StackNavigationProp<StackParamList>>();
  const setMemberIdViewing = useMemberStore(state => state.fetchProfile);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: Colors.BackgroundLighter,
        borderRadius: 12,
      }}
      onPress={() => {
        setMemberIdViewing(member.id);
        navigation.navigate('Profile');
      }}>
      <View style={{padding: 8, borderRadius: 8}}>
        <StyledText>{member.firstName}</StyledText>
        <StyledText style={{color: Colors.Gray[400], fontSize: 15}}>
          {member.tag}
        </StyledText>
      </View>
      {rightChildren}
      {/* <Bubble lowHeight text={member.role} /> */}
    </TouchableOpacity>
  );
}
