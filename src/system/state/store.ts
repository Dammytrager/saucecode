import { IAppState } from './interfaces';
import {CHANGE_ROUTE} from './actions';

export const INITIAL_STATE: IAppState = {
  route: ''
};
export function reducerApp(state, action) {
  switch (action.type) {
    case CHANGE_ROUTE:
      return Object.assign({}, state, {
        route: action.route
      });
  }
  return state;
}
