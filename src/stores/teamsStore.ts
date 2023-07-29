import axios from 'axios';
import {CreateTeam, Member, Team} from 'src/sharedTypes';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type TeamsStore = {
  createTeamData: CreateTeam | undefined;
  setCreateTeamData: (data: CreateTeam | undefined) => void;
  isCreateTeamValid: (data: CreateTeam) => boolean;
  teams: Team[] | undefined;
  finalizeCreateTeam: () => void;
  fetchTeams: () => Promise<void>;
  selectedTeam?: Team;
  setSelectedTeam: (fetchId: string) => void;
  selectedTeamMembers: Member[] | undefined;
};

const useTeamsStore = create<TeamsStore>((set, get) => ({
  createTeamData: undefined,
  setCreateTeamData: data => {
    set(() => ({createTeamData: data}));
  },
  isCreateTeamValid: (data: CreateTeam) => {
    // sample validation
    if (data.name.trim().length < 3) return false;
    if (data.description.trim().length < 3) return false;
    if (data.link.trim().length < 3) return false;
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!linkRegex.test(data.link)) return false;
    return true;
  },
  teams: [],
  finalizeCreateTeam: () => {
    // set(state => ({
    //   teams: [
    //     {
    //       ...state.createTeamData!,
    //       id: String(state.teams!.length + 1),
    //       // accepted: false,
    //       creatorID: '',
    //       members: [],
    //       creatorAddress: '',
    //     },
    //     ...state.teams!,
    //   ],
    // }));
  },
  selectedTeam: undefined,
  fetchTeams: async () => {
    set(() => ({teams: undefined}));
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_TEAMS));
    // console.log('fetch data: ', data);
    set(() => ({teams: data ?? undefined}));
  },
  setSelectedTeam: async (fetchId: string) => {
    // console.log(fetchId);
    const data = get().teams?.find(team => team.id == fetchId);

    // console.log('sdf');
    console.log(getServerEndpoint(Endpoints.GET_MEMBERS_BY_WALLET_ADDRESSES));
    const {data: teamMembers} = await axios.post(
      getServerEndpoint(Endpoints.GET_MEMBERS_BY_WALLET_ADDRESSES),
      {
        addresses: data?.members || [],
      },
    );
    set(() => ({selectedTeam: data}));
    set(() => ({selectedTeamMembers: teamMembers}));
  },
  selectedTeamMembers: [],
}));

export default useTeamsStore;
