import React, { Component } from 'react';
import {Provider} from 'react-redux';
import store from './Redux/store';
import Header from './components/Header/Header';
import Gate from './Gate';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Gate />
        </div>
      </Provider>
    );
  }
}

export default App;
