import React from 'react';
import ScriptList from '../script_list/script_list_container';
import ScriptNight from '../script_night/script_night_container';

class ScriptDetailContent extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let content = <div id='script-detail-content'></div>;
    if (!this.props.ui.loading.detail) {
      const script = this.props.ui.view.editing ? 
        this.props.ui.create.script :
        this.props.entities.scripts[this.props.match.params.id];
      const size = this.props.ui.view.editing ? 'small' : 'large';
      const versions = this.props.entities.versions;
      let version = null;
      for (const key in versions) {
        if (versions[key].script_id == this.props.match.params.id && versions[key].version_num == this.props.ui.detail.version) {
          version = versions[key];
          break;
        };
      };
      if (version == null)
        return null;
      const characters = version.characters;
      content = 
      <div id='script-detail-content'>
        <ScriptList size={size} title={script.title} scriptType={script.script_type} characters={characters}/>
        <ScriptNight size={size} night='first' script={script}/>
        <ScriptNight size={size} night='other' script={script}/>
      </div>;
    };
    return (content);
  };
};

export default ScriptDetailContent;