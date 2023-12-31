import BaseIcon from './_BaseIcon';

const xmlUp = `
<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.41 7.41992L6 2.82992L10.59 7.41992L12 6.00008L6 0.000076294L0 6.00008L1.41 7.41992Z" fill="#F8F8F8"/>
</svg>
`;

const xmlDown = `
<svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.41 0.580078L6 5.17008L10.59 0.580078L12 2.00008L6 8.00008L0 2.00008L1.41 0.580078Z" fill="#F8F8F8"/>
</svg>
`;

export default function CollapsibleArrow({
  faceDown,
  wh = 10,
}: {
  faceDown: boolean;
  wh?: number;
}) {
  return <BaseIcon width={wh} height={wh} xml={faceDown ? xmlDown : xmlUp} />;
}
