import BaseIcon from './_BaseIcon';

const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 15.6839H19.0004V2" stroke="#EADDFF" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.0004 10.4209H5V21.9996M22.0006 5.15783L19.0005 2L16.0004 5.15783" stroke="#EADDFF" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.00022 18.8418L5.00011 21.9996L2 18.8418" stroke="#EADDFF" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

export default function ChangeIcon() {
  return <BaseIcon width={24} height={24} xml={xml} />;
}
