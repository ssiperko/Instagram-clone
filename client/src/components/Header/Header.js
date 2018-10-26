import React from "react";
import Search from './Search';
import Home from './Home';
import './Header.css';

class Header extends React.Component{
     render(){
         return (
           <div className="header-container">
            <div className="header">
                <div className="Nav-menus">
                    <a className="Nav-brand-logo" href="/explore">
                      Instagram
                    </a>
                  <Search className="search"/>
                  <Home className="home-button"/>
                </div>
            </div>
            </div>
        );
     }
}

export default Header;
