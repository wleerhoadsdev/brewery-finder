import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import './Home.css';

export default function Home(props) {
    const role = props.user ? props.user.authorities[0].name : '';
    const isAdmin = role === 'ROLE_ADMIN';
    const isBrewer = role === 'ROLE_BREWER';

    useEffect(() => {
        if (isBrewer) {
            UserService.fetchMyBrewery(props.user.id, props.handleMyBrewery);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isBrewer, props.handleMyBrewery]);

    const greetingText = props.user ? (
        <h2 className='home__greeting'>
            Welcome back{' '}
            <span className='home__user'>{props.user.username}</span>!
        </h2>
    ) : (
        ''
    );

    const viewMyBreweryElement = (
        <Link
            className={'link-styles'}
            to={{
                pathname: `/brewery/${props.myBrewery}`,
            }}
        >
            View My Brewery
        </Link>
    );

    const viewMyBeersElement = (
        <Link
            className={'link-styles'}
            to={{
                pathname: `/brewery/${props.myBrewery}/beers`,
            }}
        >
            View My Beers
        </Link>
    );

    const viewAllUsersElement = (
        <Link
            className={'link-styles'}
            to='/users'
        >
            View All Users
        </Link>
    );

    return (
        <main>
            <div className='main__content-panel'>
                {greetingText}
                <h1 className='heading'>Discover your new favorite beer</h1>
                <Link
                    className={'link-styles'}
                    to='/breweries'
                >
                    View All Breweries
                </Link>
                {isBrewer && viewMyBreweryElement}
                {isBrewer && viewMyBeersElement}
                {isAdmin && viewAllUsersElement}
            </div>
            <div className='main__image-panel'>
                <img
                    src='https://images.unsplash.com/photo-1542344807-658fcdfb5cf6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                    alt='beer lovers admiring beer'
                    className='home__image'
                />
            </div>
        </main>
    );
}
