import BaseIcon from './_BaseIcon';

const xml = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g transform="scale(-1,1) translate(-16,0)">
  <path d="M16 7H3.83L9.42 1.41L8 0L0 8L8 16L9.41 14.59L3.83 9H16V7Z" fill="#CAC4D0"/>
</g>
</svg>
`;

export default function ForwardArrow() {
  return <BaseIcon width={16} height={16} xml={xml} />;
}
