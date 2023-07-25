import {create} from 'zustand';
import {Member, SAMPLE_MEMBERS} from './membersStore';

type LeaderboardStore = {
  topMembers: Array<Member> | undefined;
  fetchTopMembers: (startId: number) => Promise<void>;
  topFounders: Array<Member> | undefined;
  fetchTopFounders: (startId: number) => Promise<void>;
};

const useLeaderboardStore = create<LeaderboardStore>(set => ({
  topMembers: undefined,
  fetchTopMembers: async startId => {
    set({
      topMembers: [SAMPLE_MEMBERS[0], SAMPLE_MEMBERS[1], SAMPLE_MEMBERS[2]],
    });
  },
  topFounders: undefined,
  fetchTopFounders: async startId => {
    set({
      topFounders: [SAMPLE_MEMBERS[2], SAMPLE_MEMBERS[3], SAMPLE_MEMBERS[4]],
    });
  },
}));

export default useLeaderboardStore;
