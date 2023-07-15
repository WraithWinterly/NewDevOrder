import * as React from 'react';
import {SvgXml} from 'react-native-svg';

const xml = `
<svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.97961 6.19961C6.65961 6.11961 6.33961 5.95961 6.09961 5.71961C5.85961 5.63961 5.77961 5.39961 5.77961 5.23961C5.77961 5.07961 5.85961 4.83961 6.01961 4.75961C6.25961 4.59961 6.49961 4.43961 6.73961 4.51961C7.21961 4.51961 7.61961 4.75961 7.85961 5.07961L8.57961 4.11961C8.33961 3.87961 8.09961 3.71961 7.85961 3.55961C7.61961 3.39961 7.29961 3.31961 6.97961 3.31961V2.19961H6.01961V3.31961C5.61961 3.39961 5.21961 3.63961 4.89961 3.95961C4.57961 4.35961 4.33961 4.83961 4.41961 5.31961C4.41961 5.79961 4.57961 6.27961 4.89961 6.59961C5.29961 6.99961 5.85961 7.23961 6.33961 7.47961C6.57961 7.55961 6.89961 7.71961 7.13961 7.87961C7.29961 8.03961 7.37961 8.27961 7.37961 8.51961C7.37961 8.75961 7.29961 8.99961 7.13961 9.23961C6.89961 9.47961 6.57961 9.55961 6.33961 9.55961C6.01961 9.55961 5.61961 9.47961 5.37961 9.23961C5.13961 9.07961 4.89961 8.83961 4.73961 8.59961L3.93961 9.47961C4.17961 9.79961 4.41961 10.0396 4.73961 10.2796C5.13961 10.5196 5.61961 10.7596 6.09961 10.7596V11.7996H6.97961V10.5996C7.45961 10.5196 7.85961 10.2796 8.17961 9.95961C8.57961 9.55961 8.81961 8.91961 8.81961 8.35961C8.81961 7.87961 8.65961 7.31961 8.25961 6.99961C7.85961 6.59961 7.45961 6.35961 6.97961 6.19961ZM6.49961 0.599609C2.97961 0.599609 0.0996094 3.47961 0.0996094 6.99961C0.0996094 10.5196 2.97961 13.3996 6.49961 13.3996C10.0196 13.3996 12.8996 10.5196 12.8996 6.99961C12.8996 3.47961 10.0196 0.599609 6.49961 0.599609ZM6.49961 12.5196C3.45961 12.5196 0.979609 10.0396 0.979609 6.99961C0.979609 3.95961 3.45961 1.47961 6.49961 1.47961C9.53961 1.47961 12.0196 3.95961 12.0196 6.99961C12.0196 10.0396 9.53961 12.5196 6.49961 12.5196Z" fill="white"/>
</svg>
`;

export default () => <SvgXml xml={xml} width="18" height="18" />;
