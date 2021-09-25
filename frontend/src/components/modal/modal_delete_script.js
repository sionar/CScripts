import React from 'react';
import { Redirect } from 'react-router-dom';

class ModalDeleteScript extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  };

  handleClose(e) {
    e.preventDefault();
    this.props.setModalActive(false);
  };

  handleDelete(e) {
    e.preventDefault();
    const scriptId = this.props.ui.create.deleteStatus.scriptId;
    const token = this.props.auth.token;
    this.props.setUiLoadingDeleteScriptStatus(true);
    this.props.deleteScript(scriptId, token);
  };

  render() {
    let content = null;
    let deleteButton = <button id='modal-delete-button-submit' className='modal-delete-button' onClick={this.handleDelete}>Delete Script</button>;;
    let cancelButton = <button id='modal-delete-button-cancel' className='modal-delete-button' onClick={this.handleClose}>Cancel</button>
    
    if (this.props.ui.loading.deleteScript) {
      deleteButton = <button id='modal-delete-button-submit' className='modal-delete-button' onClick={this.handleDelete} disabled={true}>Deleting Script...</button>;
      cancelButton = null;
    }

    if (this.props.ui.modal.active) {
      content = 
        <div id='modal'>
          <div id='modal-delete-box'>
            <div id='modal-delete-header'>
              <div id='modal-delete-label'>Delete Script</div>
              <div id='modal-delete-close' onClick={this.handleClose}>&times;</div>
            </div>
            <div id='modal-delete-content-box'>
              <div id='modal-delete-message'>Are you sure you want to delete this script? This script will be deleted forever.</div>
            </div>
            {/* {errorMessage} */}
            <div id='modal-delete-button-panel'>
              {deleteButton}
              {cancelButton}
            </div>
          </div>
        </div>;
    };
    return (content);
  };
};

export default ModalDeleteScript;