import {create} from 'zustand';

import {Endpoints, getServerEndpoint} from 'src/utils/server';

import {Bounty, Member, Project} from 'prisma/generated';
import {CreateProjectPOSTData} from 'src/sharedTypes';
import query from 'src/utils/query';

type ProjectsStore = {
  createProjectData: CreateProjectPOSTData | undefined;
  setCreateProjectData: (data: CreateProjectPOSTData | undefined) => void;
  projects: Project[] | undefined;
  fetchProjects: () => Promise<void>;
  selectedProject?: Project & {
    founder: Member;
  };
  setSelectedProject: (fetchId: string | undefined) => Promise<void>;
  bountiesById: Bounty[] | undefined;
};

const useProjectsStore = create<ProjectsStore>((set, get) => ({
  createProjectData: undefined,
  setCreateProjectData: data => {
    set(() => ({createProjectData: data}));
  },

  projects: [],
  selectedProject: undefined,
  fetchProjects: async () => {
    set(() => ({projects: []}));

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_PROJECTS),
    );

    if (result) {
      const data = result as Project[];
      set(() => ({projects: data}));
    }
  },
  setSelectedProject: async (fetchId: string | undefined) => {
    if (!fetchId) {
      set(() => ({selectedProject: undefined}));
      set(() => ({bountiesById: undefined}));
      return;
    }
    set(() => ({selectedProject: undefined}));
    set(() => ({
      bountiesById: undefined,
    }));

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

      set(() => ({selectedProject: data}));
      set(() => ({
        bountiesById: resultBounties,
      }));
    }
  },

  bountiesById: undefined,
}));

export default useProjectsStore;
