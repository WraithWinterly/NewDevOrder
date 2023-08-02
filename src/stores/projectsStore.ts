import {create} from 'zustand';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import axios from 'axios';
import {CreateProjectDataPOSTData} from 'src/sharedTypes';
import {Bounty, Project} from 'prisma/generated';

type ProjectsStore = {
  createProjectData: CreateProjectDataPOSTData | undefined;
  setCreateProjectData: (data: CreateProjectDataPOSTData | undefined) => void;
  projects: Project[] | undefined;
  fetchProjects: () => Promise<void>;
  selectedProject?: Project;
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
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_PROJECTS));
    console.log(data);
    set(() => ({projects: data}));
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
    // Find project from loaded projects list
    const data = get().projects?.find(p => p.id === fetchId);

    // When a project is selected, load the bounty(s) information for the project
    const idData = (await axios.get(
      getServerEndpoint(Endpoints.GET_BOUNTIES_FOR_PROJECT) + `/${data?.id}`,
    )) as {data: Bounty[] | undefined};
    // console.log('idData: : ', idData);
    set(() => ({selectedProject: data}));
    set(() => ({
      bountiesById: idData.data,
    }));
  },

  bountiesById: undefined,
}));

export default useProjectsStore;
