import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';
import {Colors} from 'src/styles/styles';

interface StyledTextProps {
  children: ReactNode;
  type?: 'normal' | 'header';
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  truncate?: boolean;
}

export function StyledText({
  children,
  type = 'normal',
  style,
  onPress,
  truncate = false,
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

  // if (truncate) {
  //   newStyle = {
  //     ...newStyle,
  //     lineHeight: 1,
  //     el: 'tail',
  //   };
  // }

  return truncate ? (
    <Text
      style={[newStyle, style]}
      numberOfLines={1}
      ellipsizeMode="tail"
      onPress={onPress}>
      {children}
    </Text>
  ) : (
    <Text style={[newStyle, style]} onPress={onPress}>
      {children}
    </Text>
  );
}

export default StyledText;
