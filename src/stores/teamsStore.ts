import {create} from 'zustand';
import {Member, SAMPLE_MEMBERS} from './membersStore';

type Team = {
  id: string;
  title: string;
  description: string;
  memberCount: number;
  createdByYou: boolean;
};

type FullTeam = Team & {
  members: Member[];
  link: string;
};

const SAMPLE_TEAMS: Team[] = [
  {
    id: '1',
    title: 'Team Solsitce',
    description: 'lorem20',
    memberCount: 2,
    createdByYou: true,
  },
  {
    id: '2',
    title: 'Team Compete!!!',
    description: 'lorem20',
    memberCount: 4,
    createdByYou: false,
  },
];

const SAMPLE_FULL_TEAMS: FullTeam[] = [
  {
    ...SAMPLE_TEAMS[0],
    members: [SAMPLE_MEMBERS[0], SAMPLE_MEMBERS[1]],
    link: 'https://aydens.net',
  },
  {
    ...SAMPLE_TEAMS[1],
    members: [SAMPLE_MEMBERS[2], SAMPLE_MEMBERS[3]],
    link: 'https://aydens.net',
  },
];

type CreateTeamData = {
  title: string;
  description: string;
  link: string;
};

type TeamsStore = {
  createTeamData: CreateTeamData | undefined;
  setCreateTeamData: (data: CreateTeamData | undefined) => void;
  isCreateTeamValid: (data: CreateTeamData) => boolean;
  teams: Team[] | undefined;
  fetchTeams: () => Promise<void>;
  selectedTeam?: FullTeam;
  setSelectedTeam: (fetchId: string) => void;
};

const useTeamsStore = create<TeamsStore>(set => ({
  createTeamData: undefined,
  setCreateTeamData: data => {
    set(() => ({createTeamData: data}));
  },
  isCreateTeamValid: (data: CreateTeamData) => {
    // sample validation
    if (data.title.trim().length < 3) return false;
    if (data.description.trim().length < 3) return false;
    if (data.link.trim().length < 3) return false;
    const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    if (!linkRegex.test(data.link)) return false;
    return true;
  },
  teams: SAMPLE_FULL_TEAMS,
  selectedTeam: undefined,
  fetchTeams: async () => {
    // sample fetch
    const data = SAMPLE_FULL_TEAMS;
    set(() => ({teams: data}));
  },
  setSelectedTeam: (fetchId: string) => {
    // sample fetch
    console.log(fetchId);
    const data = SAMPLE_FULL_TEAMS[Number(fetchId) - 1];
    set(() => ({selectedTeam: data}));
  },
}));

export default useTeamsStore;
