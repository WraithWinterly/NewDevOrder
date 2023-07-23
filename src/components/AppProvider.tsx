import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import {FullBounty} from 'src/types/types';

// Define the context type
type AppContextType = {
  team: string;
  allTeams: string[];
  setTeam: (team: string) => void;
  allProjects: string[];
  project: string;
  setProject: (project: string) => void;
  viewBountyId: string;
  setViewBountyId: (viewBountyId: string) => void;
  selectedFullBounty?: FullBounty;
  setSelectedFullBounty: (selectedFullBounty: FullBounty) => void;
  isFounder: boolean;
};

// Create the context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a custom hook for accessing the context
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

// Create the AppProvider component
export function AppProvider({children}: {children: ReactNode}) {
  const [team, setTeam] = useState<string>('');
  const [project, setProject] = useState<string>('');
  const [allTeams, setAllTeams] = useState<string[]>([]);
  const [allProjects, setAllProjects] = useState<string[]>([]);
  const [selectedFullBounty, setSelectedFullBounty] = useState<FullBounty>();
  const [isFounder, setIsFounder] = useState<boolean>(false);
  useEffect(() => {
    setAllTeams(['Team 1', 'Team 2', 'Team 3']);
    setAllProjects(['Project 1', 'Project 2', 'Project 3']);
    setTeam('Team 1');
    setProject('Project 1');
    // Do something...
    setIsFounder(true);
  }, []);

  const [viewBountyId, setViewBountyId] = useState<string>('');

  const appContextValue: AppContextType = {
    team,
    allTeams,
    setTeam,
    allProjects,
    project,
    setProject,
    viewBountyId,
    setViewBountyId,
    selectedFullBounty,
    setSelectedFullBounty,
    isFounder,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default useAppContext;
