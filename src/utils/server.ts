import {SERVER_URL, TEST_SERVER_URL, USE_LOCAL_SERVER} from '@env';

export enum Endpoints {
  ALIVE = '/alive',
  SEED = '/seed',
  CREATE_PROFILE = '/create-profile',
  GET_MEMBER_BY_WALLET_ADDRESS = '/get-member-by-wallet-address',
  GET_MEMBERS_BY_WALLET_ADDRESSES = '/get-members-by-wallet-addresses',
  GET_BOUNTIES = '/get-bounties',
  GET_TEAMS = '/get-teams',
  CREATE_TEAM = '/create-team',
  GET_PROJECTS = '/get-projects',
  CREATE_PROPOSAL = '/create-proposal',
  BOUNTYMGR_SET_QUOTE_PRICE = '/bountymgr-set-quote-price',
  BOUNTYMGR_DECLINE = '/bountymgr-decline',
  GET_INBOX = '/get-inbox',
  GET_BOUNTIES_FOR_PROJECT = '/get-bounties-for-project',
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
