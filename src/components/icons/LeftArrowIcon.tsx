import BaseIcon from './_BaseIcon';

const xml = `
<svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path transform="scale(-1,1) translate(-13,0)" d="M6.5 0L5.4425 1.0575L9.6275 5.25H0.5V6.75H9.6275L5.4425 10.9425L6.5 12L12.5 6L6.5 0Z" fill="#D0BCFF"/>
</svg>
`;

export default function LeftArrowIcon() {
  return <BaseIcon width={14} height={14} xml={xml} />;
}
