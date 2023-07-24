import {View} from 'react-native';
import RightArrowAccent from '../icons/RightArrowAccent';
import StyledText from './styled/StyledText';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'src/styles/styles';

export default function LongLinkNavigation({
  name,
  description,
  enabled = true,
  bottomText,
  onPress,
}: {
  name: string;
  description: string;
  enabled?: boolean;
  bottomText?: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={{
        borderBottomColor: Colors.Gray[400],
        paddingBottom: 14,
        borderBottomWidth: 0.5,
        paddingTop: 14,
        flexDirection: 'row',
      }}
      disabled={!enabled}
      onPress={onPress}>
      <View style={{width: '90%'}}>
        <StyledText
          style={{
            fontSize: 18,
            paddingBottom: 2,
            color: enabled ? Colors.Text : Colors.Gray[600],
          }}>
          {name}
        </StyledText>
        <StyledText
          style={{color: enabled ? Colors.Gray[400] : Colors.Gray[600]}}>
          {description}
        </StyledText>
        {bottomText && (
          <StyledText
            style={{color: enabled ? Colors.Gray[400] : Colors.Gray[600]}}>
            {bottomText}
          </StyledText>
        )}
      </View>
      <View style={{paddingTop: 14}}>
        <RightArrowAccent />
      </View>
    </TouchableOpacity>
  );
}
