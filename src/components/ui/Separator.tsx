import {View} from 'react-native';
import {Colors} from 'src/styles/styles';

export default function Separator({customH}: {customH?: number}) {
  return (
    <View
      style={{
        borderBottomColor: Colors.BorderColor,
        borderBottomWidth: 1,
        marginVertical: customH ? customH : 22,
      }}
    />
  );
}
