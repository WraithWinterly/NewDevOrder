import {RoleType} from 'src/sharedTypes';
import {create} from 'zustand';

type MintStore = {
  nftToMint: RoleType;
  setNftToMint: (string: RoleType) => void;
};

const useMintStore = create<MintStore>(set => ({
  nftToMint: 'Bounty Hunter',
  setNftToMint: string => {
    set({nftToMint: string});
  },
}));

export default useMintStore;
