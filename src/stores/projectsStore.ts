import {create} from 'zustand';
import {Bounty} from './bountyStore';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import axios from 'axios';

export type Project = {
  id: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  bountyIDs: string[];
  quotePrice: number;
  stage:
    | 'WaitingBountyMgrQuote'
    | 'WaitingFounderPay'
    | 'WaitingBountyDesign'
    | 'Declined'
    | 'Ready';
};

type CreateProjectData = {
  title: string;
  description: string;
  email: string;
  phone: string;
};

type ProjectsStore = {
  createProjectData: CreateProjectData | undefined;
  setCreateProjectData: (data: CreateProjectData | undefined) => void;
  isCreateProjectValid: (data: CreateProjectData) => boolean;
  projects: Project[] | undefined;
  finalizeCreateProject: () => void;
  fetchProjects: () => Promise<void>;
  selectedProject?: Project;
  setSelectedProject: (fetchId: string) => Promise<void>;
  bountiesById: Bounty[] | undefined;
  founderSetQuotePrice: (price: number) => void;
  founderDecline: () => void;
};

const useProjectsStore = create<ProjectsStore>((set, get) => ({
  createProjectData: undefined,
  setCreateProjectData: data => {
    set(() => ({createProjectData: data}));
  },
  isCreateProjectValid: (data: CreateProjectData) => {
    // sample validation
    if (data.title.trim().length < 3) return false;
    if (data.description.trim().length < 3) return false;
    if (data.email.trim().length < 3) return false;
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!emailReg.test(data.email)) return false;
    if (data.phone.trim().length < 10) return false;

    return true;
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
  founderSetQuotePrice: (price: number) => {
    const dict = get().selectedProject;
    if (dict) {
      dict.quotePrice = price;
      set(() => ({selectedProject: dict}));
    }
    //@ts-expect-error This works ... Won't be used when actual fetching is implemented anyways
    set(() => ({
      projects: [
        ...get().projects!.map(p => {
          if (p.id === get().selectedProject!.id) {
            return {
              ...p,
              stage: 'WaitingBountyDesign',
            };
          }
          return p;
        }),
      ],
    }));
  },
  founderDecline: () => {
    if (get().selectedProject) {
      // console.log('dec2');
      set(() => ({
        selectedProject: {
          ...get().selectedProject!,
          stage: 'Declined',
        },
      }));
      //@ts-expect-error This works ... Won't be used when actual fetching is implemented anyways
      set(() => ({
        projects: [
          ...get().projects!.map(p => {
            if (p.id === get().selectedProject!.id) {
              return {
                ...p,
                stage: 'Declined',
              };
            }
            return p;
          }),
        ],
      }));
    }
  },
}));

export default useProjectsStore;
