import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.5C6.48 2.5 2 6.98 2 12.5C2 18.02 6.48 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2.5 12 2.5ZM18.36 17.33C16.93 15.59 13.46 15 12 15C10.54 15 7.07 15.59 5.64 17.33C4.62 15.99 4 14.32 4 12.5C4 8.09 7.59 4.5 12 4.5C16.41 4.5 20 8.09 20 12.5C20 14.32 19.38 15.99 18.36 17.33ZM8.5 10C8.5 8.06 10.06 6.5 12 6.5C13.94 6.5 15.5 8.06 15.5 10C15.5 11.94 13.94 13.5 12 13.5C10.06 13.5 8.5 11.94 8.5 10Z" fill="#CAC4D0"/>
</svg>
`;

export default () => <SvgXml xml={xml} width="32" height="32" />;
