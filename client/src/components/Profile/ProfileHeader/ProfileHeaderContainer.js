import React from 'react';
import {connect} from 'react-redux';
import {load_user} from '../../../Redux/actions/actions';
import Uploader from '../../Uploader/Uploader';
import Popup from './FollowPopUp/FollowPopUp';
import {Link, withRouter} from 'react-router-dom';
import {followUser, addfollower} from '../../services';
import './ProfileHeader.css';


class ProfileHeaderContainer extends React.Component {

  state = {
      followers: 0,
      following: 0,
      posts: 0,
      headerDataIsLoaded : false
  }

  componentDidMount = () => {
    const username = this.props.username;
    this.props.load_user(username);
    console.log(this.props.profile.userProfile.following + "hhh");
  }

  componentDidUpdate(){
    if(!this.state.headerDataIsLoaded) {
      if (this.props.profile.userProfile.followers.length){
        this.setState({
          followers: this.props.profile.userProfile.followers.length,
          following: this.props.profile.userProfile.following.length,
          posts : this.props.post.feed.length,
          headerDataIsLoaded : true
        })
      }
    }
    if(this.props.profile.userProfile === "username invalid"){
      console.log('invalid username');
    }
  }

  follow_user = () => {
    const follow_data = {
      follower_id : localStorage.getItem('authUserId'),
      name : this.props.profile.userProfile.name,
      username : this.props.profile.userProfile.username,
      photo : this.props.profile.userProfile.photo
    }
    followUser(follow_data).then((res)=>{
      if (res.message === "Auth failed"){
        this.props.history.push(`/login`);
      }
    }).then(this.add_follower());
  }

  add_follower = () => {
    const follower_data = {
      follower_id : this.props.profile.userProfile._id,
      username : localStorage.getItem('authUser'),
      photo : "no photo"
    };
    addfollower(follower_data);
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  render(){
    return(
      <div className='profile-header'>
        <div>
            <Uploader type={'PATCH'} url={`http://localhost:5000/accounts/update/${this.props.profile.userProfile._id}`} className="profile-photo" id={this.props.profile.userProfile._id} photo={this.props.profile.userProfile.photo} mode={"profile-update"} style={"profile-pic"}/>
        </div>
        <div className='profile-header-right'>
        <div className="name-line">
          <h1 className="profile-username">{this.props.profile.userProfile.username}</h1>
          {this.props.profile.userProfile.username === localStorage.getItem('authUser')?
          <Link className="update-profile-button" to="/settings">Edit Profile</Link> :
          <button className="follow-user-button" onClick={this.follow_user}>Follow</button>}
        </div>
          <div className="profile-follow-container">
            <h5 className="profile-follow-items" >{this.state.posts} posts</h5>
            <h5 className="profile-follow-items" > {this.state.followers} followers </h5>
            <h5 className="profile-follow-items" >{this.state.following} following</h5>
          </div>
        <div className='profile-bio-container'>
          <h5 className="profile-name">{this.props.profile.userProfile.name}</h5>
          <h6>{this.props.profile.userProfile.bio}</h6>
        </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile : state.profile,
  post : state.post
});

const profileHeaderWrapper = connect(mapStateToProps, {load_user})(ProfileHeaderContainer)

export default withRouter(profileHeaderWrapper);

//  {this.state.showPopup ? <Popup follow_data={this.props.profile} closePopup={this.togglePopup.bind(this)}/> : null}
