import { SET_UPLOAD_JSON_ERRORS } from '../../actions/script_create_actions';

export default (state = [], action) => {
  Object.freeze(state);
  switch (action.type) {
    case SET_UPLOAD_JSON_ERRORS:
      return action.status;
    default:
      return false;
  };
};