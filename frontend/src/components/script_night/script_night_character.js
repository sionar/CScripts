import React from 'react';

class ScriptNightCharacter extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    const character = this.props.character;
    const night = this.props.night;
    const description = this.props.night == 'first' ? character.night_first_desc : character.night_other_desc;
    const crossOrigin = this.props.ui.view.page == 'detail' && !this.props.ui.view.editing ? 'anonymous' : null;
    const detailCache = this.props.ui.view.page == 'detail' && !this.props.ui.view.editing ? '&detail' : '';

    const content = 
      <div className={`script-night-character-box ${this.props.size}`}>
        <div className={`script-night-label-box ${this.props.size}`}>
          <div className={`script-night-image-box ${this.props.size}`}>
            <img className={`script-night-image ${this.props.size}`} src={`${character.image}${detailCache}`} crossOrigin={crossOrigin}/>
          </div>
          <div className={`script-night-label ${this.props.size}`}>{character.name}</div>
          <div className={`script-night-character-desc ${this.props.size}`}>{description}</div>
        </div>
      </div>

    return (content);
  };
};

export default ScriptNightCharacter;