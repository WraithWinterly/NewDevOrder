import {
  Bounty,
  CreateBountyData,
  Member,
  Project,
  Submission,
  Team,
} from 'src/sharedTypes';
import query from 'src/utils/query';

import {Endpoints, getServerEndpoint} from 'src/utils/server';
import {create} from 'zustand';

type BountyStore = {
  createBountyData: CreateBountyData | undefined;
  setCreateBountyData: (data: CreateBountyData | undefined) => void;
  bounties: (Bounty & {project: Project})[] | undefined;
  fetchBounties: () => Promise<void>;
  selectedBounty?: Bounty & {
    project: Project;
    founder: Member;
    submissions: (Submission & {team: Team})[] | undefined;
    winningSubmission: (Submission & {team: Team}) | undefined;
  };
  setSelectedBounty: (fetchId: string | undefined) => void;
  selectedSubmission: (Submission & {team: {name: string}}) | undefined;
  setSelectedSubmission: (fetchId: string | undefined) => void;
};

const useBountyStore = create<BountyStore>((set, get) => ({
  createBountyData: undefined,
  setCreateBountyData: async (data: CreateBountyData | undefined) => {
    set(() => ({createBountyData: data}));
  },
  bounties: [],
  selectedBounty: undefined,
  selectedBountyWinner: undefined,
  fetchBounties: async () => {
    set(() => ({bounties: undefined}));

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_BOUNTIES),
    );

    if (result) {
      set(() => ({bounties: result}));
    }
  },
  setSelectedBounty: async (fetchId: string | undefined) => {
    set(() => ({selectedBounty: undefined}));
    set(() => ({selectedSubmission: undefined}));
    if (!fetchId) {
      return;
    }

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_BOUNTY_BY_ID) + `/${fetchId}`,
    );

    if (result) {
      const data = result as Bounty & {
        project: Project;
        founder: Member;
        submissions: (Submission & {team: Team})[] | undefined;
        winningSubmission: (Submission & {team: Team}) | undefined;
      };
      set(() => ({selectedBounty: data}));
      const {result: resWinner, error: errorWinner} = await query(
        getServerEndpoint(Endpoints.GET_WINNER_BY_BOUNTY_ID) + `/${fetchId}`,
      );
      if (resWinner) {
        set(() => ({selectedSubmission: resWinner}));
      }
    }
  },
  selectedSubmission: undefined,
  setSelectedSubmission: async (fetchId: string | undefined) => {
    set(() => ({selectedSubmission: undefined}));
    if (!fetchId) {
      return;
    }

    const {result, error} = await query(
      getServerEndpoint(Endpoints.GET_SUBMISSION_BY_ID) + `/${fetchId}`,
    );

    if (result) {
      set(() => ({selectedSubmission: result}));
    }
  },
}));

export default useBountyStore;
