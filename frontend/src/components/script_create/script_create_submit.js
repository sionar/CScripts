import React from 'react';

class ScriptCreateSubmit extends React.Component {
  constructor(props) {
    super(props);
    this.prepareData = this.prepareData.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleSaveNew = this.handleSaveNew.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  };

  prepareData() {
    const script = Object.assign({}, this.props.ui.create.script);
    if (this.props.ui.view.page == 'detail')
      script.id = this.props.match.params.id;
    const token = this.props.auth.token;
    let characters = this.props.ui.create.version.usedChars.map(character => {
      return {id: character.id};
    });
    const version = {characters: characters};
    return {script: script, token: token, characters: this.props.entities.characters, version: version};
  };

  handleCreate(e) {
    e.preventDefault();
    const data = this.prepareData();
    this.props.setUiLoadingPostScript(true);
    this.props.createScript(data.script, data.version, data.characters, data.token);
    e.target.innerText = 'Creating a new script...';
  };

  handleSaveNew(e) {
    e.preventDefault();
    const data = this.prepareData();
    this.props.setUiLoadingPostScript(true);
    this.props.saveNewVersion(data.script, data.version, data.characters, data.token);
    e.target.innerText = 'Updating script...';
  };

  handleUpdate(e) {
    e.preventDefault();
    let data = this.prepareData();
    const scriptId = this.props.match.params.id;
    const versions = this.props.entities.versions;
    let versionNum = 0;
    let versionId = null;
    Object.values(versions).forEach(version => {
      if (version.script_id == scriptId && version.version_num > versionNum) {
        versionNum = version.version_num;
        versionId = version.id
      };
    });
    data.version.id = versionId;
    this.props.setUiLoadingPostScript(true);
    this.props.updateVersion(data.script, data.version, data.characters, data.token);
    e.target.innerText = 'Updating script...';
  };

  render() {
    let content;
    const disabled = this.props.ui.loading.postScript;
    if (this.props.ui.view.page == 'create')
      content = <button className='script-create-info-button' onClick={this.handleCreate} disabled={disabled}>Save Script</button>;
    else
      content = 
        <div id='script-create-info-button-panel'>
          <button id='script-create-info-button-left' className='script-create-info-button' onClick={this.handleSaveNew} disabled={disabled}>Save as new version</button>
          <button id='script-create-info-button-right' className='script-create-info-button' onClick={this.handleUpdate} disabled={disabled}>Update current version</button>
        </div>;
    return (content);
  };
};

export default ScriptCreateSubmit;