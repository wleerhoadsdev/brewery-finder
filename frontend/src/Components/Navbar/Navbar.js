import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar(props) {
  const nav = props.user ?
    <nav>
      <Link to='/' className='nav_app_title'>Beer Lovers</Link>
      <Link to='/'>HOME</Link>
      <Link to='/ViewAllBreweries'>VIEW ALL BREWERIES</Link>
      <Link to='/' onClick={props.handleLogout}>LOG OUT</Link>
    </nav>
    :
    <nav>
      <Link to='/' className='nav_app_title'>Beer Lovers</Link>
      <Link to='/'>HOME</Link>
      <Link to='/login'>SIGN IN</Link>
      <Link to='/register'>CREATE ACCOUNT</Link>
    </nav>


  return (
    <header>
      {nav}
    </header>
  )

}
