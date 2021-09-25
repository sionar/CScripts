import * as ScriptUtil from '../util/api_script_util';
import { 
  setUiLoadingCreateStatus,
  setUiLoadingPostScript,
  setUiViewEditing,
  setUiViewPage,
  setUiDetailVersion,
  } from './ui_actions';

export const GET_CHARS = 'GET_CHARS';
export const SET_UI_CREATE_VERSION_NUM = 'SET_UI_CREATE_VERSION_NUM';
export const SET_UI_CREATE_VERSION_SCRIPT_ID = 'SET_UI_CREATE_VERSION_SCRIPT_ID';
export const ADD_UI_CREATE_VERSION_USED_CHAR = 'ADD_UI_CREATE_VERSION_USED_CHAR';
export const REMOVE_UI_CREATE_VERSION_USED_CHAR = 'REMOVE_UI_CREATE_VERSION_USED_CHAR';
export const SET_UI_CREATE_RESET_CHARS = 'SET_UI_CREATE_RESET_CHARS';
export const SET_UI_CREATE_VERSION_USED_CHARS = 'SET_UI_CREATE_VERSION_USED_CHARS';
export const SET_UI_CREATE_VERSION_UNUSED_CHARS = 'SET_UI_CREATE_VERSION_UNUSED_CHARS';
export const SET_UI_CREATE_FILTER_INPUT = 'SET_UI_CREATE_FILTER_INPUT';
export const SET_UPLOAD_JSON_ERRORS = 'SET_UPLOAD_JSON_ERRORS';
export const CLEAR_CREATE_SCRIPT = 'CLEAR_CREATE_SCRIPT';
export const SET_UI_CREATE_SCRIPT_INITIAL = 'SET_UI_CREATE_SCRIPT_INITIAL';
export const SET_UI_CREATE_SCRIPT_TITLE = 'SET_UI_CREATE_SCRIPT_TITLE';
export const SET_UI_CREATE_SCRIPT_DESCRIPTION = 'SET_UI_CREATE_SCRIPT_DESCRIPTION';
export const SET_UI_CREATE_SCRIPT_AUTHOR = 'SET_UI_CREATE_SCRIPT_AUTHOR';
export const SET_UI_CREATE_SCRIPT_OWNER = 'SET_UI_CREATE_SCRIPT_OWNER';
export const SET_UI_CREATE_SCRIPT_TYPE = 'SET_UI_CREATE_SCRIPT_TYPE';
export const SET_UI_CREATE_SCRIPT_VISIBLE = 'SET_UI_CREATE_SCRIPT_VISIBLE';
export const TRIM_USED_CHARACTERS = 'TRIM_USED_CHARACTERS';
export const ADD_CREATE_SCRIPT = 'ADD_CREATE_SCRIPT';
export const ADD_CREATE_VERSION = 'ADD_CREATE_VERSION';
export const UPDATE_VERSION = 'UPDATE_VERSION';
export const SET_SCRIPT = 'SET_SCRIPT';
export const SET_VERSION = 'SET_VERSION';
export const RECEIVE_CREATE_ERRORS = 'RECEIVE_CREATE_ERRORS';
export const SET_CREATE_SCRIPT_STATUS = 'SET_CREATE_SCRIPT_STATUS';
export const SET_CREATE_SCRIPT_ID = 'SET_CREATE_SCRIPT_ID';
export const SET_DELETE_SCRIPT_STATUS = 'SET_DELETE_SCRIPT_STATUS';
export const SET_DELETE_SCRIPT_ID = 'SET_DELETE_SCRIPT_ID';

export const getCharsInitial = (characters) => ({
  type: GET_CHARS,
  characters
});

export const setUiCreateVersionNum = (versionNum) => ({
  type: SET_UI_CREATE_VERSION_NUM,
  versionNum
});

export const setUiCreateVersionScriptId = (scriptId) => ({
  type: SET_UI_CREATE_VERSION_SCRIPT_ID,
  scriptId
});

export const addUiCreateVersionUsedChar = (character) => ({
  type: ADD_UI_CREATE_VERSION_USED_CHAR,
  character
});

export const removeUiCreateVersionUsedChar = (character) => ({
  type: REMOVE_UI_CREATE_VERSION_USED_CHAR,
  character
});

