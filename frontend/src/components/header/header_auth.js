import React from 'react';
import { Link } from 'react-router-dom';

class HeaderAuth extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleModalRegister = this.handleModalRegister.bind(this);
    this.handleModalLogin = this.handleModalLogin.bind(this);
    if (this.props.auth.token != null) {
      const user = this.props.auth;
      this.props.addAuthUser(user);
    } else {
      this.props.getGuestAccount();
    }
  };

  handleLogout(e) {
    e.preventDefault();
    this.props.logout();
  };

  handleModalRegister(e) {
    e.preventDefault();
    this.props.setModalType('register');
    this.props.setModalActive(true);
  };

  handleModalLogin(e) {
    e.preventDefault();
    this.props.setModalType('login');
    this.props.setModalActive(true);
  };

  render() {
    let content;
    const auth = this.props.auth;
    if (auth.username != null && auth.is_guest == false) {
      content = 
        <div id='header-auth-box-logged-in'>
          <div id='header-auth-username'>Account</div>
          <div id='header-auth-dropdown'>
            <div className='header-auth-dropdown-button'>
              <Link id='header-auth-dropdown-button-link' to={`/user/${auth.username}`}>Profile</Link>
            </div>
            <div className='header-auth-dropdown-button' onClick={this.handleLogout}>Logout</div>
          </div>
        </div>
    } else {
      content =
        <div id='header-auth-box'>
          <div id='header-auth-box-logged-out'>
            <div class='header-auth-box-button' onClick={this.handleModalLogin}>Login</div>
            <div class='header-auth-box-button' onClick={this.handleModalRegister}>Register</div>
          </div>
        </div>
    };

    return (content);
  };
};

export default HeaderAuth;