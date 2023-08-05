import CheckBox from '@react-native-community/checkbox';
import {Dispatch, SetStateAction} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from 'src/styles/styles';
import StyledText from './StyledText';

export default function StyledCheckbox({
  title,
  value,
  onValueChange,
}: {
  title: string;
  value: boolean;
  onValueChange: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginVertical: 10,
      }}
      onPress={() => onValueChange(prev => !prev)}>
      <CheckBox
        boxType="square"
        tintColors={{true: Colors.Primary, false: Colors.Gray[400]}}
        value={value}
        onValueChange={e => onValueChange(e)}></CheckBox>
      <StyledText>{title}</StyledText>
    </TouchableOpacity>
  );
}
