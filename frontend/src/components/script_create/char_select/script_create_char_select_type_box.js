import React from 'react';
import { Link } from 'react-router-dom';
import ScriptCreateCharSelectChar from './script_create_char_select_char_container';
import ScriptCreateCharSelectTypeLabel from './script_create_char_select_type_label_container';

class ScriptCreateCharSelectTypeBox extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    let characters = null;
    if (this.props.ui.create.charSelectTab[this.props.type]) {
      characters = this.props.characters.map(character=> {
        return <ScriptCreateCharSelectChar character={character}/>
      });
    };
    const content =
      <div 
        id={`script-create-char-select-type-box-${this.props.type.toLowerCase()}`} 
        className='script-create-char-select-type-box'>
        <ScriptCreateCharSelectTypeLabel type={this.props.type}/>
        <div className='script-create-char-select-character-list'>
          {characters}
        </div>
      </div>;

    return (content)
  };
};

export default ScriptCreateCharSelectTypeBox;