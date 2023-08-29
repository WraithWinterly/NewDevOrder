import {Endpoints, getServerEndpoint} from '../utils/server';
import {create} from 'zustand';

import query from 'src/utils/query';
import {Bounty, Member, Submission, Team, TeamInvite} from 'src/sharedTypes';

type MemberStore = {
  fetchMyProfile: () => Promise<void>;
  myProfile:
    | (Member & {
        teamInvites: TeamInvite[] | undefined;
      })
    | undefined;
  myBountyWins: (Submission & {bounty: Bounty; team: Team}[]) | undefined;
};

const useMemberStore = create<MemberStore>((set, get) => ({
  fetchMyProfile: async () => {
    set(() => ({myProfile: undefined}));
    set(() => ({myBountyWins: undefined}));

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_MY_PROFILE),
    );

    if (result) {
      const data = result as Member & {
        teamInvites: TeamInvite[];
      };
      set(() => ({myProfile: data}));

      const {result: resultMyBountyWins, error: errorMyBountyWins} =
        await query(getServerEndpoint(Endpoints.GET_MY_BOUNTY_WINS));

      if (!!resultMyBountyWins && typeof resultMyBountyWins === 'object') {
        set(() => ({myBountyWins: resultMyBountyWins}));
      }
    }

    return;
  },
  myProfile: undefined,
  myBountyWins: undefined,
}));

export default useMemberStore;
