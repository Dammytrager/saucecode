import { IAppState } from './interfaces';
import {CHANGE_ROUTE, CHANGE_SIDEBAR, CHANGE_SIGNED_IN, CHANGE_USER} from './actions';

export const INITIAL_STATE: IAppState = {
  route: '',
  sidebar: 'collapsed',
  signedIn: false,
  user: {}
};
export function reducerApp(state, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return Object.assign({}, state, {
        route: action.route
      });
    case CHANGE_SIDEBAR:
      return Object.assign({}, state, {
        sidebar: action.sidebar
      });
    case CHANGE_SIGNED_IN:
      return Object.assign({}, state, {
        signedIn: action.signedIn
      });
    case CHANGE_USER:
      return Object.assign({}, state, {
        user: action.user
      });
  }
  return state;
}
