import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import Comments from '../Comments/Comments';
import {likePost} from '../../../../services';
import {load_user} from '../../../../../Redux/actions/actions';
import './CommentLikeBox.css';

class CommentLikeBox extends React.Component{

  componentDidMount(){
    this.props.load_user(this.props.user_username);
  };

  like = () => {
    const user = this.props.match.params.username;
    const photo_id = this.props.match.params.photo_id;
    const username = localStorage.getItem('authUser');
    const like_data = {
      post_id : this.props.post_data.id,
      username : username
    };
    likePost(like_data).then((res)=> {
      if(res.message === "Auth failed"){
        this.props.history.push(`/login`);
      }
    }).then((response)=>{
      window.location.href=`http://localhost:3000/${user}/${photo_id}`;
    }).catch((err)=>{
      console.log(err);
    });
  }

  render(){
    return(
      <div className="Comment-box-container">
        <div className="headline">
          <img className="headline-photo" src={this.props.user_data.photo} alt="user" />
          <strong>{this.props.user_data.username}</strong>
        </div>
        <hr className="line"/>
        <div className="comment-text-box">
          {this.props.comments}
        </div>
        <div className="like-box">
          <hr className="line"/>
          <button className="like-button" onClick={this.like}>Like</button>
          <h4 className="likes-display">{this.props.post_data.likes.length + " likes"}</h4>
          <h6 className="post-date">{this.props.post_data.date.split('T')[0]}</h6>
        </div>
        <div className="comment-input-box">
          <hr className="line"/>
          <Comments userData={this.props.user_data} post_id={this.props.post_data.id} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.profile.userProfile
});

const boxWrapper = connect(mapStateToProps, {load_user})(CommentLikeBox);

export default withRouter(boxWrapper);
