export const SET_MODAL_ACTIVE = 'SET_MODAL_ACTIVE';
export const SET_MODAL_TYPE = 'SET_MODAL_TYPE';

export const setModalActiveAction = (active) => ({
  type: SET_MODAL_ACTIVE,
  active
});

export const setModalTypeAction = (modalType) => ({
  type: SET_MODAL_TYPE,
  modalType
});

export const setModalActive = (active) => dispatch => {
  dispatch(setModalActiveAction(active));
};

export const setModalType = (modalType) => dispatch => {
  dispatch(setModalTypeAction(modalType));
};