import React from 'react';
import { AuthRoute, ProtectedRoute } from '../../util/route_util';
import { Route, Switch } from 'react-router-dom';
import Modal from '../modal/modal_container';
import Header from '../header/header_container';
import ScriptIndex from '../script_index/script_index_container';
import ScriptCreate from '../script_create/script_create_container';
import ScriptDetail from '../script_detail/script_detail_container';
import UserProfile from '../user_profile/user_profile_container';

class Main extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div id='main-div'>
        <Header />
        <Modal />
        <Switch>
          <Route exact path='/' component={ScriptIndex} />
          <Route exact path='/script/create' component={ScriptCreate} /> 
          <Route path='/script/:id' component={ScriptDetail} />
          <Route path='/user/:username' component={UserProfile} />
        </Switch>
      </div>
    )
  };
};

export default Main;