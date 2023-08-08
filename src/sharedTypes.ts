// Please do not import stuff into this file. It is shared between the client and server.
// Only edit this file in the client repository, then copy into the server repository to avoid sync issues.

import {BountyType, RoleType, TestCase} from 'prisma/generated';

// For POST Requests
export type CreateProfilePOSTData = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  walletAddress: string;
};
export type BountyMgrSetQuotePricePOSTData = {
  quotePrice: number;
  projectID: string;
};

export type BountyMgrDeclineProjectPOSTData = {
  projectID: string;
};

export type CreateTeamPOSTData = {
  name: string;
  description: string;
  link: string;
  memberAddressesToInvite: string[];
  creatorAddress: string;
};

export type CreateProposalPOSTData = {
  title: string;
  description: string;
  email: string;
  phone: string;
  walletAddress: string;
};

export type InviteToTeamPOSTData = {
  fromAddress: string;
  toAddress: string;
  toTeam: string;
};
export type JoinTeamPOSTData = {
  fromAddress: string;
  toTeamID: string;
};

export type CreateBountyData = {
  title: string;
  description: string;
  about: string;
  amount: number;
  projectID: string;
  startDate: Date;
  deadline: Date;
  types: BountyType[];
  headerSections: {[x: string]: string[]};
};
export type ChangeRolePOSTData = {
  role: RoleType;
  walletAddress: string;
};

export type CreateBountyPostData = {
  bounty: CreateBountyData;
  draft: boolean;
  walletAddress: string;
};
export type SubmitDraftBountyPostData = {
  bountyID: string;
  walletAddress: string;
};
export type SetApproveBountyPostData = {
  bountyID: string;
  walletAddress: string;
  approve: boolean;
};
export type SubmitDeliverablesPostData = {
  bountyID: string;
  teamID: string;
  walletAddress: string;
  videoDemo: string;
  repo: string;
};
export type SelectWinningSubmissionPostData = {
  submissionID: string;
  walletAddress: string;
};
export type ApproveDisapproveBountyWinnerPostData = {
  submissionID: string;
  walletAddress: string;
  approve: boolean;
};
export type ApproveTestCasePostData = {
  submissionID: string;
  walletAddress: string;
  testCases: TestCase[];
};
export type SetTestCasesPostData = {
  bountyID: string;
  walletAddress: string;
  testCases: string[];
};

export type StartBountyPOSTData = {
  address: string;
  forTeam: string;
  bountyID: string;
};

export type FounderConfirmPayPostData = {
  projectID: string;
  walletAddress: string;
};

// END For POST Requests
