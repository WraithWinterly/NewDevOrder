import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';
import {Colors} from 'src/styles/styles';
import {TouchableOpacity} from 'react-native';

interface StyledButtonProps {
  children: ReactNode;
  onPress?: () => void;
  type?: 'normal' | 'noBg';
}

export function StyledButton({
  children,
  onPress,
  type = 'normal',
}: StyledButtonProps) {
  let style: StyleProp<TextStyle> = {};

  switch (type) {
    case 'normal':
      style = {
        fontSize: 16,
        padding: 16,
        borderRadius: 50,
        color: Colors.Text,
        backgroundColor: Colors.Primary,
      };
      break;
    case 'noBg':
      style = {
        fontSize: 16,
        padding: 16,
        backgroundColor: Colors.Transparent,
      };
  }

  let textStyle: StyleProp<TextStyle> = {
    color: type === 'noBg' ? Colors.White : Colors.Black,
    alignSelf: 'center',
  };

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {typeof children === 'string' ? (
        <Text style={textStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

export default StyledButton;
