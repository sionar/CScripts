import { combineReducers } from 'redux';
import detailVersionReducer from './detail_version_reducer';
import detailUiVisibleReducer from './detail_ui_visible_reducer';
import detailNightOrderReducer from './detail_night_order_reducer';

const detailReducer = combineReducers({
  version: detailVersionReducer,
  uiVisible: detailUiVisibleReducer,
  nightOrder: detailNightOrderReducer
});

export default detailReducer;