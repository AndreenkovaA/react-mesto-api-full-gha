import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
   return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__group">
        {props.userEmail && <div className="header__email">{props.userEmail.email}</div>}
        <Link to={props.route} onClick={props.signOut} className="header__link-exit">{props.link}</Link>
      </div>
      
    </header>
  );
}

export default Header;