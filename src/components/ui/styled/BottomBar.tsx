import {ReactNode, useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import useKeyboardVisible from 'src/hooks/useKeyboardVisible';
import {Colors} from 'src/styles/styles';

export default function BottomBar({children}: {children: ReactNode}) {
  const kbVisible = useKeyboardVisible();
  return kbVisible ? null : (
    <View
      style={{
        position: 'absolute',
        bottom: -28,
        width: '110%',
        paddingHorizontal: 24,
        marginLeft: -18,
        paddingVertical: 14,
        // height: 42,
        backgroundColor: Colors.AppBar,
        zIndex: 1,
      }}>
      {children}
    </View>
  );
}
