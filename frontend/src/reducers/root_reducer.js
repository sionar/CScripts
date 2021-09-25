import { combineReducers } from 'redux';
import entitiesReducer from './entities/entities_reducer';
import authReducer from './auth/auth_reducer';
import uiReducer from './ui/ui_reducer';
import errorsReducer from './errors/errors_reducer';

const rootReducer = combineReducers({
  entities: entitiesReducer,
  auth: authReducer,
  ui: uiReducer,
  errors: errorsReducer,
});

export default rootReducer;