import React from 'react';
import { Link } from 'react-router-dom';
import ScriptDetailSelectVersion from './script_detail_select_version_container';

class ScriptDetailInfo extends React.Component {
  constructor(props) {
    super(props);
    this.handleHide = this.handleHide.bind(this);
  };

  handleHide(e) {
    e.preventDefault();
    this.props.setUiVisible(false);
  };

  render() {
    let content;
    if (!this.props.ui.detail.uiVisible)
      return null;

    if (this.props.ui.loading.detail) {
      content =
        <section id='script-detail-info'>
          <p>Loading</p>
        </section>;
    } else {
      const scriptId = this.props.match.params.id;
      const script = this.props.entities.scripts[scriptId];
      const versions = Object.values(this.props.entities.versions);
      const title = script.title? script.title : <i>Untitled Script</i>;
      const author = script.author ? script.author : <div>anonymous author</div>;
      const owner = script.owner && this.props.entities.users[script.owner].is_guest == false ? this.props.entities.users[script.owner].username : '';
      const ownerLink = owner != '' ? <Link to={`../user/${owner}`}>{owner}</Link> : <i>anonymous user</i>;

      content = 
        <section id='script-detail-info'>
          <button id='script-detail-hide-button' onClick={this.handleHide}><p>Hide</p></button>
          <ScriptDetailSelectVersion />
          <div id='script-detail-info-title'>{title}</div>
          <div id='script-detail-info-author-box'>
            <div id='script-detail-info-author-label'>Created by</div>
            <div id='script-detail-info-author-value'>{author}</div>
          </div>
          <div id='script-detail-info-owner'>Uploaded by {ownerLink}</div>
          <div id='script-detail-info-description'>{script.description}</div>
        </section>;
    };
    return (content);
  };
};

export default ScriptDetailInfo;