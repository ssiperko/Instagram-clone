import React, {Fragment} from 'react';
import EmailSignUp from '../../EmailSignUp/EmailSignUp';
import FBLogin from '../../FacebookLogin/FacebookLogin';
import {Link} from 'react-router-dom';
import './SignUpLoginBox.css';

class SignUpLoginBox extends React.Component {
    render(){
      return(
        <Fragment>
            <div className="sign-in-login-container">
                <div className="sign-up-container">
                    <div className="sign-up-header-container">
                        <h1>Instagram</h1>
                        <h5>Sign up to see photos and <br /> videos from your friends.</h5>
                    </div>
                    <div className="facebook-login-container">
                      <FBLogin />
                    </div>
                    <div className="sign-up-divider">
                        <hr className="hr"/>
                        <h6> OR </h6>
                        <hr className="hr"/>
                    </div>
                    <EmailSignUp />
                    <div className="disclaimer">
                      <p><strong> * </strong>This is not the real instagram <br /><strong>Do not </strong>use any personal information<br /></p>                    </div>
                </div>
                <div className="login-container">
                    <h5 className='login-link'>Have an account? <br /><Link to ='./login' className='login-link-'><h3> log in</h3></Link></h5>
                </div>
            </div>
        </Fragment>
      );
    }
};

export default SignUpLoginBox
