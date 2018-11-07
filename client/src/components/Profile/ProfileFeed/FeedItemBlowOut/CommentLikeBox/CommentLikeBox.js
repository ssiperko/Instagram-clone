import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Comments from '../Comments/Comments';
import {likePost} from '../../../../services';
import {load_user} from '../../../../../Redux/actions/actions';
import {load_user_feed} from '../../../../../Redux/actions/actions';
import Popup from './Popup/Popup';
import './CommentLikeBox.css';

class CommentLikeBox extends React.Component{

  state = {
    showPopup: false
  };

  componentDidMount(){
    this.props.load_user(this.props.user_username);
    this.props.load_user_feed(this.props.user_username);
    //console.log(this.props.post[2].likes[0].liked_by);
  };

  like = () => {
    const user = this.props.match.params.username;
    const photo_id = this.props.match.params.photo_id;
    const username = localStorage.getItem('authUser');
    const like_data = {
      post_id : this.props.post_data.id,
      username : username,
      photo: localStorage.getItem('authUserPhoto'),
      name: localStorage.getItem('authUserName')
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

  getLikes = () => {
    const filteredPosts = this.props.post.filter((post)=>{
      return post._id === this.props.match.params.photo_id
    });
    if (filteredPosts[0] && filteredPosts[0].likes) {
      return filteredPosts[0].likes.map((p)=>(
        <div className="like-item" key={p._id}>
          <img className="like-popup-photo" src={p.photo} alt={p.liked_by}/>
          <h5>{p.liked_by}</h5>
          <h5>{p.name}</h5>
        </div>
      ));
    }
    return [];
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup
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
          <div className='popup-wrapper'>
            <button className="popup-open-button" onClick={this.togglePopup}>{this.props.post_data.likes.length + " likes"}</button>
            {this.state.showPopup ?
              <Popup
                likes = {this.getLikes()}
                closePopup={this.togglePopup.bind(this)}
              />
              : null
            }
          </div>

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
  user: state.profile.userProfile,
  post : state.post.feed
});

const boxWrapper = connect(mapStateToProps, {load_user, load_user_feed})(CommentLikeBox);

export default withRouter(boxWrapper);
