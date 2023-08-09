import {Member, Team} from 'prisma/generated';
import {CreateTeamPOSTData} from 'src/sharedTypes';
import query from 'src/utils/query';

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
  selectedTeam?: Team & {
    members: Member[] | undefined;
  };
  setSelectedTeam: (fetchId: string | undefined) => void;
  // selectedTeamMembers: Member[] | undefined;
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

    const {result, error} = await query(getServerEndpoint(Endpoints.GET_TEAMS));
    if (result) {
      set(() => ({teams: result}));
    }
  },
  setSelectedTeam: async (fetchId: string | undefined) => {
    if (!fetchId) {
      set(() => ({selectedTeam: undefined}));
      return;
    }
    set(() => ({selectedTeam: undefined}));

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_TEAM_BY_ID) + `/${fetchId}`,
    );

    if (result) {
      const data = result as Team & {
        members: Member[];
      };
      set(() => ({selectedTeam: data}));
    }
  },
  selectedTeamMembers: [],
}));

export default useTeamsStore;
