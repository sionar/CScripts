import { SET_UI_DETAIL_VERSION } from '../../actions/ui_actions';

export default (state = 0, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_UI_DETAIL_VERSION:
      nextState = action.version;
      return nextState;
    default:
      return state;
  };
};