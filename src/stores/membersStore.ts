import {create} from 'zustand';

export type RoleType =
  | 'Founder'
  | 'Bounty Hunter'
  | 'Bounty Manager'
  | 'Bounty Designer'
  | 'Bounty Validator';

export type Member = {
  id: string;
  username?: string;
  firstName: string;
  lastName?: string;
  walletAddress?: string;
  email?: string;
  tag: string;
  bio: string;
  level: string;
  roles: Array<Role>;
  playingRole: (typeof RoleDict)[0];
  bountiesWon: number;
  teamsJoined: string[];
  membersInvited: number;
  completedWelcome: boolean;
};

type Role = {
  id: string;
  title: RoleType;
};

export const RoleDict: Role[] = [
  {id: '0', title: 'Founder'},
  {id: '1', title: 'Bounty Hunter'},
  {id: '2', title: 'Bounty Manager'},
  {id: '3', title: 'Bounty Designer'},
  {id: '4', title: 'Bounty Validator'},
];

export function GetRole(string: RoleType) {
  return RoleDict.find(role => role.title == string)!;
}

export const SAMPLE_MEMBERS: Array<Member> = [
  {
    id: '1',
    firstName: 'Aydens',
    tag: '@aydens1234',
    bio: 'lorem20',
    level: '1',
    roles: [GetRole('Bounty Hunter')],
    playingRole: RoleDict[0],
    bountiesWon: 0,
    teamsJoined: [],
    membersInvited: 0,
    completedWelcome: false,
  },
  {
    id: '2',
    firstName: 'Rocky',
    tag: '@rocky',
    bio: 'lorem20',
    level: '2',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Validator')],
    playingRole: RoleDict[1],
    bountiesWon: 24,
    teamsJoined: ['1', '2', '3'],
    membersInvited: 12,
    completedWelcome: true,
  },
  {
    id: '3',
    firstName: 'Comp1',
    tag: '@comp1',
    bio: 'lorem20',
    level: '3',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Hunter')],
    playingRole: RoleDict[2],
    bountiesWon: 21,
    teamsJoined: [],
    membersInvited: 92,
    completedWelcome: true,
  },
  {
    id: '4',
    firstName: 'Comp2',
    tag: '@comp2',
    bio: 'lorem20',
    level: '4',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Designer')],
    playingRole: RoleDict[3],
    bountiesWon: 20,
    teamsJoined: [],
    membersInvited: 21,
    completedWelcome: true,
  },
  {
    id: '5',
    firstName: 'Comp3',
    tag: '@comp4',
    bio: 'lorem20',
    level: '40',
    roles: [GetRole('Bounty Hunter'), GetRole('Bounty Hunter')],
    playingRole: RoleDict[2],
    bountiesWon: 20,
    teamsJoined: [],
    membersInvited: 21,
    completedWelcome: true,
  },
];

type MemberStore = {
  memberViewing: Member | undefined;
  setMemberIdViewing: (id: string | undefined) => void;
  myProfile: Member | undefined;
  setPlayingRole: (role: Role) => void;
};

const useMemberStore = create<MemberStore>((set, get) => ({
  memberViewing: undefined,
  setMemberIdViewing: id => {
    if (typeof id === 'undefined')
      return set(() => ({memberViewing: undefined}));

    // Do fetch
    const data = SAMPLE_MEMBERS.find(member => member.id == id);
    set(() => ({memberViewing: data}));
  },
  myProfile: SAMPLE_MEMBERS[0],
  setPlayingRole: (role: Role) => {
    set(() => ({myProfile: {...SAMPLE_MEMBERS[0], playingRole: role}}));
  },
}));

export default useMemberStore;
