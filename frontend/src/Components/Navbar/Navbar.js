import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
    const currentLocation = useLocation();
    const isHomePage = currentLocation.pathname === '/';

    const nav = props.user ? (
        <nav>
            <Link
                to='/'
                className='nav_app_title'
            >
                Beer Lovers
            </Link>
            {!isHomePage && <Link to='/'>HOME</Link>}
            <Link to='/breweries'>VIEW ALL BREWERIES</Link>
            <Link
                to='/'
                onClick={props.handleLogout}
            >
                LOG OUT
            </Link>
        </nav>
    ) : (
        <nav>
            <Link
                to='/'
                className='nav_app_title'
            >
                Beer Lovers
            </Link>
            {!isHomePage && <Link to='/'>HOME</Link>}
            <Link to='/login'>SIGN IN</Link>
            <Link to='/register'>CREATE ACCOUNT</Link>
        </nav>
    );

    return <header>{nav}</header>;
}
