import axios from 'axios';
import {Bounty, Member, Project} from 'prisma/generated';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type BountyStore = {
  bounties: (Bounty & {project: Project})[] | undefined;
  fetchBounties: () => Promise<void>;
  selectedBounty?: Bounty & {
    project: Project;
    founder: Member;
  };
  setSelectedBounty: (fetchId: string | undefined) => void;
};

const useBountyStore = create<BountyStore>((set, get) => ({
  bounties: [],
  selectedBounty: undefined,
  fetchBounties: async () => {
    set(() => ({bounties: undefined}));
    const {data} = await axios.get(getServerEndpoint(Endpoints.GET_BOUNTIES));
    // console.log('fetch data: ', data);
    set(() => ({bounties: data}));
  },
  setSelectedBounty: async (fetchId: string | undefined) => {
    console.log('SET');
    if (!fetchId) {
      set(() => ({selectedBounty: undefined}));
      return;
    }

    const {data: fetch} = await axios.get(
      getServerEndpoint(Endpoints.GET_BOUNTY_BY_ID) + `/${fetchId}`,
    );

    const data = fetch as Bounty & {
      project: Project;
      founder: Member;
    };

    set(() => ({selectedBounty: data}));
  },
}));

export default useBountyStore;
