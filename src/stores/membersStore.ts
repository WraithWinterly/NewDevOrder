import {Endpoints, getServerEndpoint} from '../utils/server';
import {create} from 'zustand';
import {Member, RoleType, TeamInvite} from 'prisma/generated';
import query from 'src/utils/query';

type MemberStore = {
  memberViewing: Member | undefined;
  fetchProfile: (walletAddress: string | undefined) => Promise<void>;
  fetchMyProfile: (walletAddress: string | undefined) => Promise<void>;
  myProfile:
    | (Member & {
        teamInvites: TeamInvite[] | undefined;
      })
    | undefined;
  setPlayingRole: (role: RoleType) => void;
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
  fetchMyProfile: async id => {
    set(() => ({myProfile: undefined}));

    if (typeof id === 'undefined') return;

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_MY_PROFILE) + `/${id}`,
    );

    if (result) {
      const data = result as Member & {
        teamInvites: TeamInvite[];
      };
      set(() => ({myProfile: data}));
    }

    return;
  },
  myProfile: undefined,
  setPlayingRole: (role: RoleType) => {
    set(() => ({myProfile: {...get().myProfile!, playingRole: role}}));
  },
}));

export default useMemberStore;
