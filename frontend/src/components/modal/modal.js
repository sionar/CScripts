import React from 'react';
import ModalUploadJson from './modal_upload_json_container';
import ModalRegister from './modal_register_container';
import ModalLogin from './modal_login_container';
import ModalRecover from './modal_recover_container';
import ModalDeleteScript from './modal_delete_script_container';

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let content = null;
    if (this.props.ui.modal.active) {
      switch (this.props.ui.modal.modalType) {
        case 'uploadJSON':
          content = <ModalUploadJson />;
          break;
        case 'register':
          content = <ModalRegister />;
          break;
        case 'login':
          content = <ModalLogin />;
          break;
        case 'recover':
          content = <ModalRecover />;
          break;
        case 'deleteScript':
          content = <ModalDeleteScript />;
          break;
        default:
          content = null;
      }
    }
    return (content);
  }
}

export default Modal;