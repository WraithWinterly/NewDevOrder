import {CreateTeamPOSTData, Member, Team} from 'src/sharedTypes';
import query from 'src/utils/query';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type TeamsStore = {
  teams: Team[] | undefined;
  fetchTeams: () => Promise<void>;
  selectedTeam?: Team & {
    members: Member[] | undefined;
  };
  setSelectedTeam: (fetchId: string | undefined) => void;
  // selectedTeamMembers: Member[] | undefined;
};

const useTeamsStore = create<TeamsStore>((set, get) => ({
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
