import React from 'react';

class Popup extends React.Component {
  render() {
    return (
      <div className='popup-background'>
        <div className='popup-foreground'>
          <div>
            <h2>{this.props.headline}</h2>
            <button className="popup-close-button" onClick={this.props.closePopup}> X </button>
          </div>
          <div>
            {this.props.follow_data}
          </div>
        </div>
      </div>
    );
  }
}

export default Popup;
