import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';
import {Colors} from 'src/styles/styles';

interface StyledTextProps {
  children: ReactNode;
  type?: 'normal' | 'header';
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
}

export function StyledText({
  children,
  type = 'normal',
  style,
  onPress,
}: StyledTextProps) {
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

  return (
    <Text style={[newStyle, style]} onPress={onPress}>
      {children}
    </Text>
  );
}

export default StyledText;
