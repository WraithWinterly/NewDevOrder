// Please do not import stuff into this file. It is shared between the client and server.
// Only edit this file in the client repository, then copy into the server repository to avoid sync issues.

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
