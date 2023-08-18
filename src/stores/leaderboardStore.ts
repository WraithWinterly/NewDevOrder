import {Member} from 'src/sharedTypes';
import query from 'src/utils/query';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
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
    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_LEADERBOARD_MEMBERS),
    );
    if (result) {
      set({
        topMembers: result,
      });
    }
  },
  topFounders: undefined,
  fetchTopFounders: async startId => {
    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_LEADERBOARD_FOUNDERS),
    );
    if (result) {
      set({
        topFounders: result,
      });
    }
  },
}));

export default useLeaderboardStore;
