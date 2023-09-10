import {create} from 'zustand';

type NFT = {
  id: string;
  project: string;
  name: string;
};
const NFTs: NFT[] = [
  // {
  //   id: '1',
  //   project: 'Avalanche',
  //   name: 'Front-End Cross-Platform NFT yup yup yup yup yup ',
  // },
  // {
  //   id: '2',
  //   project: 'Solana',
  //   name: 'Solana NFT',
  // },
  // {
  //   id: '3',
  //   project: 'Solana',
  //   name: 'Solana NFT',
  // },
];

type WalletStore = {
  nfts: NFT[] | undefined;
  nftById: NFT | undefined;
  fetchNFTs: () => void;
  setNFTId: (id: string) => void;
  walletConnectError: string;
  setWalletConnectError: (error: string) => void;
};

const useWalletStore = create<WalletStore>(set => ({
  nfts: [],
  nftById: undefined,
  walletConnectError: '',
  setWalletConnectError: error => set(() => ({walletConnectError: error})),
  team: '',

  fetchNFTs: () => {
    set({nfts: NFTs});
  },
  setNFTId: (id: string) => {
    // fetch
    set({nftById: NFTs[Number(id) - 1]});
  },
}));

export default useWalletStore;
