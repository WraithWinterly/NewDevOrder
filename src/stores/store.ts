import {create} from 'zustand';

type AppStore = {
  allProjects: string[];
  project: string;
  setProject: (project: string) => void;
};

const useAppStore = create<AppStore>(set => ({
  allProjects: ['Core', 'BountiesDestroyer', 'Minter', 'WalletDominator'],
  project: 'Core',
  setProject: project => set(() => ({project})),
}));

export default useAppStore;
