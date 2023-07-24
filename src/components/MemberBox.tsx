import {View} from 'react-native';
import {Member} from 'src/stores/membersStore';
import {Colors} from 'src/styles/styles';
import StyledText from './ui/styled/StyledText';
import Bubble from './ui/Bubble';
import {ReactNode} from 'react';

export default function MemberBox({
  member,
  rightChildren,
}: {
  member: Member;
  rightChildren?: ReactNode;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: Colors.BackgroundLighter,
        borderRadius: 12,
      }}>
      <View style={{padding: 8, borderRadius: 8}}>
        <StyledText>{member.name}</StyledText>
        <StyledText style={{color: Colors.Gray[400], fontSize: 15}}>
          {member.tag}
        </StyledText>
      </View>
      {rightChildren}
      {/* <Bubble lowHeight text={member.role} /> */}
    </View>
  );
}
