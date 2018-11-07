import React from 'react';
import './Popup.css';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className='popup-head'>
            <button className="popup-close-button" onClick={this.props.closePopup}><h1>X</h1></button>
            <h3>Likes</h3>
          </div>
          <h3>{this.props.likes}</h3>
        </div>
      </div>
    );
  }
}
export default Popup;
