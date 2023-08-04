import BaseIcon from './_BaseIcon';

const xml = `
<svg width="78" height="78" viewBox="0 0 78 78" fill="none" xmlns="http://www.w3.org/2000/svg">
<g filter="url(#filter0_dd_697_16090)">
<g clip-path="url(#clip0_697_16090)">
<rect x="11" y="7" width="56" height="56" rx="16" fill="#2B2930"/>
<path d="M47 36H40V43H38V36H31V34H38V27H40V34H47V36Z" fill="#D0BCFF"/>
</g>
</g>
<defs>
<filter id="filter0_dd_697_16090" x="0" y="0" width="78" height="78" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.3 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_697_16090"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feMorphology radius="3" operator="dilate" in="SourceAlpha" result="effect2_dropShadow_697_16090"/>
<feOffset dy="4"/>
<feGaussianBlur stdDeviation="4"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/>
<feBlend mode="normal" in2="effect1_dropShadow_697_16090" result="effect2_dropShadow_697_16090"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_697_16090" result="shape"/>
</filter>
<clipPath id="clip0_697_16090">
<rect x="11" y="7" width="56" height="56" rx="16" fill="white"/>
</clipPath>
</defs>
</svg>

`;

export default function AddButtonIcon() {
  return <BaseIcon width={92} height={92} xml={xml} />;
}
