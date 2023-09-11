import BaseIcon from './_BaseIcon';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20 8H10C8.89543 8 8 8.89543 8 10V20C8 21.1046 8.89543 22 10 22H20C21.1046 22 22 21.1046 22 20V10C22 8.89543 21.1046 8 20 8Z" stroke="#EADDFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 16C2.9 16 2 15.1 2 14V4C2 2.9 2.9 2 4 2H14C15.1 2 16 2.9 16 4" stroke="#EADDFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default function CopyIcon() {
  return <BaseIcon width={24} height={24} xml={xml} />;
}
