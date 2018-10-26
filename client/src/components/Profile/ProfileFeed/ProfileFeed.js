import React from 'react';
import {load_user_feed } from '../../../Redux/actions/actions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './ProfileFeed.css';

class Feed extends React.Component{

  componentDidMount(){
    // const username = localStorage.getItem('authUser');
    // this.props.load_user_feed(username);
    const username = this.props.username;
    this.props.load_user_feed(username);
  }

  changeProfile = () => {
    const username = this.props.username;
    this.props.load_user_feed(username);
  };

  clickImage = (e, image_id) => {
    const username = this.props.profile.username;
    this.props.history.push(`/${username}/${image_id}`);
  }

  render(){
    const feed = this.props.post.feed.map((post)=>(
          <button
            className='img-button'
            onClick={(e) => this.clickImage(e, post._id)}
            >
            <img className="post_photo_thumb" key={post._id} src={post.photo} alt={post.username}/>
          </button>
    ))
    return(
      <div className='page-container'>
        <div className='feed-container'>
          <hr className="divider"/>
          {feed}
        </div>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    post : state.post,
    profile : state.profile.userProfile
  };
};

const FeedWrapper = connect(mapStateToProps, {load_user_feed})(Feed);

export default withRouter(FeedWrapper);
