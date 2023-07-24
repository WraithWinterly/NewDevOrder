import {create} from 'zustand';

export type Project = {
  id: string;
  title: string;
  description: string;
  accepted: boolean;
};

type FullProject = Project & {
  email: string;
  phone: string;
};

export const SAMPLE_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Project Avalanche',
    description: 'lorem10',
    accepted: true,
  },
  {
    id: '2',
    title: 'Project DOOM',
    description: 'lorem20',
    accepted: false,
  },
];

const SAMPLE_FULL_PROJECTS: FullProject[] = [
  {
    ...SAMPLE_PROJECTS[0],
    email: 'test@test.com',
    phone: '+11234567890',
  },
  {
    ...SAMPLE_PROJECTS[1],
    email: 'no@gmail.com',
    phone: '+12345678990',
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
  selectedProject?: FullProject;
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
  projects: SAMPLE_FULL_PROJECTS,
  finalizeCreateProject: () => {
    set(state => ({
      projects: [
        {
          ...state.createProjectData!,
          id: String(state.projects!.length + 1),
          accepted: false,
        },
        ...state.projects!,
      ],
    }));
  },
  selectedProject: undefined,
  fetchProjects: async () => {
    // sample fetch
    const data = SAMPLE_FULL_PROJECTS;
    set(() => ({projects: data}));
  },
  setSelectedProject: (fetchId: string) => {
    // sample fetch
    console.log(fetchId);
    const data = SAMPLE_FULL_PROJECTS[Number(fetchId) - 1];
    set(() => ({selectedProject: data}));
  },
}));

export default useProjectsStore;
