import React, {Fragment} from 'react';
import SignUpLoginBox from './SignUpLoginBox/SignUpLoginBox';
import './LandingHome.css';

class LandingHome extends React.Component{
  render(){
    return(
      <Fragment>
          <div className='landing-container'>
              <div className="photo-container">
                  <img className="landing-img" src="https://res.cloudinary.com/dzwiiqcr2/image/upload/v1533148908/wd61vhjfsscyxzzoxefm.png" alt="landing" />
              </div>
              <SignUpLoginBox className="sign-up"/>
          </ div>
      </Fragment>
    );
  }
}

export default LandingHome;
