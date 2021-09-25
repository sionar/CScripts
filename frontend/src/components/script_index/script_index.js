import React from 'react';
import ScriptIndexSearchbar from './script_index_searchbar_container';
import ScriptIndexScript from './script_index_script_container';

class ScriptIndex extends React.Component {
  constructor(props) {
    super(props);
    this.props.setUiViewPage('index');
    this.props.getScripts('');
  };

  render() {
    const users = this.props.entities.users;
    const scripts = this.props.entities.scripts;
    let scriptsArr = this.props.ui.index.scripts.map(scriptId => this.props.entities.scripts[scriptId]);
    scriptsArr = scriptsArr.filter(script => {
      return script.owner != null && users[script.owner].is_guest == false;
    });
    let rows = <div></div>;
    let title;
    if (!this.props.ui.loading.index) {
      rows = scriptsArr.map(script => <ScriptIndexScript script={script}/>)
    };

    return (
      <div id='script-index-container'>
        <ScriptIndexSearchbar />
        <section id='script-index-table-header'>
          <div id='script-index-header-title'>Title</div>
          <div id='script-index-header-author'>Author</div>
          <div id='script-index-header-type'>Script Type</div>
          </section>
        <main id='script-index-table'>
          {rows}
        </main>
      </div>
    );
  };
};

export default ScriptIndex;