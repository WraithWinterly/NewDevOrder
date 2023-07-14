import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 12C9.31371 12 12 9.31371 12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12Z" fill="#CAC4D0"/>
</svg>
`;

export default () => <SvgXml xml={xml} width="10" height="10" />;
