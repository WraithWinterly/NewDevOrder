import {Member} from 'src/sharedTypes';
import {create} from 'zustand';

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
      topMembers: undefined,
    });
  },
  topFounders: undefined,
  fetchTopFounders: async startId => {
    set({
      topFounders: undefined,
    });
  },
}));

export default useLeaderboardStore;
