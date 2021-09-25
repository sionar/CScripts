export const SET_UI_LOADING_INDEX = 'SET_UI_LOADING_INDEX';
export const SET_UI_LOADING_DETAIL = 'SET_UI_LOADING_DETAIL';
export const SET_UI_LOADING_CREATE = 'SET_UI_LOADING_CREATE';
export const SET_UI_LOADING_POST_SCRIPT = 'SET_UI_LOADING_POST_SCRIPT';
export const SET_UI_LOADING_DELETE_SCRIPT = 'SET_UI_LOADING_DELETE_SCRIPT';
export const SET_UI_LOADING_LOGIN = 'SET_UI_LOADING_LOGIN';
export const SET_UI_LOADING_REGISTER = 'SET_UI_LOADING_REGISTER';
export const SET_UI_LOADING_RECOVER_SEND_EMAIL = 'SET_UI_LOADING_RECOVER_SEND_EMAIL';
export const SET_UI_LOADING_RECOVER_CHANGE_PASSWORD = 'SET_UI_LOADING_RECOVER_CHANGE_PASSWORD';
export const SET_UI_LOADING_USER_SCRIPTS = 'SET_UI_LOADING_USER_SCRIPTS';
export const SET_UI_LOADING_EXPORT_JSON = 'SET_UI_LOADING_EXPORT_JSON';
export const SET_UI_VIEW_PAGE = 'SET_UI_VIEW_PAGE';
export const SET_UI_VIEW_MODE = 'SET_UI_VIEW_MODE';
export const SET_UI_VIEW_EDITING = 'SET_UI_VIEW_EDITING';
export const SET_UI_DETAIL_VERSION = 'SET_UI_DETAIL_VERSION';
export const SET_UI_CREATE_CHAR_SELECT_TAB = 'SET_UI_CREATE_CHAR_SELECT_TAB';
export const SET_UI_DETAIL_UI_VISIBLE = 'SET_UI_DETAIL_UI_VISIBLE';
export const SET_UI_INDEX_SCRIPTS = 'SET_UI_INDEX_SCRIPTS';
export const SET_UI_INDEX_SEARCH_TITLE = 'SET_UI_INDEX_SEARCH_TITLE';
export const SET_UI_INDEX_SEARCH_TYPE = 'SET_UI_INDEX_SEARCH_TYPE';

export const setUiLoadingIndex = (loading) => ({
  type: SET_UI_LOADING_INDEX,
  loading
});

export const setUiLoadingDetail = (loading) => ({
  type: SET_UI_LOADING_DETAIL,
  loading
});

export const setUiLoadingCreate = (loading) => ({
  type: SET_UI_LOADING_CREATE,
  loading
});

export const setUiLoadingLogin = (loading) => ({
  type: SET_UI_LOADING_LOGIN,
  loading
});

export const setUiLoadingRegister = (loading) => ({
  type: SET_UI_LOADING_REGISTER,
  loading
});

export const setUiLoadingRecoverSendEmail = (loading) => ({
  type: SET_UI_LOADING_RECOVER_SEND_EMAIL,
  loading
});

export const setUiLoadingRecoverChangePassword = (loading) => ({
  type: SET_UI_LOADING_RECOVER_CHANGE_PASSWORD,
  loading
});

export const setUiLoadingPostScript = (loading) => ({
  type: SET_UI_LOADING_POST_SCRIPT,
  loading
});

export const setUiLoadingDeleteScript = (loading) => ({
  type: SET_UI_LOADING_DELETE_SCRIPT,
  loading
});

export const setUiLoadingUserScripts = (loading) => ({
  type: SET_UI_LOADING_USER_SCRIPTS,
  loading
});

export const setUiLoadingExportJson = (loading) => ({
  type: SET_UI_LOADING_EXPORT_JSON,
  loading
});

export const setUiIndexScriptsAction = (scripts) => ({
  type: SET_UI_INDEX_SCRIPTS,
  scripts
});

export const setUiIndexSearchTitleAction = (title) => ({
  type: SET_UI_INDEX_SEARCH_TITLE,
  title
});

export const setUiIndexSearchTypeAction = (scriptType) => ({
  type: SET_UI_INDEX_SEARCH_TYPE,
  scriptType
});

export const setUiViewPageAction = (page) => ({
  type: SET_UI_VIEW_PAGE,
  page
});

export const setUiViewModeAction = (mode) => ({
  type: SET_UI_VIEW_MODE,
  mode
});


export const setUiViewEditingAction = (status) => ({
  type: SET_UI_VIEW_EDITING,
  status
});

export const setUiDetailVersionAction = (version) => ({
  type: SET_UI_DETAIL_VERSION,
  version
});

export const setUiDetailVersionDefaultAction = (script) => {
  const versions = script.versions;
  let versionNum = 0;
  versions.forEach(version => {
    if (version.version_num > versionNum)
      versionNum = version.version_num
  })
  return {
    type: SET_UI_DETAIL_VERSION,
    version: versionNum
  };
};

export const setUiCreateCharSelectTabAction = (charType, status) => {
  return {
    type: SET_UI_CREATE_CHAR_SELECT_TAB,
    charType,
    status,
  };
};

export const setUiDetailUiVisible = (status) => ({
  type: SET_UI_DETAIL_UI_VISIBLE,
  status
});

export const setUiLoadingIndexStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingIndex(loading));
};

export const setUiLoadingDetailStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingDetail(loading));
};

export const setUiLoadingCreateStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingCreate(loading));
};

export const setUiLoadingPostScriptStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingPostScript(loading));
};

export const setUiLoadingDeleteScriptStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingDeleteScript(loading));
}

export const setUiLoadingLoginStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingLogin(loading));
};

export const setUiLoadingRegisterStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingRegister(loading));
};

export const setUiLoadingRecoverEmailStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingRecoverSendEmail(loading));
};

export const setUiLoadingRecoverPasswordStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingRecoverChangePassword(loading));
};

export const setUiLoadingUserScriptsStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingUserScripts(loading));
};

export const setUiLoadingExportJsonStatus = (loading) => (dispatch) => {
  dispatch(setUiLoadingExportJson(loading));
};

export const setUiIndexScripts = (scripts) => (dispatch) => {
  dispatch(setUiIndexScriptsAction(scripts));
};

export const setUiIndexSearchTitle = (title) => (dispatch) => {
  dispatch(setUiIndexSearchTitleAction(title));
};

export const setUiIndexSearchType = (scriptType) => (dispatch) => {
  dispatch(setUiIndexSearchTypeAction(scriptType));
};

export const setUiViewPage = (page) => (dispatch) => {
  dispatch(setUiViewPageAction(page));
};

export const setUiViewMode = (mode) => (dispatch) => {
  dispatch(setUiViewModeAction(mode));
};

export const setUiViewEditing = (status) => (dispatch) => {
  dispatch(setUiViewEditingAction(status));
};

export const setUiDetailVersion = (version) => (dispatch) => {
  dispatch(setUiDetailVersionAction(version));
};

export const setUiDetailVersionDefault = (script) => (dispatch) => {
  dispatch(setUiDetailVersionDefaultAction(script));
};

export const setUiCreateCharSelectTab = (charType, status) => (dispatch) => {
  dispatch(setUiCreateCharSelectTabAction(charType, status));
};

export const setUiVisible = (status) => (dispatch) => {
  dispatch(setUiDetailUiVisible(status));
};