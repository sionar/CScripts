import { combineReducers } from 'redux';
import errorsAuthReducer from './errors_auth_reducer';
import errorsScriptReducer from './errors_script_reducer';
import errorsUploadJsonReducer from './errors_upload_json_reducer';

const errorsReducer = combineReducers({
  auth: errorsAuthReducer,
  script: errorsScriptReducer,
  uploadJson: errorsUploadJsonReducer
});

export default errorsReducer;