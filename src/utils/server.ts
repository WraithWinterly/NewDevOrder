import {SERVER_URL, TEST_SERVER_URL, USE_LOCAL_SERVER} from '@env';

export enum Endpoints {
  AUTHORIZE = '/authorize',
  REQUEST_NONCE = '/request-nonce',
  VERIFY_AUTH = '/verify-auth',
  // MISC
  ALIVE = '/alive',
  ALIVE_POST = '/alive-post',
  SEED = '/seed',

  GET_INBOX = '/get-inbox',
  // PROFILE AND MEMBERS
  CREATE_PROFILE = '/create-profile',
  GET_MEMBER_BY_WALLET_ADDRESS = '/get-member-by-wallet-address',
  GET_MEMBERS_BY_USERNAME = '/get-members-by-username',
  GET_MEMBERS_BY_WALLET_ADDRESSES = '/get-members-by-wallet-addresses',
  GET_MY_PROFILE = '/get-my-profile',
  CHANGE_ROLE = '/change-role',
  GET_MY_BOUNTY_WINS = '/get-my-bounty-wins',
  CONFIRM_REWARD = '/confirm-reward',
  UPDATE_MY_ROLES = '/update-my-roles',
  // LEADERBOARD
  GET_LEADERBOARD_MEMBERS = '/get-leaderboard-members',
  GET_LEADERBOARD_FOUNDERS = '/get-leaderboard-founders',
  // BOUNTIES
  GET_BOUNTIES = '/get-bounties',
  GET_BOUNTY_BY_ID = '/get-bounty-by-id',
  START_BOUNTY = '/start-bounty',
  CREATE_BOUNTY = '/create-bounty',
  SET_BOUNTY_APPROVAL = '/set-bounty-approval',
  GET_SUBMISSION = '/get-submission',
  GET_SUBMISSION_BY_ID = '/get-submission-by-id',
  SUBMIT_DELIVERABLES = '/submit-deliverables',
  APPROVE_TEST_CASES = '/approve-test-cases',
  GET_WINNER_BY_BOUNTY_ID = '/get-winner-by-bounty',
  APPROVE_DISAPPROVE_BOUNTY_WINNER = '/approve-disapprove-bounty-winner',

  // TEAMS
  GET_TEAMS = '/get-teams',
  GET_TEAM_BY_ID = '/get-team-by-id',
  GET_TEAM_PENDING_INVITES = '/get-team-pending-invites',
  CREATE_TEAM = '/create-team',
  INVITE_TO_TEAM = '/invite-to-team',
  JOIN_TEAM_FROM_INVITE = '/join-team-from-invite',
  DENY_TEAM_FROM_INVITE = '/deny-team-from-invite',
  // PROJECTS
  GET_PROJECTS = '/get-projects',
  GET_PROJECT_BY_ID = '/get-project-by-id',
  CREATE_PROPOSAL = '/create-proposal',
  BOUNTYMGR_SET_QUOTE_PRICE = '/bountymgr-set-quote-price',
  BOUNTYMGR_DECLINE = '/bountymgr-decline',
  FOUNDER_CONFIRM_PAY = '/founder-confirm-pay',
  GET_BOUNTIES_FOR_PROJECT = '/get-bounties-for-project',
  // FINANCIAL OFFICER
  FINANCIAL_OFFICER = '/get-officer-items',
  FINANCIAL_OFFICER_PROJECT_PAID = '/officer-confirm-project-paid',
  FINANCIAL_OFFICER_BOUNTY_WINNER_PAID = '/officer-confirm-bounty-winner-paid',
  GET_NOTIFICATIONS = '/get-notifications',
  REMOVE_NOTIFICATION = '/remove-notification',
}

export function getServerEndpoint(endpoint: Endpoints) {
  return `${getServerURL()}${endpoint}`;
}

function getServerURL() {
  if (USE_LOCAL_SERVER === 'true') {
    return TEST_SERVER_URL;
  }
  return SERVER_URL;
}
