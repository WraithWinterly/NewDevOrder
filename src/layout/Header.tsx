import {StackHeaderProps} from '@react-navigation/stack';

import {getHeaderTitle} from '@react-navigation/elements';
import {useState} from 'react';
import {View} from 'react-native';

export default function Header({
  options,
  route,
  navigation,
  back,
}: StackHeaderProps) {
  const title = getHeaderTitle(options, route.name);

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return <View></View>;
}
