import axios from 'axios';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';
import {Member} from './membersStore';

type BountyStore = {
  bounties: Bounty[] | undefined;
  fetchBounties: () => Promise<void>;
  selectedBounty?: Bounty;
  setSelectedBounty: (fetchId: string) => void;
};

export type Bounty = {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  projectName: string;
  projectId: string;
  type: 'Frontend' | 'Backend' | 'Fullstack' | 'Web3';
  reward: number;
  deadline: Date;
  teamCount: number;
  youJoined: boolean;
  stage: 'Active' | 'Draft' | 'Completed' | 'ReadyForTests';
  submissions?: string[];
  aboutProject?: string;
  headerSections?: {[key: string]: string[]};
  founder?: Member;
};

const useBountyStore = create<BountyStore>((set, get) => ({
  bounties: [],
  selectedBounty: undefined,
  fetchBounties: async () => {
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_BOUNTIES));
    // console.log('fetch data: ', data);
    set(() => ({bounties: data}));
  },
  setSelectedBounty: (fetchId: string) => {
    const bounty = get().bounties?.find(bounty => bounty.id == fetchId);
    set(() => ({selectedBounty: bounty}));
  },
}));

export default useBountyStore;
