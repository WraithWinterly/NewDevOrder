import {create} from 'zustand';

type AppStore = {
  allProjects: string[];
  project: string;
  setProject: (project: string) => void;
  isFounder: boolean;
  setIsFounder: (isFounder: boolean) => void;
};

const useAppStore = create<AppStore>(set => ({
  allProjects: ['Core', 'BountiesDestroyer', 'Minter', 'WalletDominator'],
  project: 'Core',
  setProject: project => set(() => ({project})),
  isFounder: false,
  setIsFounder: isFounder => set(() => ({isFounder})),
}));

export default useAppStore;
