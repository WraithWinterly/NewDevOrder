import {create} from 'zustand';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import axios from 'axios';

import {Bounty, Member, Project} from 'prisma/generated';
import {CreateProjectPOSTData} from 'src/sharedTypes';

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
    const fetch = await axios.get(
      getServerEndpoint(Endpoints.GET_PROJECT_BY_ID) + `/${fetchId}`,
    );
    const data = fetch.data as Project & {
      founder: Member;
    };

    if (!data) {
      console.error('Project not found');
      return;
    }
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
