import {ReactNode} from 'react';
import {View} from 'react-native';
import {baseScreenStyle} from 'src/styles/styles';

export default function Layout({children}: {children: ReactNode}) {
  return <View style={baseScreenStyle.container}>{children}</View>;
}
