import axios from 'axios';
import {Endpoints, getServerEndpoint} from '../utils/server';
import {create} from 'zustand';
import {Member, RoleType, TeamInvite} from 'prisma/generated';

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

    const {data} = await axios.get(
      getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) + `/${id}`,
    );

    set(() => ({memberViewing: data}));
  },
  fetchMyProfile: async id => {
    set(() => ({myProfile: undefined}));

    if (typeof id === 'undefined') return;

    const {data} = await axios.get(
      getServerEndpoint(Endpoints.GET_MY_PROFILE) + `/${id}`,
    );

    set(() => ({myProfile: data}));
    return;
  },
  myProfile: undefined,
  setPlayingRole: (role: RoleType) => {
    set(() => ({myProfile: {...get().myProfile!, playingRole: role}}));
  },
}));

export default useMemberStore;
