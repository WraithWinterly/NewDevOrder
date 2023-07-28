import {SERVER_URL, TEST_SERVER_URL, USE_LOCAL_SERVER} from '@env';

export enum Endpoints {
  ALIVE = 'alive',
}

export function getServerEndpoint(endpoint: Endpoints) {
  console.log(getServerURL());
  return `${getServerURL()}/${endpoint}`;
}

function getServerURL() {
  if (USE_LOCAL_SERVER === 'true') {
    return TEST_SERVER_URL;
  }
  return SERVER_URL;
}
