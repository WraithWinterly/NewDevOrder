import {View} from 'react-native';
import StyledText from './styled/StyledText';
import {TouchableOpacity} from 'react-native';
import {Colors} from 'src/styles/styles';
import Separator from './Separator';
import RightArrowIcon from '../icons/RightArrowIcon';

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
    <>
      <TouchableOpacity
        style={{
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
          <RightArrowIcon />
        </View>
      </TouchableOpacity>
      <Separator customH={8} />
    </>
  );
}
