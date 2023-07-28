import {SERVER_URL, TEST_SERVER_URL, USE_LOCAL_SERVER} from '@env';

export enum Endpoints {
  ALIVE = '/alive',
  SEED = '/seed',
  CREATE_PROFILE = '/create-profile',
  GET_MEMBER_BY_WALLET_ADDRESS = '/get-member-by-wallet-address',
  GET_BOUNTIES = '/get-bounties',
  GET_TEAMS = '/get-teams',
  GET_PROJECTS = '/get-projects',
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
