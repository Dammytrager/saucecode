import { IAppState } from './interfaces';
import {CHANGE_TEXT} from './actions';

export const INITIAL_STATE: IAppState = {
  text: ''
};
export function reducerApp(state, action) {
  switch (action.type) {
    case CHANGE_TEXT:
      return Object.assign({}, state, {
        text: action.text
      });
  }
  return state;
}
