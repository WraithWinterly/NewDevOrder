import axios from 'axios';
import {Bounty, Member} from 'src/sharedTypes';
import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type BountyStore = {
  bounties: Bounty[] | undefined;
  fetchBounties: () => Promise<void>;
  selectedBounty?: Bounty;
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
  setSelectedBounty: (fetchId: string | undefined) => {
    if (!fetchId) {
      set(() => ({selectedBounty: undefined}));
      return;
    }
    const bounty = get().bounties?.find(bounty => bounty.id == fetchId);
    set(() => ({selectedBounty: bounty}));
  },
}));

export default useBountyStore;
