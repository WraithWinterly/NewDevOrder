import React, {ReactNode, useState} from 'react';
import {Text, StyleProp, TextStyle, ActivityIndicator} from 'react-native';
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
  loading?: boolean;
}

export function StyledButton({
  children,
  onPress,
  type = 'normal',
  loading = false,
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
        !loading ? (
          <Text style={textStyle}>{children}</Text>
        ) : (
          <ActivityIndicator color={Colors.AppBar} size={24} />
        )
      ) : !loading ? (
        children
      ) : (
        <ActivityIndicator color={Colors.AppBar} />
      )}
    </TouchableOpacity>
  );
}

export default StyledButton;
