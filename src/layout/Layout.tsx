import {ReactNode} from 'react';
import {ScrollView, View} from 'react-native';

export default function Layout({children}: {children: ReactNode}) {
  return (
    <View
      style={{
        justifyContent: 'space-around',
        flex: 1,
        paddingTop: 40,
        gap: 18,
        height: '100%',
      }}>
      <ScrollView style={{paddingHorizontal: 20}}>
        <View>{children}</View>
      </ScrollView>
    </View>
  );
}
