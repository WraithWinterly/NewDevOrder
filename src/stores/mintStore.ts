import {Roles} from 'src/styles/types';
import {create} from 'zustand';

type MintStore = {
  nftToMint: Roles;
  setNftToMint: (string: Roles) => void;
};

const useMintStore = create<MintStore>(set => ({
  nftToMint: 'Bounty Hunter',
  setNftToMint: string => {
    set({nftToMint: string});
  },
}));

export default useMintStore;
