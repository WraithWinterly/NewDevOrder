import {create} from 'zustand';
import {Bounty, SAMPLE_BOUNTIES} from './bountyStore';

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

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '0',
    title: 'Avalanche',
    description: 'lorem10',
    stage: 'WaitingBountyMgrQuote',
    email: 'test@gmail.com',
    phone: '(207) 444-4444',
    quotePrice: 5_5000,
    bountyIDs: ['0', '1', '2', '3'],
  },
  {
    id: '1',
    title: 'Booster',
    description: 'lorem10',
    stage: 'WaitingBountyMgrQuote',
    email: '',
    phone: '',
    quotePrice: 6_000,
    bountyIDs: [],
  },
  {
    id: '2',
    title: 'Treasure',
    description: 'lorem10',
    stage: 'WaitingBountyMgrQuote',
    email: '',
    phone: '',
    quotePrice: 5_000,
    bountyIDs: [],
  },
];

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
  projects: SAMPLE_PROJECTS,
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
    // sample fetch
    const data = SAMPLE_PROJECTS;
    set(() => ({projects: data}));
  },
  setSelectedProject: async (fetchId: string) => {
    set(() => ({selectedProject: undefined}));
    set(() => ({
      bountiesById: undefined,
    }));
    // sample fetch
    // console.log(fetchId);
    setTimeout(() => {
      console.log(SAMPLE_PROJECTS[Number(fetchId)]);
      const data = SAMPLE_PROJECTS[Number(fetchId)];
      set(() => ({selectedProject: data}));
      set(() => ({
        bountiesById: SAMPLE_BOUNTIES.filter(bounty =>
          data.bountyIDs.includes(bounty.id),
        ),
      }));
    }, 500);
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
      console.log('dec2');
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
