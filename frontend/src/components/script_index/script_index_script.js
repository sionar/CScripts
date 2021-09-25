import React from 'react';
import { Link } from 'react-router-dom';
import ScriptList from '../script_list/script_list_container';

class ScriptIndexScript extends React.Component {
  constructor(props) {
    super(props);
    this.state = {expanded: false};
    this.handleExpand = this.handleExpand.bind(this);
  };

  handleExpand(e) {
    e.preventDefault();
    this.setState((state, props) => {
      return {expanded: !state.expanded};
    })
  }

  render() {
    let expandButton = <div className='script-index-table-expand-button' onClick={this.handleExpand}>&#43;</div>;
    let scriptList = null;
    const script = this.props.script;
    const versions = Object.values(this.props.entities.versions).filter(version => {return version.script_id == script.id});
    let latestVersionId;
    let versionNum = 0;
    versions.forEach(version => {
      if (version.version_num > versionNum) {
        versionNum = version.version_num;
        latestVersionId = version.id;
      };
    });
    let characters = null;
    if (versionNum > 0)
      characters = this.props.entities.versions[latestVersionId].characters;

    const title = script.title? script.title : 'Untitled Script';
    if (this.state.expanded) {
      expandButton = <div className='script-index-table-expand-button expanded' onClick={this.handleExpand}>&#8722;</div>;
      scriptList = <ScriptList size='small' title={script.title} scriptType={script.script_type} characters={characters}/>
    };

    const content = 
      <div className='script-index-table-data-row'>
        <div className='script-index-table-data-row-info'>
          <div className='script-index-table-title'>
            {expandButton}
            <Link to={`/script/${script.id}`}>{title}</Link>
          </div>
          <div className='script-index-table-author' >{script.author}</div>
          <div className='script-index-table-type'>{script.script_type}</div>
        </div>
        <div className='script-index-table-script-list'>
          {scriptList}
        </div>
      </div>

    return ( content );
  };
};

export default ScriptIndexScript;