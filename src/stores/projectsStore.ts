import {create} from 'zustand';
import {Bounty} from './bountyStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import axios from 'axios';
import {CreateProjectData, Project} from 'src/sharedTypes';

type ProjectsStore = {
  createProjectData: CreateProjectData | undefined;
  setCreateProjectData: (data: CreateProjectData | undefined) => void;
  projects: Project[] | undefined;
  finalizeCreateProject: () => void;
  fetchProjects: () => Promise<void>;
  selectedProject?: Project;
  setSelectedProject: (fetchId: string) => Promise<void>;
  bountiesById: Bounty[] | undefined;
};

const useProjectsStore = create<ProjectsStore>((set, get) => ({
  createProjectData: undefined,
  setCreateProjectData: data => {
    set(() => ({createProjectData: data}));
  },

  projects: [],
  finalizeCreateProject: () => {
    set(state => ({
      projects: [
        {
          ...state.createProjectData!,
          id: String(state.projects!.length + 1),
          accepted: false,
          stage: 'WaitingBountyMgrQuote',
          bountyIDs: [],
          quotePrice: 0,
        },
        ...state.projects!,
      ],
    }));
  },
  selectedProject: undefined,
  fetchProjects: async () => {
    set(() => ({projects: []}));
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_PROJECTS));
    set(() => ({projects: data}));
  },
  setSelectedProject: async (fetchId: string) => {
    set(() => ({selectedProject: undefined}));
    set(() => ({
      bountiesById: undefined,
    }));
    // Find project from loaded projects list
    const data = get().projects?.find(p => p.id === fetchId);
    // console.log(get().projects);
    // console.log(data);

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
