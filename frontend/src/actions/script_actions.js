import * as ScriptUtil from '../util/api_script_util';
import {
  setUiLoadingIndexStatus,
  setUiLoadingDetailStatus,
  setUiLoadingUserScriptsStatus,
  setUiLoadingDeleteScriptStatus,
  setUiDetailVersionDefault
  } from './ui_actions';
import { setDeleteScriptStatus } from './script_create_actions';
import { setModalActive } from './modal_actions';

export const RECEIVE_SCRIPTS = 'RECEIVE_SCRIPTS';
export const RECEIVE_PAGE = 'RECEIVE_PAGE';
export const RECEIVE_SCRIPTS_ERRORS = 'RECEIVE_SCRIPT_ERRORS';
export const RECEIVE_SCRIPT = 'RECEIVE_SCRIPT';
export const RECEIVE_USER_SCRIPTS = 'RECEIVE_USER_SCRIPTS';
export const SET_NIGHT_ORDER = 'SET_NIGHT_ORDER';
export const DELETE_SCRIPT = 'DELETE_SCRIPT';

export const receiveScripts = (data) => ({
  type: RECEIVE_SCRIPTS,
  data
});

export const receivePage = (data) => ({
  type: RECEIVE_PAGE,
  data
});

export const receiveScriptsErrors = (errors) => ({
  type: RECEIVE_SCRIPTS_ERRORS,
  errors
});

export const receiveScript = (data) => ({
  type: RECEIVE_SCRIPT,
  data
});

export const receiveUserScripts = (data) => ({
  type: RECEIVE_USER_SCRIPTS,
  data
})

export const setNightOrderAction = (characters) => ({
  type: SET_NIGHT_ORDER,
  characters
})

export const deleteScriptAction = (scriptId) => ({
  type: DELETE_SCRIPT,
  scriptId
})

export const getScripts = (params) => (dispatch) => ScriptUtil.getScriptIndex(params)
  .then(res => {
    dispatch(receiveScripts(res));
    dispatch(setUiLoadingIndexStatus(false));
  })
  .fail(res => dispatch(receiveScriptErrors(res.responseJSON)));

export const getPage = (page) => (dispatch) => ScriptUtil.getPage(page)
  .then(res => {
    dispatch(receivePage(res));
    dispatch(setUiLoadingIndexStatus(false));
  })
  .fail(res => dispatch(receiveScriptErrors(res.responseJSON)));

export const getScript = (id, token) => (dispatch) => ScriptUtil.getScript(id, token)
  .then(res => {
    dispatch(receiveScript(res));
    dispatch(setUiLoadingDetailStatus(false));
    dispatch(setUiDetailVersionDefault(res));
  })
  .fail(res => dispatch(receiveScriptsErrors(res.responseJSON)));

export const setNightOrder = (characters) => (dispatch) => {
  dispatch(setNightOrderAction(characters));
}

export const getUserScripts = (username, token) => (dispatch) => ScriptUtil.getUserScripts(username, token)
  .then(res => {
    dispatch(receiveUserScripts(res));
    dispatch(setUiLoadingUserScriptsStatus(false));
  })
  .fail(res => {
    dispatch(receiveScriptsErrors({user: ['User not found']}));
    dispatch(setUiLoadingUserScriptsStatus(false));
  });

export const deleteScript = (scriptId, token) => (dispatch) => ScriptUtil.deleteScript(scriptId, token)
  .then(res => {
    dispatch(deleteScriptAction(scriptId));
    dispatch(setUiLoadingDeleteScriptStatus(false));
    dispatch(setDeleteScriptStatus(true));
    dispatch(setModalActive(false));
  })
  .fail(res => {
    dispatch(receiveScriptsErrors({script: 'Could not delete script.'}));
  });