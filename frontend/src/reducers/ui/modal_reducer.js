import { SET_MODAL_ACTIVE, SET_MODAL_TYPE } from '../../actions/modal_actions';

export default (state = {active: false, modalType: null}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_MODAL_ACTIVE:
      nextState.active = action.active;
      return nextState;
    case SET_MODAL_TYPE:
      nextState.modalType = action.modalType;
      return nextState;
    default:
      return state;
  };
};