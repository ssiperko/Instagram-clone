import React from 'react';
import {connect} from 'react-redux';
import {login_user} from '../../../Redux/actions/actions';
import {withRouter} from 'react-router-dom';
//import {loginUser} from '../../services';
import './Login.css';

class Log extends React.Component{

  state={
    email: '',
    password: '',
    user: '',
    formStyle: "sign-up-form-item",
    value1: "Mobile Number or Email",
    value2: 'password'
  };

  submit_handler(e){  //willbecomemapDispatchTOprops with redux
    e.preventDefault();
    //localStorage.clear();
    let email = this.state.email;
    let password = this.state.password;
    this.props.login_user(email, password, this.props.history.push);
  }

  change_handler(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  componentDidUpdate(){
    if(localStorage.getItem("authUser") !== this.state.user){
      this.setState({user: localStorage.getItem('authUser')});
    }
    if(this.props.login === "login failed"){
      console.log("you failed, but you really succeeded")
      if(this.state.formStyle === "sign-up-form-item"){
      this.setState({
        formStyle: "sign-up-form-item-error",
        value1: 'invalid email or password',
        value2: 'not valid'
      })
      }
    }
  }

  render(){
    return(
      <div>
          <form className="sign-up-form-container">
              <input onChange={this.change_handler.bind(this)} className={this.state.formStyle} type="text" name="email" placeholder={this.state.value1}></input>
              <input onChange={this.change_handler.bind(this)} className={this.state.formStyle} type="text" name="password" placeholder={this.state.value2}></input>
          </form>
          <button className="submit-button" onClick={this.submit_handler.bind(this)}> log in</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login : state.login.user
});

const Login = connect(mapStateToProps, {login_user})(Log);

export default withRouter(Login);
