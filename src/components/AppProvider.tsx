import React, {ReactNode, createContext, useContext, useState} from 'react';

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

  const [viewBountyId, setViewBountyId] = useState<string>('');

  const appContextValue: AppContextType = {
    team,
    allTeams: ['Team 1', 'Team 2', 'Team 3'],
    setTeam,
    allProjects: ['Project 1', 'Project 2', 'Project 3'],
    project,
    setProject,
    viewBountyId,
    setViewBountyId,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
}

export default useAppContext;
