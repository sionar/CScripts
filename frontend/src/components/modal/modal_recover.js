import React from 'react';

class ModalRecover extends React.Component {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitEmail = this.handleSubmitEmail.bind(this);
    this.handleSubmitPasswordReset = this.handleSubmitPasswordReset.bind(this);
    this.handleSwitchModal = this.handleSwitchModal.bind(this);
    this.handleReceivedToken = this.handleReceivedToken.bind(this);
    this.handleRequestToken = this.handleRequestToken.bind(this);
    this.generateBody = this.generateBody.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  };

  handleClose(e) {
    e.preventDefault();
    this.props.setModalActive(false);
  };

  handleChange(field) {
    return (e) => {
      e.preventDefault();
      this.props.setRecoverField(field, e.target.value);
    };
  };

  handleSubmitEmail(e) {
    e.preventDefault();
    this.props.setUiLoadingRecoverEmailStatus(true);
    this.props.sendRecoverEmail({email: this.props.ui.recover.email})
      .then(() => {})
      .catch(() => {})
      .then(() => {
        this.props.setUiLoadingRecoverEmailStatus(false);
      });
  };

  handleSubmitPasswordReset(e) {
    e.preventDefault();
    const data = {
      token: this.props.ui.recover.token,
      password: this.props.ui.recover.password
    }
    this.props.setUiLoadingRecoverPasswordStatus(true);
    this.props.recoverChangePassword(data)
      .then(() => {})
      .catch(() => {})
      .then(() => {
        this.props.setUiLoadingRecoverPasswordStatus(false);
      });
  }

  handleSwitchModal(modalType) {
    return (e) => {
      e.preventDefault();
      if (this.props.ui.recover.passwordChanged)
        this.props.clearRecoverState();
      this.props.setModalType(modalType);
    };
  };

  handleReceivedToken(e) {
    e.preventDefault();
    this.props.setRecoverEmailSent(true);
  }

  handleRequestToken(e) {
    e.preventDefault();
    this.props.setRecoverEmailSent(false);
  }

  handleBlur(e) {
    if (this.props.ui.recover.password.length < 8)
      this.props.setRecoverErrorPasswordLength();
    if (this.props.ui.recover.password2.length != 0 && this.props.ui.recover.password != this.props.ui.recover.password2)
      this.props.setRecoverErrorPasswordsMatch();
  }

  generateBody() {
    let labelDescEmail = <div className='modal-recover-label-error' id='modal-recover-label-error-email'></div>;
    if (this.props.errors.auth.emailFailed)
      labelDescEmail = <div className='modal-recover-label-error' id='modal-recover-label-error-email'>Invalid email.</div>;

    let labelDescToken = <div className='modal-recover-label-error' id='modal-recover-label-error-token'></div>;
    if (this.props.errors.auth.tokenInvalid)
      labelDescToken = <div className='modal-recover-label-error' id='modal-recover-label-error-email'>Invalid token.</div>;

    let labelDescPassword = <div className='modal-recover-label-error' id='modal-recover-label-error-password'></div>;
    if (this.props.errors.auth.recoverPasswordShort)
      labelDescPassword = <div className='modal-recover-label-error' id='modal-recover-label-error-password'>This password is too short.</div>;

    let labelDescPassword2 = <div className='modal-recover-label-error' id='modal-recover-label-error-password2'></div>;
    if (this.props.errors.auth.recoverPasswordsDontMatch)
      labelDescPassword2 = <div className='modal-recover-label-error' id='modal-recover-label-error-password2'>Passwords do not match.</div>;

    let submitEmailButton = <input className='modal-recover-submit-email' type='submit' onClick={this.handleSubmitEmail} value='Send Email'/>;
    if (this.props.ui.recover.email == '' || this.props.errors.auth.emailFailed)
      submitEmailButton = <input className='modal-recover-submit-email disabled' type='submit' onClick={this.handleSubmitEmail} value='Send Email' disabled={true}/>;
    else if (this.props.ui.loading.sendEmail)
      submitEmailButton = <input className='modal-recover-submit-email' type='submit' onClick={this.handleSubmitEmail} value='Sending Email...' disabled={true}/>;

    let submitPasswordButton = <input className='modal-recover-submit-password' type='submit' onClick={this.handleSubmitPasswordReset} value='Reset Password'/>;
    if (this.props.ui.recover.password == '' || this.props.ui.recover.password2 == '' || this.props.errors.auth.recoverPasswordShort || this.props.errors.auth.recoverPasswordsDontMatch ||
      this.props.ui.recover.token == '' || this.props.errors.auth.tokenInvalid)
      submitPasswordButton = <input className='modal-recover-submit-password disabled' type='submit' onClick={this.handleSubmitPasswordReset} value='Reset Password' disabled={true}/>;
    else if (this.props.ui.loading.changePassword)
      submitPasswordButton = <input className='modal-recover-submit-password' type='submit' onClick={this.handleSubmitPasswordReset} value='Changing Password...' disabled={true}/>;

    if (this.props.ui.recover.passwordChanged)
      return (
        <div id='modal-recover-body'>
          <div id='modal-recover-desc'>Your password has been changed.</div>
          <div id='modal-recover-return' onClick={this.handleSwitchModal('login')}>Return to Login</div>
        </div>
      );

    if (!this.props.ui.recover.emailSent) {
      return (
        <div id='modal-recover-body'>
          <div id='modal-recover-desc'>To reset your password, enter in your email. A password reset token will be sent to your email inbox shortly.</div>
          <form id='modal-recover-form'>
            <div id='modal-recover-inputs-box'>
                <div id='modal-recover-email-box' className='modal-recover-content-box'>
                  <div className='modal-recover-label-box'>
                    <div className='modal-recover-label' id='modal-recover-label-email'>Email</div>
                    {labelDescEmail}
                  </div>
                  <input className='modal-recover-input' id='modal-recover-input-email' 
                    onChange={this.handleChange('email')} value={this.props.ui.recover.email} type='email' autoComplete='off'/>
                  {submitEmailButton}
                </div>
            </div>
            <div id='modal-recover-email-received-button' onClick={this.handleReceivedToken}>I already have a password reset token.</div>
          </form>
        </div>);
    } else {
      return (
        <div id='modal-recover-body'>
          <div id='modal-recover-desc'>A password reset token has been sent to your email. Input it here along with your new password to reset your password.</div>
          <form id='modal-recover-form'>
              <div id='modal-recover-inputs-box'>

                <div id='modal-recover-token-box' className='modal-recover-content-box'>
                  <div className='modal-recover-label-box'>
                    <div className='modal-recover-label' id='modal-recover-label-token'>Password reset token</div>
                    {labelDescToken}
                  </div>
                  <input className='modal-recover-input' id='modal-recover-input-token'
                    onChange={this.handleChange('token')} value={this.props.ui.recover.token} type='text' autoComplete='off'/>
                </div>

                <div id='modal-recover-password-box' className='modal-recover-content-box'>
                  <div className='modal-recover-label-box'>
                    <div className='modal-recover-label' id='modal-recover-label-password1'>Password</div>
                    {labelDescPassword}
                  </div>
                  <input className='modal-recover-input' id='modal-recover-input-password'
                    onChange={this.handleChange('password')} onBlur={this.handleBlur} type='password' placeholder='Must be at least 8 characters long.'/>
                </div>

                <div id='modal-recover-password2-box' className='modal-recover-content-box'>
                  <div className='modal-recover-label-box'>
                    <div className='modal-recover-label' id='modal-recover-label-password2'>Repeat Password</div>
                    {labelDescPassword2}
                  </div>
                  <input className='modal-recover-input' id='modal-recover-input-password2'
                    onChange={this.handleChange('password2')} onBlur={this.handleBlur} type='password'/>
                </div>
                {submitPasswordButton}
                <div id='modal-recover-request-token' onClick={this.handleRequestToken}>I need a new password reset token.</div>
              </div>
            </form>
        </div>
      );
    };
  };


  render() {
    let content = null;
    const body = this.generateBody();

    if (this.props.ui.modal.active) {
      content =
        <div id='modal'>
          <div id='modal-recover-box'>    
            <div id='modal-recover-header'>
              <div id='modal-recover-header-label'>Reset your password</div>
              <div id='modal-recover-header-close' onClick={this.handleClose}>&times;</div>
            </div>
            <div id='modal-recover-nav'>
              <div id='modal-recover-nav-login' className='modal-recover-nav-button' onClick={this.handleSwitchModal('login')}>Login</div>
              <div id='modal-recover-nav-register' className='modal-recover-nav-button' onClick={this.handleSwitchModal('register')}>Register</div>
              <div id='modal-recover-nav-recover' className='modal-recover-nav-button'>Reset your password</div>
            </div>
            {body}
          </div>
        </div>
    };
    return (content);
  };
};

export default ModalRecover;