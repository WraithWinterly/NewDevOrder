import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export default function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onKeyboardShow = () => setVisible(true);
    const onKeyboardHide = () => setVisible(false);

    const keyboardShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );
    const keyboardHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };
  }, []); // We leave the dependency array empty because Keyboard is a static API and won't change.

  return visible;
}
