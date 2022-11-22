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
        <h3 className='home__greeting'>
            Welcome back{' '}
            <span className='home__user'>{props.user.username}</span>!
        </h3>
    ) : (
        ''
    );

    const viewMyBreweryElement = (
        <Link className={"link-styles"}
            to={{
                pathname: `/brewery/${props.myBrewery}`,
            }}
        >
            View My Brewery
        </Link>
    );

    const viewMyBeersElement = (
        <Link className={"link-styles"}
            to={{
                pathname: `/brewery/${props.myBrewery}/beers`,
            }}
        >
            View My Beers
        </Link>
    );

    const viewAllUsersElement = <Link to='/users'>View All Users</Link>;

    return (
        <main>
            <div className='main__content-panel'>
                {greetingText}
                <h3 className='heading'>Discover your new favorite beer</h3>
                <Link className={"link-styles"} 
                    to='/breweries'>View All Breweries</Link>
                {isBrewer && viewMyBreweryElement}
                {isBrewer && viewMyBeersElement}
                {isAdmin && viewAllUsersElement}
            </div>
            <div className='main--image-panel'>
                <img
                    src='https://via.placeholder.com/600'
                    alt='placeholder'
                    className='home__image'
                />
            </div>
        </main>
    );
}
