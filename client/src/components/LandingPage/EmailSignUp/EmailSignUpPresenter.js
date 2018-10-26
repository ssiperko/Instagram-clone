import React from 'react';
import SignUpLoginBox from '../LandingHome/SignUpLoginBox/SignUpLoginBox';
import '../LandingHome/SignUpLoginBox/SignUpLoginBox.css';

class EmailSignUpPresenter extends React.Component{
  render(){
    return(
      <div className='email-signup-presenter-container'>
        <SignUpLoginBox />
      </div>
    );
  }
}

export default EmailSignUpPresenter;
