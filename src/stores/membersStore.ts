import {Roles} from 'src/styles/types';
import {create} from 'zustand';

export type Member = {
  id: string;
  name: string;
  tag: string;
  bio: string;
  level: string;
  roles: Array<Roles>;
  bountiesWon: number;
  teamsJoined: number;
  membersInvited: number;
};

export const SAMPLE_MEMBERS: Array<Member> = [
  {
    id: '1',
    name: 'Aydens',
    tag: '@aydens1234',
    bio: 'lorem20',
    level: '1',
    roles: ['Bounty Hunter'],
    bountiesWon: 0,
    teamsJoined: 0,
    membersInvited: 0,
  },
  {
    id: '2',
    name: 'Rocky',
    tag: '@rocky',
    bio: 'lorem20',
    level: '2',
    roles: ['Bounty Hunter', 'Founder', 'Bounty Validator'],
    bountiesWon: 24,
    teamsJoined: 81,
    membersInvited: 12,
  },
  {
    id: '3',
    name: 'Comp1',
    tag: '@comp1',
    bio: 'lorem20',
    level: '3',
    roles: ['Bounty Hunter', 'Founder', 'Bounty Hunter'],
    bountiesWon: 21,
    teamsJoined: 25,
    membersInvited: 92,
  },
  {
    id: '4',
    name: 'Comp2',
    tag: '@comp2',
    bio: 'lorem20',
    level: '4',
    roles: ['Bounty Hunter', 'Founder', 'Bounty Hunter'],
    bountiesWon: 20,
    teamsJoined: 0,
    membersInvited: 21,
  },
  {
    id: '5',
    name: 'Comp3',
    tag: '@comp4',
    bio: 'lorem20',
    level: '40',
    roles: ['Bounty Hunter', 'Founder', 'Bounty Hunter'],
    bountiesWon: 20,
    teamsJoined: 0,
    membersInvited: 21,
  },
];

type MemberStore = {
  memberViewing: Member | undefined;
  setMemberIdViewing: (id: string | undefined) => void;
  myProfile: Member | undefined;
};

const useMemberStore = create<MemberStore>(set => ({
  memberViewing: undefined,
  setMemberIdViewing: id => {
    if (typeof id === 'undefined')
      return set(() => ({memberViewing: undefined}));

    // Do fetch
    const data = SAMPLE_MEMBERS.find(member => member.id == id);
    set(() => ({memberViewing: data}));
  },
  myProfile: SAMPLE_MEMBERS[0],
}));

export default useMemberStore;