export const setUiCreateVersionUsedChars = (characters) => ({
  type: SET_UI_CREATE_VERSION_USED_CHARS,
  characters
});

export const setUiCreateVersionUnusedChars = (characters) => ({
  type: SET_UI_CREATE_VERSION_UNUSED_CHARS,
  characters
});

export const setUiCreateResetChars = () => ({
  type: SET_UI_CREATE_RESET_CHARS
});

export const setUiCreateScriptInitial = () => ({
  type: SET_UI_CREATE_SCRIPT_INITIAL
});

export const setUiCreateScriptTitle = (title) => ({
  type: SET_UI_CREATE_SCRIPT_TITLE,
  title
});

export const setUiCreateScriptDescription = (description) => ({
  type: SET_UI_CREATE_SCRIPT_DESCRIPTION,
  description
});

export const setUiCreateScriptAuthor = (author) => ({
  type: SET_UI_CREATE_SCRIPT_AUTHOR,
  author
});

export const setUiCreateScriptOwner = (owner) => ({
  type: SET_UI_CREATE_SCRIPT_OWNER,
  owner
});

export const setUiCreateScriptType = (scriptType) => ({
  type: SET_UI_CREATE_SCRIPT_TYPE,
  scriptType
});

export const setUiCreateScriptVisible = (visible) => ({
  type: SET_UI_CREATE_SCRIPT_VISIBLE,
  visible
});

export const trimUsedCharactersAction = (scriptType) => ({
  type: TRIM_USED_CHARACTERS,
  scriptType
});


export const setUiCreateFilterInput = (text) => ({
  type: SET_UI_CREATE_FILTER_INPUT,
  text
});

export const setUploadJsonErrorsAction = (status) => ({
  type: SET_UPLOAD_JSON_ERRORS,
  status
});

export const clearCreateScript = () => ({
  type: CLEAR_CREATE_SCRIPT
});

export const addCreateScript = (script) => ({
  type: ADD_CREATE_SCRIPT,
  script
});

export const addCreateVersion = (version, scriptId, characters) => ({
  type: ADD_CREATE_VERSION,
  version,
  scriptId,
  characters
});

export const updateVersionAction = (version, scriptId, characters) => ({
  type: UPDATE_VERSION,
  version,
  scriptId,
  characters
});

export const setScriptAction = (script) => ({
  type: SET_SCRIPT,
  script
});

export const setVersionAction = (version) => ({
  type: SET_VERSION,
  version
});

export const receiveCreateErrors = (errors) => ({
  type: RECEIVE_CREATE_ERRORS,
  errors
});

export const setCreateScriptStatusAction = (status) => ({
  type: SET_CREATE_SCRIPT_STATUS,
  status
});

export const setCreateScriptIdAction = (scriptId) => ({
  type: SET_CREATE_SCRIPT_ID,
  scriptId
});

export const setDeleteScriptStatusAction = (status) => ({
  type: SET_DELETE_SCRIPT_STATUS,
  status
});

export const setDeleteScriptIdAction = (scriptId) => ({
  type: SET_DELETE_SCRIPT_ID,
  scriptId
});


export const getCharacters = (token) => (dispatch) => ScriptUtil.getCharacters(token)
  .then(res => {
    dispatch(getCharsInitial(res));
    dispatch(setUiLoadingCreateStatus(false));
  })
  .fail(res => dispatch(receiveCreateErrors(res.responseJSON)));

export const setVersionNum = (versionNum) => (dispatch) => {
  dispatch(setUiCreateVersionNum(versionNum));
};

export const setVersionScriptId = (versionScriptId) => (dispatch) => {
  dispatch(setUiCreateVersionScriptId(versionScriptId));
};

export const addVersionChar = (character) => (dispatch) => {
  dispatch(addUiCreateVersionUsedChar(character));
};

export const removeVersionChar = (character) => (dispatch) => {
  dispatch(removeUiCreateVersionUsedChar(character));
};

export const setUsedChars = (characters) => (dispatch) => {
  dispatch(setUiCreateVersionUsedChars(characters));
};

export const setUnusedChars = (characters) => (dispatch) => {
  dispatch(setUiCreateVersionUnusedChars(characters));
};

