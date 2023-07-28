import BaseIcon from './_BaseIcon';

const xml = `
<svg viewBox="0 0 512 512">
  <path fill="none" stroke="#E8DEF8" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="32" d="M320 146s24.36-12-64-12a160 160 0 10160 160"></path>
  <path fill="none" stroke="#E8DEF8" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="32" d="M256 58l80 80-80 80"></path>
</svg>
`;

export default function RefreshIcon() {
  return <BaseIcon width={22} height={22} xml={xml} />;
}
