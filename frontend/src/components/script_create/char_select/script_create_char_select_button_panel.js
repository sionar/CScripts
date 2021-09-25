import React from 'react';
import { scriptSizeRandom, characterTypes } from '../../../util/constants';
import { shuffle } from '../../../util/helper_functions';

class ScriptCreateCharSelectButtonPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClear = this.handleClear.bind(this);
    this.handleRandom = this.handleRandom.bind(this);
    this.handleImport = this.handleImport.bind(this);
  };

  handleClear(e) {
    e.preventDefault();
    this.props.resetChars();
  };

  handleRandom(e) {
    e.preventDefault();
    this.props.resetChars();
    const characters = {};
    const mode = this.props.ui.create.script.script_type;
    characterTypes.forEach(type => {
      characters[type] = shuffle(this.props.ui.create.version.unusedChars.filter(character => {return character.char_type == type}))
    });
    characterTypes.forEach(type => {
      for (let i = 0; i < scriptSizeRandom[mode][type]; i++)
        this.props.addVersionChar(characters[type].pop());
    });
  };

  handleImport(e) {
    e.preventDefault();
    this.props.setUploadJsonErrors(false);
    this.props.setModalType('uploadJSON');
    this.props.setModalActive(true);
  };

  render() {
    const content =
      <div id='script-create-char-button-panel'>
        <button id='script-create-char-button-import' className='script-create-char-button' onClick={this.handleImport}>Import from JSON</button>
        <button id='script-create-char-button-random' className='script-create-char-button' onClick={this.handleRandom}>Randomize</button>
        <button id='script-create-char-button-reset' className='script-create-char-button' onClick={this.handleClear}>Clear List</button>
      </div>;

    return (content);
  };
};

export default ScriptCreateCharSelectButtonPanel;