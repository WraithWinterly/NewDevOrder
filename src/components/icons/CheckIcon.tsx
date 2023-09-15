import BaseIcon from './_BaseIcon';

const xml = `
<svg
  width="18"
  height="18"
  viewBox="0 0 18 18"
  fill="none"
  xmlns="http://www.w3.org/2000/svg">
  <path
    d="M8.99935 0.667969C4.39935 0.667969 0.666016 4.4013 0.666016 9.0013C0.666016 13.6013 4.39935 17.3346 8.99935 17.3346C13.5993 17.3346 17.3327 13.6013 17.3327 9.0013C17.3327 4.4013 13.5993 0.667969 8.99935 0.667969ZM7.33268 13.168L3.16602 9.0013L4.34102 7.8263L7.33268 10.8096L13.6577 4.48464L14.8327 5.66797L7.33268 13.168Z"
    fill="#528745"
  />
</svg>
`;

export default function CheckIcon({customSize}: {customSize?: number}) {
  return (
    <BaseIcon width={customSize || 24} height={customSize || 24} xml={xml} />
  );
}
