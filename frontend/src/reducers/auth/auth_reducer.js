import { RECEIVE_AUTH, LOGOUT_AUTH } from '../../actions/auth_actions';

export default (state = {}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_AUTH:
      let user = Object.assign({}, action.user);
      window.localStorage.setItem('username', user.username);
      window.localStorage.setItem('token', user.token);
      window.localStorage.setItem('is_guest', user.is_guest);
      return user;
    case LOGOUT_AUTH:
      window.localStorage.removeItem('username');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('is_guest');
      return {id: null, username: null, token: null, guest: null};
    default:
      return state;
  };
};