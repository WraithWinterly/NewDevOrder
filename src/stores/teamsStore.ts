import axios from 'axios';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

export type Team = {
  id: string;
  title: string;
  description: string;
  memberCount: number;
  creatorID: string;
  members: string[];
  link: string;
};

type CreateTeamData = {
  title: string;
  description: string;
  link: string;
};

type TeamsStore = {
  createTeamData: CreateTeamData | undefined;
  setCreateTeamData: (data: CreateTeamData | undefined) => void;
  isCreateTeamValid: (data: CreateTeamData) => boolean;
  teams: Team[] | undefined;
  finalizeCreateTeam: () => void;
  fetchTeams: () => Promise<void>;
  selectedTeam?: Team;
  setSelectedTeam: (fetchId: string) => void;
};

const useTeamsStore = create<TeamsStore>((set, get) => ({
  createTeamData: undefined,
  setCreateTeamData: data => {
    set(() => ({createTeamData: data}));
  },
  isCreateTeamValid: (data: CreateTeamData) => {
    // sample validation
    if (data.title.trim().length < 3) return false;
    if (data.description.trim().length < 3) return false;
    if (data.link.trim().length < 3) return false;
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!linkRegex.test(data.link)) return false;
    return true;
  },
  teams: [],
  finalizeCreateTeam: () => {
    set(state => ({
      teams: [
        {
          ...state.createTeamData!,
          id: String(state.teams!.length + 1),
          // accepted: false,
          memberCount: 1,
          creatorID: '',
          members: [],
        },
        ...state.teams!,
      ],
    }));
  },
  selectedTeam: undefined,
  fetchTeams: async () => {
    set(() => ({teams: undefined}));
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_TEAMS));
    // console.log('fetch data: ', data);
    set(() => ({teams: data ?? undefined}));
  },
  setSelectedTeam: (fetchId: string) => {
    // console.log(fetchId);
    const data = get().teams?.find(team => team.id == fetchId);
    set(() => ({selectedTeam: data}));
  },
}));

export default useTeamsStore;
