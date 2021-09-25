import React from 'react';
import { Link } from 'react-router-dom';
import HeaderAuth from './header_auth_container';

class Header extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    if (this.props.ui.view.page == 'detail' && !this.props.ui.detail.uiVisible)
      return null;

    return (
      <header id='header-container'>
        <div id='header-box-left'>
          <div id='header-title'><Link to={'/'}>Clocktower Scripts</Link></div>
        </div>
        <div id='header-box-center'>
          <div id='header-box-center-box'>
            <Link to={'/script/create'}>Create a Script</Link>
          </div>
        </div>
        <div id='header-box-right'>
          <HeaderAuth />
        </div>
      </header>
    );
  };
};

export default Header;