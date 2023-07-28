import BaseIcon from './_BaseIcon';

const xml = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 9H9V16H7V9H0V7H7V0H9V7H16V9Z" fill="#CAC4D0"/>
</svg>
`;
const xmlAccent = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 9.5H9V16.5H7V9.5H0V7.5H7V0.5H9V7.5H16V9.5Z" fill="#D0BCFF"/>
</svg>
`;
export default function PlusIcon({accent = false}: {accent?: boolean}) {
  return <BaseIcon width={16} height={16} xml={accent ? xmlAccent : xml} />;
}
