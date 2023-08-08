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
  enabled?: boolean;
  error?: boolean;
}

export function StyledButton({
  children,
  onPress,
  type = 'normal',
  loading = false,
  enabled = true,
  error = false,
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
        // paddingTop: 8,
        // paddingBottom: 10,
        justifyContent: 'center',
        paddingBottom: 4,
        height: 52,
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
  const noBg = type != 'noBg' && type != 'noBgDanger' && type != 'noBgPurple';
  return (
    <TouchableOpacity
      style={
        enabled && error && noBg
          ? {...style, backgroundColor: Colors.Red[400]}
          : !enabled && noBg
          ? {...style, backgroundColor: Colors.Gray[600]}
          : style
      }
      onPress={enabled ? onPress : () => {}}
      disabled={!enabled}>
      {typeof children === 'string' ? (
        !loading ? (
          <Text
            style={
              error
                ? {...textStyle, color: Colors.White}
                : enabled
                ? textStyle
                : {...textStyle, color: Colors.Gray[400]}
            }>
            {children}
          </Text>
        ) : (
          <ActivityIndicator color={Colors.AppBar} size={22} />
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
