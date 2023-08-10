import {ReactNode} from 'react';
import {View} from 'react-native';

export default function Layout({children}: {children: ReactNode}) {
  return (
    <View style={{paddingHorizontal: 20, paddingVertical: 28}}>
      <View>{children}</View>
    </View>
  );
}
