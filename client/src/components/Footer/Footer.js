import React from 'react';
import Uploader from '../Uploader/Uploader';
import './Footer.css';

class Footer extends React.Component{
  render(){
    return(
      <div className="footer-container">
        <Uploader hello=" hihi" className="add-photo-button" url={`http://localhost:5000/post/`} type={'POST'} photo={"https://sguru.org/wp-content/uploads/2018/01/instagram-colourful-icon.png"} mode={"post-update"} style={"add-new"}/>
      </div>
    );
  }
}

export default Footer;
