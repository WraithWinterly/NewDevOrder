import {create} from 'zustand';

export type MintTypes =
  | 'Bounty Hunter'
  | 'Founder'
  | 'Bounty Manager'
  | 'Bounty Designer'
  | 'Bounty Validator';

type MintStore = {
  nftToMint: MintTypes;
  setNftToMint: (string: MintTypes) => void;
};

const useMintStore = create<MintStore>(set => ({
  nftToMint: 'Bounty Hunter',
  setNftToMint: string => {
    set({nftToMint: string});
  },
}));

export default useMintStore;
