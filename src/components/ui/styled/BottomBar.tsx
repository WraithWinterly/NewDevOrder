import {ReactNode, useEffect, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {Colors} from 'src/styles/styles';

export default function BottomBar({children}: {children: ReactNode}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const l1 = Keyboard.addListener('keyboardDidShow', () => {
      setVisible(true);
    });
    const l2 = Keyboard.addListener('keyboardDidHide', () => {
      setVisible(false);
    });
    return () => {
      l1.remove();
      l2.remove();
    };
  }, [Keyboard]);
  return visible ? null : (
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
