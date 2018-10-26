import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LandingHome from './components/LandingPage/LandingHome/LandingHome';
import LoginPresenter from './components/LandingPage/Login/LoginPresenter';
import EmailSignUpPresenter from './components/LandingPage/EmailSignUp/EmailSignUpPresenter';
import Profile from './components/Profile/ProfilePresenter';
import BlowOutWrapper from './components/Profile/ProfileFeed/FeedItemBlowOut/FeedItemBlowOut';
import Explore from './components/Explore/Explore';
import Settings from './components/Profile/ProfileHeader/ProfileSettings/ProfileSettings';


class Gate extends React.Component {
  render(){
    return(
      <div>
        <Switch>
          <Route exact path="/" component={LandingHome} />
          <Route path ='/login' component ={LoginPresenter}/>
          <Route path = '/emailsignup' component = {EmailSignUpPresenter} />
          <Route path = '/home/:username' component = {Profile} />
          <Route path = '/:username/:photo_id' component = {BlowOutWrapper} />
          <Route path = '/explore' component = {Explore} />
          <Route path = '/settings' component = {Settings} />
        </Switch>
      </div>
    );
  }
}

export default Gate;
