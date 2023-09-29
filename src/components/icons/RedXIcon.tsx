import BaseIcon from './_BaseIcon';

const xml = `
<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 0.5C5.81429 0.5 0.5 5.81429 0.5 12.5C0.5 19.1857 5.81429 24.5 12.5 24.5C19.1857 24.5 24.5 19.1857 24.5 12.5C24.5 5.81429 19.1857 0.5 12.5 0.5ZM17.1286 18.5L12.5 13.8714L7.87143 18.5L6.5 17.1286L11.1286 12.5L6.5 7.87143L7.87143 6.5L12.5 11.1286L17.1286 6.5L18.5 7.87143L13.8714 12.5L18.5 17.1286L17.1286 18.5Z" fill="#E03C31"/>
</svg>
`;

export default function RedXIcon() {
  return <BaseIcon width={24} height={24} xml={xml} />;
}
