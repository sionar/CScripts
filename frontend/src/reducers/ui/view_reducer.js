import { SET_UI_VIEW_PAGE, SET_UI_VIEW_MODE, SET_UI_VIEW_EDITING } from '../../actions/ui_actions';

export default (state = {page: 'index', mode: 'script', editing: false}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_UI_VIEW_PAGE:
      nextState.page = action.page;
      if (action.page != 'detail') {}
        nextState.editing = false;
      nextState.mode = 'script';
      return nextState;
    case SET_UI_VIEW_MODE:
      nextState.mode = action.mode;
      return nextState;
    case SET_UI_VIEW_EDITING:
      nextState.editing = action.status;
      return nextState;
    default:
      return state;
  }
}