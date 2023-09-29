import {View, TouchableOpacity} from 'react-native';
import StyledText from './styled/StyledText';
import {Colors} from 'src/styles/styles';

export default function Bubble({
  text,
  type = 'normal',
  lowHeight = false,
  suspense = false,
  trigger,
  isButton = false,
  onPress,
}: {
  text?: string;
  type?: 'purple' | 'green' | 'normal' | 'red' | 'transparent';
  lowHeight?: boolean;
  suspense?: boolean;
  trigger?: any;
  isButton?: boolean;
  onPress?: () => void;
}) {
  function getBg() {
    switch (type) {
      case 'purple':
        return '#4F378B';
      case 'green':
        return '#485844';
      case 'normal':
        return '#4A4458';
      case 'red':
        return Colors.Red[700];
      case 'transparent':
        return 'transparent';
    }
  }
  return isButton ? (
    <TouchableOpacity
      style={{
        backgroundColor: getBg(),
        borderRadius: 12,
        paddingHorizontal: 16,
        height: lowHeight ? 30 : 44,
        justifyContent: 'center',
        borderWidth: type === 'transparent' ? 1 : 0,
        borderColor: Colors.BorderColor,
        zIndex: 9,
      }}
      onPress={onPress}>
      <StyledText
        style={{fontSize: lowHeight ? 14 : 16, marginVertical: 0}}
        suspense={suspense}
        trigger={trigger}>
        {text}
      </StyledText>
    </TouchableOpacity>
  ) : (
    <View
      style={{
        backgroundColor: getBg(),
        borderRadius: 12,
        paddingHorizontal: 16,
        height: lowHeight ? 30 : 44,
        justifyContent: 'center',
        borderWidth: type === 'transparent' ? 1 : 0,
        borderColor: Colors.BorderColor,
      }}>
      <StyledText
        style={{fontSize: lowHeight ? 14 : 16, marginVertical: 0}}
        suspense={suspense}
        trigger={trigger}>
        {text}
      </StyledText>
    </View>
  );
}
