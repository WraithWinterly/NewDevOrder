import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';
import {Colors} from 'src/styles/styles';
import {TouchableOpacity} from 'react-native';

interface StyledButtonProps {
  children: ReactNode;
  onPress?: () => void;
  type?:
    | 'normal'
    | 'normal2'
    | 'noBg'
    | 'noBgDanger'
    | 'noBgPurple'
    | 'borderNoFill';
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
        paddingHorizontal: 22,
        borderRadius: 50,
        backgroundColor: Colors.Primary,
      };
      break;
    case 'normal2':
      style = {
        fontSize: 16,
        padding: 16,
        paddingHorizontal: 22,
        borderRadius: 50,
        backgroundColor: Colors.Secondary,
        // color: Colors.White,
        // backgroundColor: Colors.Primary,
      };
      break;
    case 'noBg':
      style = {
        fontSize: 16,
        padding: 16,
        backgroundColor: Colors.Transparent,
      };
      break;
    case 'noBgPurple':
      style = {
        fontSize: 16,
        padding: 16,
        backgroundColor: Colors.Transparent,
      };
      break;
    case 'noBgDanger':
      style = {
        fontSize: 16,
        padding: 16,
        paddingHorizontal: 28,
        backgroundColor: Colors.Transparent,
        color: Colors.Red[400],
      };
      break;
    case 'borderNoFill':
      style = {
        fontSize: 16,
        paddingTop: 8,
        paddingBottom: 10,
        paddingHorizontal: 28,
        backgroundColor: Colors.Transparent,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: Colors.BorderColor,
        color: Colors.Text,
      };
      break;
  }

  let textStyle: StyleProp<TextStyle> = {
    color:
      type === 'noBg'
        ? Colors.White
        : type === 'noBgDanger'
        ? Colors.Red[400]
        : type === 'noBgPurple'
        ? Colors.Primary
        : type === 'borderNoFill'
        ? Colors.Primary
        : type === 'normal2'
        ? Colors.Gray[200]
        : '#381E72',
    fontWeight: '500',
    alignSelf: 'center',
    fontSize: 16,
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
