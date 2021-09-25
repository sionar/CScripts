import { SET_UI_DETAIL_UI_VISIBLE } from '../../actions/ui_actions';

export default (state = true, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_UI_DETAIL_UI_VISIBLE:
      nextState = action.status;
      return nextState;
    default:
      return state;
  };
};