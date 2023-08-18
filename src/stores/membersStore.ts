import {Endpoints, getServerEndpoint} from '../utils/server';
import {create} from 'zustand';

import query from 'src/utils/query';
import {
  Bounty,
  BountyWinner,
  Member,
  Submission,
  Team,
  TeamInvite,
} from 'src/sharedTypes';

type MemberStore = {
  memberViewing: Member | undefined;
  fetchProfile: (walletAddress: string | undefined) => Promise<void>;
  fetchMyProfile: () => Promise<void>;
  myProfile:
    | (Member & {
        teamInvites: TeamInvite[] | undefined;
      })
    | undefined;
  myBountyWins:
    | (BountyWinner & {submission: Submission & {bounty: Bounty; team: Team}})[]
    | undefined;
};

const useMemberStore = create<MemberStore>((set, get) => ({
  memberViewing: undefined,
  fetchProfile: async id => {
    set(() => ({memberViewing: undefined}));

    if (typeof id === 'undefined') return;

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) + `/${id}`,
    );
    if (result) {
      const data = result as Member;
      set(() => ({memberViewing: data}));
    }
  },
  fetchMyProfile: async () => {
    set(() => ({myProfile: undefined}));

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

      if (!!resultMyBountyWins) {
        set(() => ({myBountyWins: resultMyBountyWins}));
      }
    }

    return;
  },
  myProfile: undefined,
  myBountyWins: undefined,
}));

export default useMemberStore;
