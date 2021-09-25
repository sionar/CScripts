import React from 'react';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import { convertToJson } from '../../util/helper_functions';
import jsPDF from 'jspdf'; 

class ScriptNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.handleMode = this.handleMode.bind(this);
    this.getData = this.getData.bind(this);
    this.handleDownloadJson = this.handleDownloadJson.bind(this);
    this.handleCopyJson = this.handleCopyJson.bind(this);
    this.handleExportImage = this.handleExportImage.bind(this);
    this.handleExportPdf = this.handleExportPdf.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  };

  handleMode(mode) {
    return e => {
      e.preventDefault();
      this.props.setUiViewMode(mode);
    };
  };

  handleEdit(e) {
    e.preventDefault();
    const status = !this.props.ui.view.editing;
    this.props.setUiViewEditing(status);
  }

  getData() {
    const scriptId = this.props.match.params.id;
    const scripts = Object.values(this.props.entities.scripts);
    const versions = Object.values(this.props.entities.versions);
    let characters = null;
    let script = null;
    scripts.every(s => {
      if (s.id == scriptId) {
        script = s;
        return false;
      }
      return true;
    })
    versions.every(v => {
      if (v.script_id == scriptId && v.version_num == this.props.ui.detail.version) {
        characters = v.characters;
        return false;
      }
      return true;
    })
    return {script: script, characters: characters}
  }

  handleDownloadJson(e) {
    e.preventDefault();
    const data = this.getData();
    let output = convertToJson(data.characters);
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(output));
    element.setAttribute('download', `${data.script.title}.json`);
    element.style.display = 'none';
    element.click();
  };

  handleCopyJson(e) {
    e.preventDefault();
    const data = this.getData();
    let output = convertToJson(data.characters);
    navigator.clipboard.writeText(output)
      .then(() => e.target.innerText = 'Copied!');
  };

  handleExportImage(e) {
    e.preventDefault();
    const data = this.getData();
    const element = document.getElementById('script-list');
    html2canvas(element, { allowTaint: true, useCORS: true })
      .then(canvas => {
        const dataURL = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = `${data.script.title}.png`;
        link.click();
       });
  };

  handleExportPdf(e) {
    e.preventDefault();
    this.props.setUiLoadingExportJsonStatus(true);
    const data = this.getData();
    const script = document.getElementById('script-list');
    const night1 = document.getElementById('script-night-first');
    const night2 = document.getElementById('script-night-other');
    const scriptType = this.props.entities.scripts[this.props.match.params.id].script_type;
    if (this.props.ui.view.mode == 'script') {
      night1.style.display = 'flex';
      night2.style.display = 'flex';
    } else if (this.props.ui.view.mode == 'night') {
      script.style.display = 'flex';
    };
    let page = document.getElementById('script-list');
    if (page.offsetHeight < 1397)
      page.style.minHeight = '1397px';
    let doc = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [988, page.offsetHeight]
    });
    html2canvas(page, { allowTaint: true, useCORS: true, scale: '2' })
      .then(canvas => {
        let img = canvas.toDataURL("image/jpeg");
        doc.addImage(img, 'JPEG', 0, 0, page.offsetWidth, page.offsetHeight);
        let page2 = document.getElementById('script-night-first');
        doc.addPage();
        html2canvas(page2, { allowTaint: true, useCORS: true, scale: '2' })
          .then(canvas2 => {
            img = canvas2.toDataURL("image/jpeg");
            doc.addImage(img, 'JPEG', 0, 0, page2.offsetWidth, page2.offsetHeight);
            let page3 = document.getElementById('script-night-other');
            doc.addPage();
            html2canvas(page3, { allowTaint: true, useCORS: true, scale: '2' })
              .then(canvas3 => {
                img = canvas3.toDataURL("image/jpeg");
                doc.addImage(img, 'JPEG', 0, 0, page3.offsetWidth, page3.offsetHeight);
                doc.save('file.pdf');
                if (this.props.ui.view.mode == 'script') {
                  night1.style.display = 'none';
                  night2.style.display = 'none';
                } else if (this.props.ui.view.mode == 'night') {
                  script.style.display = 'none';
                };
                page.style.minHeight = '';
                this.props.setUiLoadingExportJsonStatus(false);
              });
          });
      });
  };

  handleDelete(e) {
    e.preventDefault();
    const scriptId = this.props.match.params.id;
    this.props.setModalType('deleteScript');
    this.props.setModalActive(true);
    this.props.setDeleteScriptId(scriptId);
  }

  render() {
    let modeComponent = null;
    let downloadJsonComponent = null;
    let copyJsonComponent = null;
    let exportImageComponent = null;
    let exportPdfComponent = null;
    let editComponent = null;
    let deleteComponent = null;
    switch(this.props.ui.view.page) {
      case 'detail':
        if (!this.props.ui.loading.detail) {
          let scriptId = this.props.match.params.id;
          let owner = this.props.entities.scripts[scriptId].owner;
          copyJsonComponent = <button className='script-navbar-button copy' onClick={this.handleCopyJson}>Copy JSON to Clipboard</button>;
          downloadJsonComponent = <button className='script-navbar-button' onClick={this.handleDownloadJson}>Download JSON</button> 
          exportImageComponent = <button className='script-navbar-button' onClick={this.handleExportImage}>Download Image</button>;
          exportPdfComponent = this.props.ui.loading.exportJson ?
            <button className='script-navbar-button' onClick={this.handleExportPdf} disabled={true}>Downloading...</button> :
            <button className='script-navbar-button' onClick={this.handleExportPdf}>Download Pdf</button>;
          if (owner == this.props.auth.username) {
            if (this.props.ui.view.editing) {
              editComponent = <button className='script-navbar-button red' onClick={this.handleEdit}>Editing</button>;
            }
            else {
              editComponent = <button className='script-navbar-button' onClick={this.handleEdit}>Edit Script</button>;
              deleteComponent = <button className='script-navbar-button' onClick={this.handleDelete}>Delete Script</button>;
            }
          };
        };
        break;
      case 'create':
        break;
      default:
        editComponent = null;
    }
    if (this.props.ui.view.mode == 'script')
      modeComponent = <button className='script-navbar-button' onClick={this.handleMode('night')}>View Night Order</button>
    else
      modeComponent = <button className='script-navbar-button' onClick={this.handleMode('script')}>View Script</button>


    return (
      <div id='script-navbar'>
        {modeComponent}
        {copyJsonComponent}
        {downloadJsonComponent}
        {exportImageComponent}
        {exportPdfComponent}
        {editComponent}
        {deleteComponent}
      </div>
    );
  };
};

export default ScriptNavbar;