import {create} from 'zustand';
import {Member, SAMPLE_MEMBERS} from './membersStore';
import {Team} from './teamsStore';
import {Bounty} from './bountyStore';

type NotificationTypes = 'RequestJoinTeam' | 'InvitedJoinTeam' | 'BountyWon';

export type Notification = {
  id: string;
  user: Member;
  team?: Team;
  bounty?: Bounty;
  type: NotificationTypes;
};

const SAMPLE_NOTIFICATIONS: Array<Notification> = [
  {
    id: '0',
    user: SAMPLE_MEMBERS[0],
    team: undefined,
    type: 'BountyWon',
  },
  {
    id: '1',
    user: SAMPLE_MEMBERS[0],
    team: undefined,
    type: 'InvitedJoinTeam',
  },
  {
    id: '2',
    user: SAMPLE_MEMBERS[1],
    team: undefined,
    type: 'RequestJoinTeam',
  },
];

type InboxStore = {
  notifications: Notification[];
  fetchNotifications: () => Promise<void>;
  removeNotification: (id: string) => void;
};

const useInboxStore = create<InboxStore>(set => ({
  notifications: SAMPLE_NOTIFICATIONS,
  fetchNotifications: async () => {
    set({notifications: SAMPLE_NOTIFICATIONS});
  },
  removeNotification: id => {
    set(state => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },
}));

export default useInboxStore;
