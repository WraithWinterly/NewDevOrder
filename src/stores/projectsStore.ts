import {create} from 'zustand';

import {Endpoints, getServerEndpoint} from 'src/utils/server';

import {Bounty, CreateProjectPOSTData, Member, Project} from 'src/sharedTypes';
import query from 'src/utils/query';

type ProjectsStore = {
  createProposalData: CreateProjectPOSTData | undefined;
  setCreateProposalData: (data: CreateProjectPOSTData | undefined) => void;
  projects: Project[] | undefined;
  fetchProjects: () => Promise<void>;
  selectedProject?: Project & {
    founder: Member;
  };
  setSelectedProject: (fetchId: string | undefined) => Promise<void>;
  bountiesForProject:
    | (Bounty & {
        project: Project;
      })[]
    | undefined;
};

const useProjectsStore = create<ProjectsStore>((set, get) => ({
  createProposalData: undefined,
  setCreateProposalData: data => {
    set(() => ({createProposalData: data}));
  },

  projects: [],
  selectedProject: undefined,
  fetchProjects: async () => {
    set(() => ({projects: undefined}));

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_PROJECTS),
    );

    if (result) {
      const data = result as Project[];
      set(() => ({projects: data}));
    }
  },
  setSelectedProject: async (fetchId: string | undefined) => {
    set(() => ({selectedProject: undefined}));
    set(() => ({
      bountiesForProject: undefined,
    }));

    if (!fetchId) {
      return;
    }

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_PROJECT_BY_ID) + `/${fetchId}`,
    );
    if (result) {
      const data = result as Project & {
        founder: Member;
      };

      const {result: resultBounties, error: errorID} = await query(
        getServerEndpoint(Endpoints.GET_BOUNTIES_FOR_PROJECT) + `/${data?.id}`,
      );

      const dataID = resultBounties as Bounty[];

      if (dataID) {
        set(() => ({selectedProject: data}));
        set(() => ({
          bountiesForProject: resultBounties,
        }));
      }
    }
  },

  bountiesForProject: undefined,
}));

export default useProjectsStore;
