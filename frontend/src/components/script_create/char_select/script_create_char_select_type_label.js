import React from 'react';

class ScriptCreateCharSelectTypeLabel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  };

  handleClick(e) {
    e.preventDefault();
    const type = this.props.type;
    const status = !(this.props.ui.create.charSelectTab[type]);
    this.props.setUiCreateCharSelectTab(type, status);
  };

  render() {
    const type = this.props.type;
    const status = this.props.ui.create.charSelectTab[this.props.type] ? 'active' : 'inactive';
    const content =
      <button className='script-create-char-select-type-label' onClick={this.handleClick}>{type}
        <div className={`script-create-char-select-type-arrow-${status}`}></div>
      </button>;

    return (content);
  };
};

export default ScriptCreateCharSelectTypeLabel;