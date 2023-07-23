export type FullBounty = Bounty & {
  submissions: string[];
  aboutProject: string;
  recentActivity: string;
  questions: string[];
  headerSections: {[key: string]: string[]};

  founder: {
    name: string;
    tag: string;
    bio: string;
  };
};

export type Bounty = {
  id: string;
  title: string;
  description: string;
  postDate: Date;
  projectName: string;
  active: boolean;
  type: 'Frontend' | 'Backend' | 'Fullstack' | 'Web3';
  reward: number;
  deadline: Date;
  teamCount: number;
  youJoined: boolean;
};
