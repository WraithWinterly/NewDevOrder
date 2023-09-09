import BaseIcon from './_BaseIcon';
const xml = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M21.0727 20.3812L19.8305 13.2188H20.25C20.5875 13.2188 20.8594 12.9469 20.8594 12.6094V8.10938C20.8594 7.77188 20.5875 7.5 20.25 7.5H14.4844V3.23438C14.4844 2.89688 14.2125 2.625 13.875 2.625H10.125C9.7875 2.625 9.51562 2.89688 9.51562 3.23438V7.5H3.75C3.4125 7.5 3.14062 7.77188 3.14062 8.10938V12.6094C3.14062 12.9469 3.4125 13.2188 3.75 13.2188H4.16953L2.92734 20.3812C2.92031 20.4164 2.91797 20.4516 2.91797 20.4844C2.91797 20.8219 3.18984 21.0938 3.52734 21.0938H20.4727C20.5078 21.0938 20.543 21.0914 20.5758 21.0844C20.9086 21.0281 21.1312 20.7117 21.0727 20.3812ZM4.78125 9.14062H11.1562V4.26562H12.8438V9.14062H19.2188V11.5781H4.78125V9.14062ZM15.75 19.4531V15.7969C15.75 15.6937 15.6656 15.6094 15.5625 15.6094H14.4375C14.3344 15.6094 14.25 15.6937 14.25 15.7969V19.4531H9.75V15.7969C9.75 15.6937 9.66563 15.6094 9.5625 15.6094H8.4375C8.33437 15.6094 8.25 15.6937 8.25 15.7969V19.4531H4.75313L5.81016 13.3594H18.1875L19.2445 19.4531H15.75Z" fill="#EADDFF"/>
</svg>
`;

export default function CleanIcon() {
  return <BaseIcon width={32} height={32} xml={xml} />;
}