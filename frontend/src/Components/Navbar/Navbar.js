import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar(props) {
  const nav = props.user ?
  
    <nav>
      <Link to='/' className={"link-styles"}>HOME</Link>
      <Link to='/breweries' className={"link-styles"}>VIEW ALL BREWERIES</Link>
      <Link to='/' className={"link-styles"} onClick={props.handleLogout}>LOG OUT</Link>
    </nav>
    :
    <nav>
      <Link to='/' className={"link-styles"}>HOME</Link>
      <Link to='/login' className={"link-styles"}>SIGN IN</Link>
      <Link to='/register' className={"create-link-styles"}>CREATE ACCOUNT</Link>
    </nav>


  return (
    <header>
      <Link to='/' className='nav_app_title'>Beer Lovers</Link>
      {nav}
    </header>
  )

}
