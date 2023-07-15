import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0 0.5L5 5.5L10 0.5H0Z" fill="#EADDFF"/>
</svg>
`;

export default () => <SvgXml xml={xml} width="10" height="10" />;
