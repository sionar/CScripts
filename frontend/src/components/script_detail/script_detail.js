import React from 'react';
import { Redirect } from 'react-router-dom';
import ScriptDetailInfo from './script_detail_info_container';
import ScriptNavbar from '../script_navbar/script_navbar_container';
import ScriptDetailNight from './script_detail_night_container';
import ScriptCreateInfo from '../script_create/script_create_info_container';
import ScriptCreateCharSelect from '../script_create/char_select/script_create_char_select_container';
import ScriptCreateList from '../script_create/script_create_list_container';
import ScriptDetailContent from './script_detail_content_container';

class ScriptDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleShow = this.handleShow.bind(this);
    this.props.setUiViewPage('detail');
    this.props.setCreateScriptStatus(false);
    this.props.setDeleteScriptStatus(false);
    this.setVersionNumber = this.setVersionNumber.bind(this);
    const id = this.props.match.params.id;
    const token = this.props.auth.token;
    let versionId;

    if (this.props.ui.loading.create) {
      this.props.getCharacters(token).then(res => {
        if (!this.props.entities.scripts[id]) {
          this.props.setUiLoadingDetailStatus(true);
          this.props.getScript(id, token).then(res => {
            versionId = this.setVersionNumber();
            this.props.setNightOrder(this.props.entities.versions[versionId].characters);
          });
        } else {
          versionId = this.setVersionNumber();
          this.props.setUiLoadingDetailStatus(false);
          this.props.setScript(this.props.entities.scripts[id]);
          this.props.setVersion(this.props.entities.versions[versionId]);
          this.props.setNightOrder(this.props.entities.versions[versionId].characters);
        };
      });
    } else {
      this.props.resetChars();
      if (!this.props.entities.scripts[id]) {
        this.props.setUiLoadingDetailStatus(true);
        this.props.getScript(id, token).then(res => {
          this.setVersionNumber();
          this.props.setNightOrder(this.props.entities.versions[versionId].characters);
        });
      } else {
        versionId = this.setVersionNumber();
        this.props.setUiLoadingDetailStatus(false);
        this.props.setScript(this.props.entities.scripts[id]);
        this.props.setVersion(this.props.entities.versions[versionId]);
        this.props.setNightOrder(this.props.entities.versions[versionId].characters);
      };
    };
  };

  setVersionNumber() {
    const id = this.props.match.params.id;
    let versionNum = 0;
    let versionId;
    const versions = this.props.entities.versions;
    for (const [key,value] of Object.entries(this.props.entities.versions)) {
      if (value.script_id == id && value.version_num > versionNum) {
        versionNum = value.version_num;
        versionId = value.id;
      };
    };
    this.props.setUiDetailVersion(versionNum);
    return versionId;
  };

  handleShow(e) {
    e.preventDefault();
    this.props.setUiVisible(true);
  };

  render() {
    let content = null;
    let scriptBox = null;
    let navBox = null;

    if (this.props.ui.create.deleteStatus.deleted)
      return (<Redirect to='/'/>)

    if ('detail' in this.props.errors.script) {
      return (
        <div id='script-detail-error-permission'>
          You do not have permission to view this script.
        </div>
      )
    }

    if (this.props.ui.view.page == 'detail' && this.props.ui.detail.uiVisible)
      navBox =                 
        <nav id='script-detail-nav-box'>
          <ScriptNavbar />
        </nav>;

    const showButton = this.props.ui.view.page == 'detail' && !this.props.ui.detail.uiVisible ?
      <button id='script-detail-show-button' onClick={this.handleShow}><p>Show</p></button> : null;

    if (this.props.ui.view.mode == 'script' && !this.props.ui.view.editing)
      scriptBox = <ScriptDetailContent />;
    else if (this.props.ui.view.mode == 'night' && !this.props.ui.view.editing)
      scriptBox = <ScriptDetailContent />;
    else if (this.props.ui.view.mode == 'script' && this.props.ui.view.editing)
      scriptBox = <ScriptCreateList />;
    else
      scriptBox = <ScriptDetailNight />
    if (this.props.ui.view.editing == true) {
      content = 
        <div id='script-create-page-container'>
          <div id='script-create-page-box'>
            <div id='script-create-content-box'>
              <ScriptCreateInfo />
              <ScriptCreateCharSelect />
              <div id='script-create-script-box'>
                {scriptBox}
              </div>
              {navBox}
            </div>
          </div>
        </div>;
      } else {
        content = 
          <div id='script-detail-page-container'>
            <div id='script-detail-page-box'>
              <div id='script-detail-content-box'>
                <ScriptDetailInfo />
                {showButton}
                <section id='script-detail-script-box'>
                  {scriptBox}
                </section>
                {navBox}
              </div>
            </div>
          </div>;
      };
    return (content);
  };
};

export default ScriptDetail;