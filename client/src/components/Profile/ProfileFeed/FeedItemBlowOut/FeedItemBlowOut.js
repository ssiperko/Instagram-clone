import React from 'react';
import {connect} from 'react-redux';
import {load_user_feed } from '../../../../Redux/actions/actions';
import {withRouter, Link} from 'react-router-dom';
import CommentLikeBox from './CommentLikeBox/CommentLikeBox';
import './FeedItemBlowOut.css';

class BlowOut extends React.Component{

  state = {
    id: '',
    photo: '#',
    username: '',
    caption: '',
    date: '',
    comments: [],
    likes: []
  };

  componentDidMount(){
    const username = this.props.match.params.username;
    this.props.load_user_feed(username);
    const id = this.props.match.params.photo_id;
    for(const post of this.props.post){
      if(post._id === id) {
        this.setState({
          id: id,
          photo: post.photo,
          username: post.username,
          caption: post.caption,
          date: post.date,
          comments: post.comments,
          likes : post.likes
        });
      }
    }
  }

  componentDidUpdate(){
    if (this.state.id === ''){
      const username = this.props.match.params.username;
      this.props.load_user_feed(username);
      const id = this.props.match.params.photo_id;
      for(const post of this.props.post){
        if(post._id === id) {
          this.setState({
            id: id,
            photo: post.photo,
            username: post.username,
            caption: post.caption,
            date: post.date,
            comments: post.comments,
            likes : post.likes
          });
        }
      }
    }
  }

  click_handler(name){
    window.location.href=`http://localhost:3000/home/${name}`
  };

  render(){
    const comments = this.state.comments.map((comment)=>(
      <div className="comment">
        <h6> <button className="user-profile-link-button" onClick={this.click_handler.bind(this, comment.author.author_name)}> {comment.author.author_name} </button> {comment.text}</h6>
      </div>
    ))

    const postData = {
      id : this.state.id,
      username : this.state.username,
      date : this.state.date,
      likes : this.state.likes
    }

    return(
      <div className="feed-item-container">
        <div className="main-img-container">
          <img className="main-img" src={this.state.photo} alt='hi'></img>
          <CommentLikeBox user_data={this.props.user} user_username={this.props.match.params.username} comments={comments} post_data={postData}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    post : state.post.feed,
    user: state.profile.userProfile,
    url: props.match.params.photo_id
  };
};

const BlowOutWrapper = connect(mapStateToProps, {load_user_feed})(BlowOut);

export default withRouter(BlowOutWrapper);
