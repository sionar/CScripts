import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { scriptSizeLabel } from '../../util/constants';
import ScriptCreateSubmit from './script_create_submit_container';

class ScriptCreateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleTitle = this.handleTitle.bind(this);
    this.handleAuthor = this.handleAuthor.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleVisible = this.handleVisible.bind(this);
    this.handleScriptType = this.handleScriptType.bind(this);
  };

  handleTitle(e) {
    e.preventDefault();
    this.props.setScriptTitle(e.target.value);
  };

  handleAuthor(e) {
    e.preventDefault();
    this.props.setScriptAuthor(e.target.value);
  };

  handleDescription(e) {
    e.preventDefault();
    this.props.setScriptDescription(e.target.value);
  };

  handleVisible(e) {
    const checkbox = e.target;
    this.props.setScriptVisible(checkbox.checked);
  };

  handleScriptType(e) {
    e.preventDefault();
    const value = e.target.value;
    let scriptType;
    if (value.includes('Normal'))
      scriptType = 'Normal';
    else if (value.includes('Teensyville'))
      scriptType = 'Teensyville';
    else
      scriptType = 'Phobos';
    this.props.setScriptType(scriptType);
    this.props.trimUsedCharacters(scriptType);
  };

  render() {
    let content;
    const created = this.props.ui.create.createStatus.created;
    const scriptId = this.props.ui.create.createStatus.scriptId;
    const disabled = this.props.auth.is_guest;
    const owner = this.props.auth;

    if (created == true && scriptId != null)
      return (<Redirect to={`${scriptId}`}></Redirect>);

    if (this.props.ui.loading.create)
      content = <section id='script-create-info'></section>;
    else {
      let ownerDiv = <div id='script-create-info-owner'>Uploaded by <i>anonymous user</i></div>;
      if (!owner.is_guest) {
        const username = owner.username;
        ownerDiv = <div id='script-create-info-owner'>Uploaded by <Link to={`../user/${username}`}>{username}</Link></div>;
      };
      const visible = this.props.ui.create.script.visible ? 'Visible to the public' : 'Not visible to the public';
      let visibleBox =           
      <div id='script-create-info-visible-box'>
        <label id='script-create-info-visible-switch' className='switch'>
          <input id='script-create-info-visible-box-input' type='checkbox' value={this.props.ui.create.script.visible} onChange={this.handleVisible} defaultChecked={this.props.ui.create.script.visible} disabled={disabled}></input>
          <span id='script-create-info-visible-box-slider' className='slider round'></span>
        </label>
        <div id='script-create-info-visible-box-label'>{visible}</div>
      </div>;
      if (owner.is_guest)
        visibleBox = null;

      content = 
        <section id='script-create-info'>
          <input id='script-create-info-title' type='text' name='title' placeholder='Untitled Script' autocomplete='off' value={this.props.ui.create.script.title} onChange={this.handleTitle} ></input>
          <div id='script-create-info-author-box'>
            <div id='script-create-info-author-label'>Created by </div>
            <input id='script-create-info-author-input' type='text' name='author' placeholder='anonymous author' autocomplete='off' value={this.props.ui.create.script.author} onChange={this.handleAuthor}></input>
          </div>
          {ownerDiv}
          <textarea id='script-create-info-description' name='description' placeholder='Script description.' maxLength='10000' value={this.props.ui.create.script.description} onChange={this.handleDescription}></textarea>
          <div id='script-create-info-script-type-box'>
            <div id='script-create-info-script-type-label'>Script Type:</div>
            <select id='script-create-info-script-type-select' value={scriptSizeLabel[this.props.ui.create.script.script_type]} onChange={this.handleScriptType}>
              <option>Normal (13/4/4/4)</option>
              <option>Teensyville (6/2/2/1)</option>
              <option>Phobos (Any)</option>
            </select>
          </div>
          {visibleBox}
          <ScriptCreateSubmit />
        </section>
    };
    return (content);
  };
};

export default ScriptCreateInfo;