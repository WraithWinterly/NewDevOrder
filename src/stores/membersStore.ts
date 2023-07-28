import axios from 'axios';
import {Endpoints, getServerEndpoint} from '../utils/server';
import {create} from 'zustand';
import {Member, Role, RoleDict, RoleType} from 'src/sharedTypes';

export function GetRole(string: RoleType) {
  return RoleDict.find(role => role.title == string)!;
}

type MemberStore = {
  memberViewing: Member | undefined;
  fetchProfile: (
    walletAddress: string | undefined,
    isMyProfile?: boolean,
  ) => Promise<void>;
  myProfile: Member | undefined;
  setPlayingRole: (role: Role) => void;
};

const useMemberStore = create<MemberStore>((set, get) => ({
  memberViewing: undefined,
  fetchProfile: async (id, isMyProfile) => {
    set(() => ({memberViewing: undefined}));
    if (typeof id === 'undefined') return;
    const {data} = await axios.get(
      getServerEndpoint(Endpoints.GET_MEMBER_BY_WALLET_ADDRESS) + `/${id}`,
    );
    if (isMyProfile) {
      set(() => ({myProfile: data}));
      return;
    }
    set(() => ({memberViewing: data}));
  },
  myProfile: undefined,
  setPlayingRole: (role: Role) => {
    set(() => ({myProfile: {...get().myProfile!, playingRole: role}}));
  },
}));

export default useMemberStore;
