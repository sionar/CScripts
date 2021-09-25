import React from 'react';

class ModalUploadJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  };

  handleClose(e) {
    e.preventDefault();
    this.props.setModalActive(false);
  };

  handleSubmit(e) {
    e.preventDefault();
    const textArea = document.getElementById('modal-upload-content-textarea');
    if (textArea.value == '') {
      this.props.setModalActive(false);
      return;
    };
    try {
      const importChars = JSON.parse(textArea.value);
      this.props.resetChars();
      const unusedChars = this.props.ui.create.version.unusedChars;
      let character, formattedUnusedChar;
      importChars.forEach(entry=> {
        character = entry.id;
        unusedChars.every(unusedChar => {
          formattedUnusedChar = unusedChar.name.toLowerCase().replace(/'/g, '').replace(/ /g, '_');
          if (formattedUnusedChar == character) {
            this.props.addVersionChar(unusedChar);
            return false;
          };
          return true;
        });
      });
      this.props.setModalActive(false);
    }
    catch(e) {
      this.props.setUploadJsonErrors(true);
    }
  };

  handleFile(e) {
    this.props.setUploadJsonErrors(false);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (function(f) {
      return (e) => {
        const jsonText = e.target.result;
        const textArea = document.getElementById('modal-upload-content-textarea');
        textArea.value = jsonText;
      };
    })(file);
    reader.readAsText(file);
  };

  componentDidMount() {
    const fileSelector = document.getElementById('modal-upload-input');
    if (fileSelector != null) {
      fileSelector.addEventListener('change', this.handleFile);
    };
  };

  render() {
    let content = null;
    let errorMessage = <div id='modal-upload-json-error'></div>;
    if (this.props.errors.uploadJson == true)
      errorMessage = <div id='modal-upload-json-error'>Invalid JSON. Fix your JSON and try again.</div>;

    if (this.props.ui.modal.active) {
      content = 
        <div id='modal'>
          <div id='modal-upload-box'>
            <div id='modal-upload-header'>
              <div id='modal-upload-label'>Upload Script From JSON</div>
              <div id='modal-upload-close' onClick={this.handleClose}>&times;</div>
            </div>
            <div id='modal-upload-content-box'>
              <textarea id='modal-upload-content-textarea' placeholder='Copy JSON text here' spellCheck='false'></textarea>
            </div>
            {errorMessage}
            <div id='modal-upload-button-panel'>
              <label for='modal-upload-input' className='modal-upload-button'>Upload from file</label>
              <input id='modal-upload-input' type='file' accept=".json, application/json" />
              <button id='modal-upload-button-submit' className='modal-upload-button' onClick={this.handleSubmit}>Submit</button>
            </div>
          </div>
        </div>;
    };
    return (content);
  };
};

export default ModalUploadJson;