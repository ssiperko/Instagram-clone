import React from 'react';
import {connect} from 'react-redux';
import './Uploader.css';
import axios from 'axios';

class Uploader extends React.Component{

  handleUploadFile = (event) => {
    const token = localStorage.getItem('authToken');
    const username = localStorage.getItem('authUser');
    const id = localStorage.getItem('authUserId');
    const data = new FormData()
    data.append('file', event.target.files[0]);
    data.append('token', token);
    data.append('username', username);
    data.append('caption', "this is a caption");
    data.append('id', id);
    data.append('url',  this.props.url);
    data.append('type', this.props.type);
    axios.post('http://localhost:5000/post/files', data)
    .then((response) => {
      if (response){
        window.location.href = `http://localhost:3000/home/${username}`
      }
    })
    .catch((err) => {
    });
  }
  render() {
    return(
      <div>
        <div className="img-container">
          <label for={this.props.mode} className="poop">
          <div><img className={this.props.style} src={this.props.photo} alt="upload" /></div>
          </label>
        </div>
        <input id={this.props.mode} name={this.props.mode} className="photo" type="file" onChange={this.handleUploadFile} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile : state.profile
});

export default connect(mapStateToProps)(Uploader);
