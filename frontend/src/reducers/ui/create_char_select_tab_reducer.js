import { SET_UI_CREATE_CHAR_SELECT_TAB } from '../../actions/ui_actions';

export default (state = {Townsfolk: true, Outsider: true, Minion: true, Demon: true, Traveller: true, Fabled: true}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_UI_CREATE_CHAR_SELECT_TAB:
      nextState[action.charType] = action.status;
      return nextState;
    default:
      return state;
  };
};