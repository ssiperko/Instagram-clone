import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {addUser} from '../../services';
import './EmailSignUp.css';

class EmailSignUp extends React.Component{

  state={
    email: '',
    fullName: '',
    userName: '',
    password: '',
    style: "sign-up-form-item"
  };

  submit_handler = (e) => {
      const email = this.state.email.toLowerCase();
      const username = this.state.userName.toLowerCase();
      const password = this.state.password;
      e.preventDefault();
      addUser({email: email, fullName:this.state.fullName, userName: username, password : this.state.password})
      .then((response)=>{
        if(response.errors && response.errors.email){
          this.setState({
            email: 'valid email is required',
            style: "sign-up-form-item-error"
          });
        } else if(response.errors && response.errors.name){
          this.setState({
            fullName: 'valid name is required',
            style: "sign-up-form-item-error"
          });
        } else if(response.errors && response.errors.username){
          this.setState({
            userName: 'valid username is required',
            style: "sign-up-form-item-error"
          });
        };
      })
      .then(
        this.props.history.push(`/login`)
      );
  }

  change_handler(e){
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  render(){
    return(
      <div>
          <form className="sign-up-form-container">
              <input onChange={this.change_handler.bind(this)} className={this.state.style} value={this.state.email} type="text" name="email" placeholder="Mobile Number or Email"></input>
              <input onChange={this.change_handler.bind(this)} className={this.state.style} value={this.state.fullName} type="text" name="fullName" placeholder="Full Name"></input>
              <input onChange={this.change_handler.bind(this)} className={this.state.style} value={this.state.userName} type="text" name="userName" placeholder="Username"></input>
              <input onChange={this.change_handler.bind(this)} className={this.state.style} value={this.state.password} type="text" name="password" placeholder="Password"></input>
          </form>
          <button className="submit-button" onClick={this.submit_handler}>Sign up</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  login : state.login.user
});

const EmailSignUpWrapper =  connect(mapStateToProps)(EmailSignUp);


export default withRouter(EmailSignUpWrapper);
