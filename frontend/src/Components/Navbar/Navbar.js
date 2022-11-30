import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
    const currentLocation = useLocation();
    const isHomePage = currentLocation.pathname === '/';

    const nav = props.user ? (
        <nav>
            {!isHomePage && (
                <Link
                    to='/'
                    className='link-styles'
                >
                    HOME
                </Link>
            )}
            <Link
                to='/breweries'
                className='link-styles'
            >
                VIEW ALL BREWERIES
            </Link>
            <Link
                to='/'
                onClick={props.handleLogout}
                className='link-styles'
            >
                LOG OUT
            </Link>
        </nav>
    ) : (
        <nav>
            {!isHomePage && (
                <Link
                    to='/'
                    className='link-styles'
                >
                    HOME
                </Link>
            )}
            <Link
                to='/login'
                className='link-styles'
            >
                SIGN IN
            </Link>
            <Link
                to='/register'
                className='link-styles'
            >
                CREATE ACCOUNT
            </Link>
        </nav>
    );

    return (
        <header>
            <Link
                to='/'
                className='nav_app_title'
            >
                Beer Lovers
            </Link>
            {nav}
        </header>
    );
}
