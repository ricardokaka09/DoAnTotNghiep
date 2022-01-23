import { scopes } from './scopes';

export const roles = {
  '0': [scopes.ACCEPT_STORE],
  '1': [scopes.UPDATE_STORE, scopes.DELETE_STORE],
  '2': [scopes.READ_STORE],
};
