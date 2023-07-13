import React from 'react';
import {Text, Linking} from 'react-native';
import {Colors} from 'src/styles/styles';

interface NDOLinkProps {
  href: string;
  children: string;
}

export function NDO_Link({href, children}: NDOLinkProps) {
  return (
    <Text
      style={{
        color: Colors.Primary,
        textDecorationLine: 'underline',
      }}
      onPress={() => {
        Linking.openURL(href);
      }}>
      {children}
    </Text>
  );
}

export default NDO_Link;
