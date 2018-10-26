import React from 'react';
import {withRouter} from 'react-router-dom';
import './Home.css';


class Home extends React.Component{

  onClick = () => {
    const location = localStorage.getItem('authUser');
    //this.props.history.push(`/home/${location}`);
    window.location.href=`http://localhost:3000/home/${location}`;
  }


  render(){
    return(
      <div>
        <button className="home-button" onClick={this.onClick}> Home </button>
      </div>
    );
  }
}

const GoHome = withRouter(Home);

export default GoHome;
