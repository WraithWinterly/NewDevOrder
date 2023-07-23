import * as React from 'react';
import {SvgXml} from 'react-native-svg';

export default function BaseIcon({
  width,
  height,
  xml,
}: {
  width: number;
  height: number;
  xml: string;
}) {
  return <SvgXml xml={xml} width={`${width}`} height={`${height}`} />;
}
