import React from 'react';
import {withRouter} from 'react-router-dom';
import './Search.css';

class Search extends React.Component{
  state = {
    username: ''
  };

  change_handler = (e) => {
    this.setState({
      username : e.target.value
    });
  }

  onSubmit = () => {
    const location = this.state.username;
    this.props.history.push(`/home/${location}`);
  }


  render(){
    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <input
          className="search-input"
          onChange={this.change_handler}
          type="text"
          value={this.state.username}
          placeholder = "          search by username">
          </input>
        </form>
      </div>
    );
  }
}

const SearchBar = withRouter(Search);

export default SearchBar;
