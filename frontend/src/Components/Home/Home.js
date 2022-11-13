import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function Home(props) {
    const role = props.user ? props.user.authorities[0].name : '';
    const isAdmin = role === 'ROLE_ADMIN';
    const isBrewer = role === 'ROLE_BREWER';

    const [myBrewery, setMyBrewery] = React.useState();

    React.useEffect(() => {
        if (isBrewer) {
            axios.get(baseUrl + `/user/${props.user.id}/brewery`)
                .then((response) => setMyBrewery(response.data.breweryId));
        }
    }, [isBrewer]);

    const greetingText = props.user ? (
        <h3 className='home__greeting'>
            Welcome back <span className='home__user'>{props.user.username}</span>!
        </h3>
    ) : (
        ''
    );

    const viewMyBreweryElement = (
        <Link
            to={{
                pathname: `/ViewBrewery/${myBrewery}`,
                state: { breweryId: myBrewery },
            }}>
            View My Brewery
        </Link>
    );

    const viewMyBeersElement = (
        <Link
            to={{
                pathname: `/ViewBeerList/${myBrewery}`,
                state: { breweryId: myBrewery },
            }}>
            View My Beers
        </Link>
    );

    const viewAllUsersElement = <Link to='/ViewAllUsers'>View All Users</Link>;

    return (
        <main>
            <div className='home__content-panel'>
                {greetingText}
                <h3>Discover your new favorite beer</h3>
                <Link to='/ViewAllBreweries'>View All Breweries</Link>
                {isBrewer && viewMyBreweryElement}
                {isBrewer && viewMyBeersElement}
                {isAdmin && viewAllUsersElement}
            </div>
            <div className='home__image-panel'>
                <img
                    src='https://via.placeholder.com/600'
                    alt='placeholder'
                    className='home__image'
                />
            </div>
        </main>
    );
}
