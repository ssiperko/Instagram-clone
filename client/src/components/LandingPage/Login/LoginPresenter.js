import React from 'react';
import Login from './Login';
import {Link} from 'react-router-dom';
import './Login.css';


class LoginPresenter extends React.Component{
  render(){
    return(
      <div className="login-presenter-container">
        <div className="sign-in-login-container">
          <div className="login-mini-container">
            <div className="sign-up-header-container">
              <h1>Instagram</h1>
            </div>
            <Login />
            <div className="disclaimer">
              <h5> Forgot password? </h5>
            </div>
          </div>
          <div className="emailsignup-link-container">
            <h5>Dont have an account?<Link to ='./emailsignup' className="emailsignup-link"><h5>sign up</h5></Link></h5>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPresenter ;
