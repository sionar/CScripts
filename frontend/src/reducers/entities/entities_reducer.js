import { combineReducers } from 'redux';
import usersReducer from './users_reducer';
import scriptsReducer from './scripts_reducer';
import versionsReducer from './versions_reducer';
import charactersReducer from './characters_reducer';

const entitiesReducer = combineReducers({
  users: usersReducer,
  scripts: scriptsReducer,
  versions: versionsReducer,
  characters: charactersReducer,
});

export default entitiesReducer;