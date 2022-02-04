import { combineReducers } from 'redux';
import loadingReducer from './loading_reducer';
import indexReducer from './index_reducer';
import detailReducer from './detail_reducer';
import createReducer from './create_reducer';
import viewReducer from './view_reducer';
import modalReducer from './modal_reducer';
import loginReducer from './login_reducer';
import registerReducer from './register_reducer';
import recoverReducer from './recover_reducer';
import profileReducer from './profile_reducer';

const uiReducer = combineReducers({
  loading: loadingReducer,
  index: indexReducer,
  detail: detailReducer,
  create: createReducer,
  view: viewReducer,
  modal: modalReducer,
  login: loginReducer,
  register: registerReducer,
  recover: recoverReducer,
  profile: profileReducer,
});

export default uiReducer;