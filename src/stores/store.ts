import {create} from 'zustand';

type AppStore = {
  team: string;
  allTeams: string[];
  setTeam: (team: string) => void;
  allProjects: string[];
  project: string;
  setProject: (project: string) => void;
  isFounder: boolean;
  setIsFounder: (isFounder: boolean) => void;
};

const useAppStore = create<AppStore>(set => ({
  team: 'Avalanche',
  allTeams: [
    'Avalanche',
    'Solana',
    'Ethereum',
    'Polkadot',
    'Binance Smart Chain',
  ],
  setTeam: team => set(() => ({team})),
  allProjects: ['Core', 'BountiesDestroyer', 'Minter', 'WalletDominator'],
  project: 'Core',
  setProject: project => set(() => ({project})),
  isFounder: false,
  setIsFounder: isFounder => set(() => ({isFounder})),
}));

export default useAppStore;