export const resetChars = () => (dispatch) => {
  dispatch(setUiCreateResetChars())
};

export const initializeCreateScript = () => (dispatch) => {
  dispatch(setUiCreateScriptInitial());
};

export const setScriptTitle = title => (dispatch) => {
  dispatch(setUiCreateScriptTitle(title));
};

export const setScriptDescription = (description) => (dispatch) => {
  dispatch(setUiCreateScriptDescription(description));
};

export const setScriptAuthor = (author) => (dispatch) => {
  dispatch(setUiCreateScriptAuthor(author));
};

export const setScriptOwner = (owner) => (dispatch) => {
  dispatch(setUiCreateScriptOwner(owner));
};

export const setScriptType = (scriptType) => (dispatch) => {
  dispatch(setUiCreateScriptType(scriptType));
};

export const setScriptVisible = (visible) => (dispatch) => {
  dispatch(setUiCreateScriptVisible(visible));
};

export const trimUsedCharacters = (scriptType) => (dispatch) => {
  dispatch(trimUsedCharactersAction(scriptType));
};

export const setFilterInput = (text) => (dispatch) => {
  dispatch(setUiCreateFilterInput(text));
};

export const setUploadJsonErrors = (status) => (dispatch) => {
  dispatch(setUploadJsonErrorsAction(status));
};

export const clearScript = () => (dispatch) => {
  dispatch(clearCreateScript());
};

export const setCreateScriptStatus = (status) => (dispatch) => {
  dispatch(setCreateScriptStatusAction(status));
};

export const setCreateScriptId = (scriptId) => (dispatch) => {
  dispatch(setCreateScriptIdAction(scriptId));
};

export const setDeleteScriptStatus = (status) => (dispatch) => {
  dispatch(setDeleteScriptStatusAction(status));
};

export const setDeleteScriptId = (scriptId) => (dispatch) => {
  dispatch(setDeleteScriptIdAction(scriptId));
};

export const setScript = (script) => (dispatch) => {
  dispatch(setScriptAction(script));
};

export const setVersion = (version) => (dispatch) => {
  dispatch(setVersionAction(version));
};

export const createScript = (script, version, characters, token) => (dispatch) => ScriptUtil.createScript(script, token)
  .then(res => {
    dispatch(addCreateScript(res));
    const scriptId = res.id;
    dispatch(setCreateScriptId(scriptId));
    ScriptUtil.createVersion(scriptId, version, token)
    .then(res => {
      dispatch(addCreateVersion(res, scriptId, characters));
      dispatch(setCreateScriptStatus(true));
      dispatch(setUiLoadingPostScript(false));
    })
    .fail(res => {
      dispatch(receiveCreateErrors(res.responseJSON));
    });
  })
  .fail(res => dispatch(receiveCreateErrors(res.responseJSON)));

export const saveNewVersion = (script, version, characters, token) => (dispatch) => ScriptUtil.updateScript(script, token)
  .then(res => {
    dispatch(addCreateScript(res));
    ScriptUtil.createVersion(script.id, version, token)
    .then(res => {
      dispatch(addCreateVersion(res, script.id, characters));
      dispatch(setCreateScriptStatus(true));
      dispatch(setUiViewPage('detail'));
      dispatch(setUiViewEditing(false));
      dispatch(setUiDetailVersion(res.version_num));
      dispatch(setUiLoadingPostScript(false));
    })
    .fail(res => {
      dispatch(receiveCreateErrors(res.responseJSON));
    });
  })
  .fail(res => {
    dispatch(receiveCreateErrors(res.responseJSON));
  });

export const updateVersion = (script, version, characters, token) => (dispatch) => ScriptUtil.updateScript(script, token)
  .then(res => {
    dispatch(addCreateScript(res));
    ScriptUtil.updateVersion(script.id, version, token)
      .then(res => {
        dispatch(updateVersionAction(res, script.id, characters));
        dispatch(setCreateScriptStatus(true));
        dispatch(setUiViewPage('detail'));
        dispatch(setUiViewEditing(false));
        dispatch(setUiLoadingPostScript(false));
      })
      .fail(res => {
        dispatch(receiveCreateErrors(res.responseJSON));
    });
  })
  .fail(res => {
    dispatch(receiveCreateErrors(res.responseJSON));
  });