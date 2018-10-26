import React from 'react';
import FacebookLogin from 'react-facebook-login';

class FBLogin extends React.Component{
    render(){
      return(
          <div>
          <FacebookLogin
            appId="465061713934362"
            fields="name,email,picture"
            callback={this.props.onClick}
            />
        </div>
      );
    }
}

export default FBLogin;
