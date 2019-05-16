import { IAppState } from './interfaces';
import {CHANGE_ROUTE, CHANGE_SIDEBAR} from './actions';

export const INITIAL_STATE: IAppState = {
  route: '',
  sidebar: 'collapsed'
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
  }
  return state;
}
