import BaseIcon from './_BaseIcon';

const xml = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 9H9V16H7V9H0V7H7V0H9V7H16V9Z" fill="#CAC4D0"/>
</svg>
`;

export default function PlusIcon() {
  return <BaseIcon width={16} height={16} xml={xml} />;
}
