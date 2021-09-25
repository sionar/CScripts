import React from 'react';
import { Link } from 'react-router-dom';
import ScriptCreateInfo from './script_create_info_container';
import ScriptCreateCharSelect from './char_select/script_create_char_select_container';
import ScriptCreateList from './script_create_list_container';
import ScriptCreateNight from './script_create_night_container';
import ScriptNavbar from '../script_navbar/script_navbar_container';

class ScriptCreate extends React.Component {
  constructor(props) {
    super(props);
    this.props.setUiViewPage('create');
    this.props.setCreateScriptStatus(false);
    this.props.clearScript();

    if (this.props.ui.loading.create) {
      const token = this.props.auth.token;
      this.props.getCharacters(token);
      this.props.initializeCreateScript();
    };
    if (this.props.auth.token != null) {
      const owner = { username: this.props.auth.username, is_guest: this.props.auth.is_guest };
      this.props.setScriptOwner(owner);
    }
  };

  render() {
    const viewComponent = this.props.ui.view.mode == 'script' ? <ScriptCreateList /> : <ScriptCreateNight />;
    return (
      <div id='script-create-page-container'>
        <div id='script-create-page-box'>
          <div id='script-create-content-box'>
            <ScriptCreateInfo />
            <ScriptCreateCharSelect />
            <section id='script-create-script-box'>
              {viewComponent}
            </section>
            <nav id='script-create-nav-box'>
              <ScriptNavbar />
            </nav>
          </div>
        </div>
      </div>
    );
  };
};

export default ScriptCreate;