import React from 'react';
import {withRouter} from 'react-router-dom';
import './Comments.css';
import {createComment} from '../../../../services';

class Comments extends React.Component{
  state = {
    comment: ''
  }

  change_handler = (e) => {
    this.setState({
      comment: e.target.value
    });
  }

  submit_handler = (e) => {
    const user = this.props.match.params.username;
    const photo_id = this.props.match.params.photo_id;
    e.preventDefault();
    const postData = {
      text: this.state.comment,
      post_id: this.props.post_id,
      author_name: localStorage.getItem('authUser')
    };
    createComment(postData).then((res)=>{
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
      <div>
        <form onSubmit={this.submit_handler}>
          <input className="comment-input" type='text' name='comments' value={this.state.comment} placeholder='Add a comment...' onChange={this.change_handler} ></input>
        </form>
      </div>
    );
  }
}

const commentEngine = withRouter(Comments);

export default commentEngine;
