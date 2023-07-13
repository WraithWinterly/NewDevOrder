import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';
import {Colors} from 'src/styles/styles';

interface NDOTextProps {
  children: ReactNode;
  type?: 'normal' | 'header';
  style?: StyleProp<TextStyle>;
}

export function NDO_Text({children, type = 'normal', style}: NDOTextProps) {
  let newStyle: StyleProp<TextStyle> = {};

  switch (type) {
    case 'normal':
      newStyle = {
        fontSize: 16,
        color: Colors.Text,
      };
      break;
    case 'header':
      newStyle = {
        fontSize: 34,
        fontWeight: 'bold',
        color: Colors.White,
      };
      break;
  }

  return <Text style={[style, newStyle]}>{children}</Text>;
}

export default NDO_Text;
