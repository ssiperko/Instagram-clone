import React from 'react';
import {connect} from 'react-redux';
import {load_user} from '../../../../Redux/actions/actions';
import {updateProfile} from '../../../services';
import './ProfileSettings.css';

class Settings extends React.Component{
  state = {
    name: this.props.profile.userProfile.name,
    username: this.props.profile.userProfile.username,
    website: '',
    bio: this.props.profile.userProfile.bio,
    email: '',
    phone: '',
    gender: ''
  };

  componentDidMonunt(){
    const username = localStorage.getItem('authUser');
    this.props.load_user(username);
  }

  change_handler = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    });
    console.log(this.state)
  }

  submit_handler = (e) => {
    e.preventDefault();
    const data = {
      "name" : this.state.name,
      "username" : this.state.username.toLowerCase(),
      "bio" : this.state.bio,
      "website" : this.state.website
    }
    updateProfile(data);
  }

  render(){
    return(
      <div className="update-page-wrapper">
        <div className="settings-wrapper">
          <form onSubmit={this.submit_handler}>
            <div className="setting-input-wrapper" >
              <label>Full Name</label>
              <input onChange={this.change_handler} type="text" name="name" value={this.state.name}></input>
            </div>
            <div className="setting-input-wrapper" >
              <label>username</label>
              <input onChange={this.change_handler} type="text" name="username" value={this.state.username}></input>
            </div>
            <div className="setting-input-wrapper" >
              <label>website</label>
              <input onChange={this.change_handler} type="text" name="website" value={this.state.website}></input>
            </div>
            <div className="setting-input-wrapper" >
              <label>bio</label>
              <textarea onChange={this.change_handler} type="textarea" name="bio" value={this.state.bio}></textarea>
            </div>
            <button onClick={this.submit_handler}>submit</button>
          </form>
        </div>
      </div>
    );
  }
}

/*

<div>
<div>
  <label>email</label>
  <input onChange={this.change_handler} type="text" name="email"></input>
</div>
<label>phone number</label>
<input onChange={this.change_handler} type="text" name="phone"></input>
</div>
<div>
<label>gender</label>
<input onChange={this.change_handler} type="text" name="gender"></input>
</div>
*/


const mapStateToProps = state => ({
  profile : state.profile
});

export default connect(mapStateToProps, {load_user})(Settings);
