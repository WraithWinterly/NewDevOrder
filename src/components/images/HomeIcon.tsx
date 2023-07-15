import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.125 21V9L12.125 3L20.125 9V21H14.125V14H10.125V21H4.125Z" fill="#E8DEF8"/>
</svg>
`;

export default () => <SvgXml xml={xml} width="24" height="24" />;
