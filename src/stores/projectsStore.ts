import {create} from 'zustand';
import {RoleType} from './membersStore';

export type Project = {
  id: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  bountyIDs: string[];
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
    email: '',
    phone: '',
    bountyIDs: [],
  },
  {
    id: '1',
    title: 'Booster',
    description: 'lorem10',
    stage: 'WaitingBountyMgrQuote',
    email: '',
    phone: '',
    bountyIDs: [],
  },
  {
    id: '2',
    title: 'Treasure',
    description: 'lorem10',
    stage: 'WaitingBountyMgrQuote',
    email: '',
    phone: '',
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
  setSelectedProject: (fetchId: string) => void;
};

const useProjectsStore = create<ProjectsStore>(set => ({
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
  setSelectedProject: (fetchId: string) => {
    // sample fetch
    // console.log(fetchId);
    console.log(SAMPLE_PROJECTS[Number(fetchId)]);
    const data = SAMPLE_PROJECTS[Number(fetchId)];
    set(() => ({selectedProject: data}));
  },
}));

export default useProjectsStore;
