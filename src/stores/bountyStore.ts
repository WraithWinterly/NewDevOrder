import {create} from 'zustand';

type BountyStore = {
  bounties: Bounty[] | undefined;
  fetchBounties: () => Promise<void>;
  selectedFullBounty?: FullBounty;
  setSelectedFullBounty: (fetchId: string) => void;
};

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

export const SAMPLE_BOUNTIES: Bounty[] = [
  {
    id: '1',
    title: 'Front-End Cross-Platform Flutter Application',
    description:
      'Build working and deployable code and final software package for Front-End Cross-Platform application, built using Flutter.',
    postDate: new Date('2021-01-01'),
    projectName: 'Project 1',
    active: true,
    type: 'Frontend',
    reward: 100,
    deadline: new Date(),
    teamCount: 1,
    youJoined: true,
  },
  {
    id: '2',
    title: 'Emoji Translator',
    description:
      "Do you love emojis? We need someone to develop an emoji translator that can convert text into emojis and vice versa. Let's make communication more fun!",
    postDate: new Date('2023-07-15'),
    projectName: 'Project Emoji',
    active: true,
    type: 'Web3',
    reward: 50,
    deadline: new Date('2023-08-31'),
    teamCount: 1,
    youJoined: false,
  },
  {
    id: '3',
    title: 'Time-Traveling Website',
    description:
      'Ever wished you could go back in time? We want you to build a website that simulates time travel. Let users experience historical events as if they were there!',
    postDate: new Date('2023-07-14'),
    projectName: 'Project Time Warp',
    active: true,
    type: 'Fullstack',
    reward: 200,
    deadline: new Date('2023-12-31'),
    teamCount: 2,
    youJoined: false,
  },
  {
    id: '4',
    title: 'AI Stand-up Comedian',
    description:
      "Are you a programming genius with a great sense of humor? We're looking for someone to create an AI stand-up comedian that can crack jokes about coding and technology. Make the nerds laugh!",
    postDate: new Date('2023-07-13'),
    projectName: 'Project LOLCode',
    active: true,
    type: 'Backend',
    reward: 150,
    deadline: new Date('2024-02-28'),
    teamCount: 1,
    youJoined: false,
  },
  {
    id: '5',
    title: 'Reverse-Engineering Puzzle',
    description:
      'Calling all puzzle enthusiasts and code breakers! We have a mysterious device that needs to be reverse-engineered. Solve the puzzle and unveil its secrets!',
    postDate: new Date('2023-07-12'),
    projectName: 'Project Enigma',
    active: true,
    type: 'Web3',
    reward: 75,
    deadline: new Date('2023-10-31'),
    teamCount: 3,
    youJoined: false,
  },
];

const SAMPLE_BOUNTY: FullBounty = {
  id: '1',
  title: 'Front-End Cross-Platform Flutter Application',
  description:
    'Build working and deployable code and final software package for Front-End Cross-Platform application, built using Flutter.',
  postDate: new Date('2021-01-01'),
  projectName: 'Project 1',
  active: true,
  type: 'Frontend',
  reward: 100,
  deadline: new Date(),
  teamCount: 1,
  youJoined: true,

  submissions: ['Team Solvers', 'Team Solvers', 'Team Givers'],

  aboutProject:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur, rerum.',
  recentActivity: '3 teams started this bounty',
  questions: ['How do I get started?'],
  headerSections: {
    'Tech Stack': [
      'Flutter: A UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.',
      'https://docs.flutter.dev',
      'Dart: The programming language used by Flutter to build applications.',
      'https://dart.dev/',
      'Vercel: Vercel to deploy the application on Web. You may use a platform of your choice to deploy on web as well.',
      'https://vercel.com/',
      'Github: A web-based platform for version control and collaboration that allows developers to host and review code, manage projects, and build software alongside millions of other developers.',
      'https://github.com/',
    ],

    'Requirements Specifications': [
      'Home Page: User Info - First name... (Input, Required)',
      'Home Page: User Info - Last name... (Input, Required)',
      'Button - CTA (Button Text): Wallet Connect',
      'Result Page - Upon clicking "Wallet Connect" button, show the following, success message, opt-in CTA message.',
    ],

    'Solution Constraints': [
      'Deployable on three platforms',
      'Performance',
      'Passes all test cases on three platforms',
    ],

    'Tools to Use': [
      'use: flutter',
      'use: any IDE',
      'use: Dart, DartPad',
      'use: Best practices and recommendations from Flutter',
    ],

    Deliverables: [
      'Completed Code checked in to the repository with a unique folder name that indicates your contribution. It is the parent folder for all deliverables.',
    ],
  },

  founder: {
    name: 'Dr Whetsel',
    tag: '@drwhetsel',
    bio: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, ipsa.',
  },
};

const useBountyStore = create<BountyStore>(set => ({
  bounties: SAMPLE_BOUNTIES,
  selectedFullBounty: undefined,
  fetchBounties: async () => {
    // sample fetch
    const data = SAMPLE_BOUNTIES;
    set(() => ({bounties: data}));
  },
  setSelectedFullBounty: (fetchId: string) => {
    // sample fetch
    const data = SAMPLE_BOUNTY;
    set(() => ({selectedFullBounty: data}));
  },
}));

export default useBountyStore;
