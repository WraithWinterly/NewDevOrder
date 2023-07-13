import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="url(#paint0_linear_128_9904)"/>
<path d="M15.4461 9.12511H13.8554C13.8554 5.90186 11.2182 3.26465 7.99494 3.26465C4.77168 3.26465 2.17633 5.81814 2.13447 8.99953C2.05075 12.2646 5.14843 15.153 8.4554 15.153H8.87401C11.7624 15.153 15.6973 12.8926 16.2833 10.1298C16.367 9.58558 15.9484 9.12511 15.4461 9.12511ZM5.60889 9.25069C5.60889 9.6693 5.27401 10.046 4.81354 10.046C4.39494 10.046 4.01819 9.71116 4.01819 9.25069V7.99488C4.01819 7.57628 4.35308 7.19953 4.81354 7.19953C5.23215 7.19953 5.60889 7.53442 5.60889 7.99488V9.25069ZM8.37168 9.25069C8.37168 9.6693 8.0368 10.046 7.57633 10.046C7.15773 10.046 6.78098 9.71116 6.78098 9.25069V7.99488C6.78098 7.57628 7.11587 7.19953 7.57633 7.19953C7.99494 7.19953 8.37168 7.53442 8.37168 7.99488V9.25069Z" fill="url(#paint1_linear_128_9904)"/>
<defs>
<linearGradient id="paint0_linear_128_9904" x1="9" y1="0" x2="9" y2="18" gradientUnits="userSpaceOnUse">
<stop stop-color="#534BB1"/>
<stop offset="1" stop-color="#551BF9"/>
</linearGradient>
<linearGradient id="paint1_linear_128_9904" x1="9.1911" y1="3.25485" x2="9.1911" y2="15.1272" gradientUnits="userSpaceOnUse">
<stop stop-color="white"/>
<stop offset="1" stop-color="white" stop-opacity="0.82"/>
</linearGradient>
</defs>
</svg>
`;

export default () => <SvgXml xml={xml} width="28" height="28" />;
