import axios from 'axios';
import {Member, Team} from 'prisma/generated';
import {CreateTeamPOSTData} from 'src/sharedTypes';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type TeamsStore = {
  createTeamData: CreateTeamPOSTData | undefined;
  setCreateTeamData: (data: CreateTeamPOSTData | undefined) => void;
  isCreateTeamValid: (data: CreateTeamPOSTData) => boolean;
  teams:
    | (Team & {
        members: Member[] | undefined;
      })[]
    | undefined;
  fetchTeams: () => Promise<void>;
  selectedTeam?: Team;
  setSelectedTeam: (fetchId: string | undefined) => void;
  selectedTeamMembers: Member[] | undefined;
};

const useTeamsStore = create<TeamsStore>((set, get) => ({
  createTeamData: undefined,
  setCreateTeamData: data => {
    set(() => ({createTeamData: data}));
  },
  isCreateTeamValid: (data: CreateTeamPOSTData) => {
    // sample validation
    if (data.name.trim().length < 3) return false;
    if (data.description.trim().length < 3) return false;
    if (data.link.trim().length < 3) return false;
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!linkRegex.test(data.link)) return false;
    return true;
  },
  teams: [],
  selectedTeam: undefined,
  fetchTeams: async () => {
    set(() => ({teams: undefined}));
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_TEAMS));
    // console.log('fetch data: ', data);
    set(() => ({teams: data ?? undefined}));
  },
  setSelectedTeam: async (fetchId: string | undefined) => {
    if (!fetchId) {
      set(() => ({selectedTeam: undefined}));
      set(() => ({selectedTeamMembers: undefined}));
      return;
    }
    // console.log(fetchId);
    const data = get().teams?.find(team => team.id == fetchId);

    // console.log('sdf');
    console.log(getServerEndpoint(Endpoints.GET_MEMBERS_BY_WALLET_ADDRESSES));
    const walletAddresses = data?.members?.map(member => member.walletAddress);
    const {data: teamMembers} = await axios.post(
      getServerEndpoint(Endpoints.GET_MEMBERS_BY_WALLET_ADDRESSES),
      {
        addresses: walletAddresses || [],
      },
    );
    set(() => ({selectedTeam: data}));
    set(() => ({selectedTeamMembers: teamMembers}));
  },
  selectedTeamMembers: [],
}));

export default useTeamsStore;
