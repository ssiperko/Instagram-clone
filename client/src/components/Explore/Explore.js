import React from 'react';
import {explore} from '../services';
import {likePost} from '../services';
import {Link, withRouter} from 'react-router-dom';
import './Explore.css';

class Explore extends React.Component{
  state = {
    posts: []
  };

  componentDidMount(){
    explore()
    .then((result)=>{
      this.setState({
        posts: result.reverse()
      });
    });
    console.log(this.state);
  };




  like = (id) => {
    const username = localStorage.getItem('authUser');
    const photo_id = this.props.match.params.photo_id;
    const ID = id;
    const like_data = {
      post_id : ID,
      username : username,
      photo: localStorage.getItem('authUserPhoto'),
      name: localStorage.getItem('authUserName')
    };
    likePost(like_data).then((res)=> {
      console.log(res);
      if(res.message === "Auth failed"){
        this.props.history.push(`/login`);
      }
    }).then((response) => {
      if (response){
        window.location.href = `http://localhost:3000/home/${username}`
      }
    })
    .catch((err) => {
    });
  }

  click_handler(name){
    window.location.href=`http://localhost:3000/home/${name}`
  };

  render(){
    const stream = this.state.posts.map((post) => (
        <div className="explore-wrapper" key={post._id}>
          <div className="explore-head">
          <Link className="explore-profile-link" to={`home/${post.username}`}>{post.username}</Link>
          </div>
          <div className="cascade-photo-wrapper">
          <img className="explore-cascade" src={post.photo} alt="party" />
          </div>
          <div className="explore-foot">
            <div className="explore-like-comment-bar">
              <button className="explore-like-button" onClick={this.like.bind(this, post._id)}>&#9829;</button>
            </div>
            <div className="explore-foot-likes">
              <h3>likes {post.likes.length}</h3>
            </div>
            <h5 className="explore-date">{post.date.split("T")[0]}</h5>
            <div className="explore-comment-section">
              {post.comments.map((comment) => (
                <div className="explore-comment">
                  <button className="user-profile-link" onClick={this.click_handler.bind(this, comment.author.author_name)}><h5>{comment.author.author_name + " "}</h5></button>
                  <h5>{comment.text}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
    ));

    return(
        <div className="explore-page-wrapper">
          {stream}
        </div>
    );
  }
}

export default withRouter(Explore);
