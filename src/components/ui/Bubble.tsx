import {View} from 'react-native';
import StyledText from './styled/StyledText';

export default function Bubble({
  text,
  type,
}: {
  text: string;
  type: 'purple' | 'green' | 'normal';
}) {
  function getBg() {
    switch (type) {
      case 'purple':
        return '#4F378B';
      case 'green':
        return '#485844';
      case 'normal':
        return '#4A4458';
    }
  }
  return (
    <View
      style={{
        backgroundColor: getBg(),
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 4,
        height: 44,
        justifyContent: 'center',
      }}>
      <StyledText>{text}</StyledText>
    </View>
  );
}
