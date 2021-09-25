import React from 'react';

class ScriptDetailSelectVersion extends React.Component {
  constructor(props) {
    super(props);
    this.handleVersion = this.handleVersion.bind(this);
  };

  handleVersion(e) {
    const versionNum = Number(e.target.value.replace(/\D/g,''));
    this.props.setUiDetailVersion(versionNum);
    const scriptId = this.props.match.params.id;
    const versions = Object.values(this.props.entities.versions);
    const version = versions.find(version => version.script_id == scriptId && version.version_num == versionNum);
    this.props.setNightOrder(version.characters);
  };

  render() {
    const scriptId = this.props.match.params.id;
    const versions = Object.values(this.props.entities.versions);
    let filteredVersions = versions.filter(version => { return version.script_id == scriptId});
    filteredVersions.sort((el1, el2) => {
      if (el1.version_num > el2.version_num)
        return -1;
      return 1;
    });
    const selectOptions = filteredVersions.map(version => 
      <option >Version {version.version_num}</option>
    );
    const content =           
      <select id='script-detail-info-select' onChange={this.handleVersion}>
        {selectOptions}
      </select>;

    return (content) 
  };
};

export default ScriptDetailSelectVersion;