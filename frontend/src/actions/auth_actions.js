import * as AuthUtil from '../util/api_auth_util';
import { setRecoverEmailSent, setRecoverPasswordChanged, clearRecoverState } from './ui_auth_actions';


export const RECEIVE_AUTH = 'RECEIVE_AUTH';
export const LOGOUT_AUTH = 'LOGOUT_AUTH';
export const ADD_AUTH_USER = 'ADD_AUTH_USER';
export const SET_LOGIN_ERROR = 'SET_LOGIN_ERROR';
export const SET_REGISTER_ERROR_USERNAME_INVALID = 'SET_REGISTER_ERROR_USERNAME_INVALID';
export const SET_REGISTER_ERROR_USERNAME_TAKEN = 'SET_REGISTER_ERROR_USERNAME_TAKEN';
export const SET_REGISTER_ERROR_EMAIL_INVALID = 'SET_REGISTER_ERROR_EMAIL_INVALID';
export const SET_REGISTER_ERROR_EMAIL_TAKEN = 'SET_REGISTER_ERROR_EMAIL_TAKEN';
export const SET_REGISTER_ERROR_PASSWORD_LENGTH = 'SET_REGISTER_ERROR_PASSWORD_LENGTH';
export const SET_REGISTER_ERROR_PASSWORDS_MATCH = 'SET_REGISTER_ERROR_PASSWORDS_MATCH';
export const SET_RECOVER_ERROR_EMAIL_INVALID = 'SET_RECOVER_ERROR_EMAIL_INVALID';
export const SET_RECOVER_ERROR_TOKEN_INVALID = 'SET_RECOVER_ERROR_TOKEN_INVALID';
export const SET_RECOVER_ERROR_PASSWORD_LENGTH = 'SET_RECOVER_ERROR_PASSWORD_LENGTH';
export const SET_RECOVER_ERROR_PASSWORDS_MATCH = 'SET_RECOVER_ERROR_PASSWORDS_MATCH';

export const receiveAuth = (user) => ({
  type: RECEIVE_AUTH,
  user
});

export const logoutAuth = () => ({
  type: LOGOUT_AUTH
});

export const addAuthUserAction = (user) => ({
  type: ADD_AUTH_USER,
  user
});

export const setLoginError = () => ({
  type: SET_LOGIN_ERROR
})

export const setRegisterErrorUsernameInvalid = () => ({
  type: SET_REGISTER_ERROR_USERNAME_INVALID
});

export const setRegisterErrorUsernameTaken = () => ({
  type: SET_REGISTER_ERROR_USERNAME_TAKEN
});

export const setRegisterErrorEmailInvalid = () => ({
  type: SET_REGISTER_ERROR_EMAIL_INVALID
});

export const setRegisterErrorEmailTaken = () => ({
  type: SET_REGISTER_ERROR_EMAIL_TAKEN
});

export const setRegisterErrorPasswordLengthAction = () => ({
  type: SET_REGISTER_ERROR_PASSWORD_LENGTH
});

export const setRegisterErrorPasswordsMatchAction = () => ({
  type: SET_REGISTER_ERROR_PASSWORDS_MATCH
});

export const setRecoverErrorEmailInvalid = () => ({
  type: SET_RECOVER_ERROR_EMAIL_INVALID
});

export const setRecoverErrorTokenInvalid = () => ({
  type: SET_RECOVER_ERROR_TOKEN_INVALID
});

export const setRecoverErrorPasswordLengthAction = () => ({
  type: SET_RECOVER_ERROR_PASSWORD_LENGTH
});

export const setRecoverErrorPasswordsMatchAction = () => ({
  type: SET_RECOVER_ERROR_PASSWORDS_MATCH
});

export const setRegisterErrors = (dispatch, errors) => {
  if ('email' in errors) {
    if (errors.email[0] === 'Enter a valid email address.')
      dispatch(setRegisterErrorEmailInvalid());
    else if (errors.email[0] === 'account with this email already exists.')
      dispatch(setRegisterErrorEmailTaken());
  };
  if ('username' in errors) {
    if (errors.username[0] === 'Only alphanumeric characters are allowed.')
      dispatch(setRegisterErrorUsernameInvalid());
    else if (errors.username[0] === 'account with this username already exists.')
      dispatch(setRegisterErrorUsernameTaken());
  };
  if ('password' in errors) {
    if (errors.password[0] === 'This password is too short. It must contain at least 8 characters.')
      dispatch(setRegisterErrorPasswordLength());
    else if (errors.password[0] === 'Passwords do not match.')
      dispatch(setRegisterErrorPasswordsMatch());
  };
};

export const receiveRecoverErrors = (dispatch, errors) => {
  if ('detail' in errors) {
    if (errors.detail === 'Not found.')
      dispatch(setRecoverErrorTokenInvalid());
  };
  if ('password' in errors) {
    if (errors.password[0] === 'This password is too short. It must contain at least 8 characters.')
      dispatch(setRecoverErrorPasswordLength());
  };
}
 
export const register = (user, token) => (dispatch) => AuthUtil.register(user, token)
  .then(res => dispatch(receiveAuth(res)))
  .fail(res => setRegisterErrors(dispatch, res.responseJSON));

export const login = (user, token) => (dispatch) => AuthUtil.login(user, token)
  .then(res => dispatch(receiveAuth(res)))
  .fail(res => dispatch(setLoginError()));

export const logout = () => (dispatch) => {
  dispatch(logoutAuth());
  dispatch(getGuestAccount());
};

export const getGuestAccount = () => (dispatch) => AuthUtil.getGuestAccount()
  .then(res => dispatch(receiveAuth(res)))
  .fail(res => dispatch(receiveLoginErrors(res.responseJSON)));

export const addAuthUser = (user) => (dispatch) => {
  dispatch(addAuthUserAction(user));
};

export const sendRecoverEmail = (email) => (dispatch) => AuthUtil.sendRecoverEmail(email)
  .then(() => {
    dispatch(setRecoverEmailSent(true));
  })
  .fail(() => {
    dispatch(setRecoverErrorEmailInvalid());
  });

export const recoverChangePassword = (data) => (dispatch) => AuthUtil.recoverChangePassword(data)
  .then(() => {
    dispatch(setRecoverPasswordChanged(true));
  })
  .fail(res => receiveRecoverErrors(dispatch, res.responseJSON));

export const setRegisterErrorPasswordLength = () => dispatch => {
  dispatch(setRegisterErrorPasswordLengthAction())
}

export const setRegisterErrorPasswordsMatch = () => dispatch => {
  dispatch(setRegisterErrorPasswordsMatchAction())
}

export const setRecoverErrorPasswordLength = () => dispatch => {
  dispatch(setRecoverErrorPasswordLengthAction())
}

export const setRecoverErrorPasswordsMatch = () => dispatch => {
  dispatch(setRecoverErrorPasswordsMatchAction())
}

