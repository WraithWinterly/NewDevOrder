import BaseIcon from './_BaseIcon';

const xml = `
<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2 21.5V9.5H7.5V21.5H2ZM9.25 21.5V3.5H14.75V21.5H9.25ZM16.5 21.5V11.5H22V21.5H16.5Z" fill="#E8DEF8"/>
</svg>
`;

export default function LeaderboardIcon() {
  return <BaseIcon width={24} height={24} xml={xml} />;
}
