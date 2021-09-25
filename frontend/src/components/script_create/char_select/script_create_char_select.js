import React from 'react';
import ScriptCreateCharSelectTypeBox from './script_create_char_select_type_box_container';
import ScriptCreateCharSelectButtonPanel from './script_create_char_select_button_panel_container';

class ScriptCreateCharSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
  };

  handleInput(e) {
    e.preventDefault();
    this.props.setFilterInput(e.target.value);
  };

  render() {
    let content = <div id='script-create-char-select'></div>;
    if (!this.props.ui.loading.create) {
      const charTypes = ['Townsfolk', 'Outsider', 'Minion', 'Demon', 'Traveller', 'Fabled'];
      const sortedChars = {}
      let characters = this.props.ui.create.version.unusedChars;
      const filter = this.props.ui.create.version.filter;
      if (filter != "") {
        characters = characters.filter(character => {
          return character.name.toLowerCase().includes(filter.toLowerCase());
        });
      };
      charTypes.forEach(charType => {
        sortedChars[charType] = characters.filter(character => {
          return character.char_type == charType;
        });
      });
      const components = charTypes.map(charType => {
        return <ScriptCreateCharSelectTypeBox type={charType} characters={sortedChars[charType]} />;
      });
      content = 
        <section id='script-create-char-select'>
          <ScriptCreateCharSelectButtonPanel />
          <input id='script-create-char-filter-input' placeholder='Filter characters by name...' onChange={this.handleInput} value={this.props.ui.create.version.filter} autocomplete='off'></input>
          <div id='script-create-char-select-select-box'>
            {components}
          </div>
        </section>;
    };
    return (content);
  };
};

export default ScriptCreateCharSelect;