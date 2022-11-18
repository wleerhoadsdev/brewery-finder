import React from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBeerList(props) {
    const location = useLocation();
    const role = props.user ? props.user.authorities[0].name : '';
    const [beersData, setBeersData] = React.useState([]);
    const [breweryData, setBreweryData] = React.useState({});
    const [beerRatings, SetBeerRatings] = React.useState();
    const { isMyBrewery, breweryId } = location.state;

    React.useEffect(() => {
        axios.get(baseUrl + `/brewery/${breweryId}/beer`).then((response) => {
            setBeersData(response.data)
        });
        axios.get(baseUrl + `/brewery/${breweryId}`).then((response) => {
            setBreweryData(response.data);
        });
    }, [])

    React.useEffect(() => {
        let newBeerRating = {}
        axios.get(baseUrl + `/brewery/${breweryId}/beer/avgrating`)
            .then((response) => {
                response.data.forEach(rating => {
                    const beerId = rating.beerId;
                    const averageRating = rating.averageRating;
                    newBeerRating = {
                        ...newBeerRating,
                        [beerId]: averageRating
                    }
                });
                SetBeerRatings(newBeerRating);
            });
    }, []);

    console.log(beerRatings);

    function handleActiveChange(e, beerId) {

        const data = beersData.filter((beer) => beer.beerId === beerId)[0];
        const isActive = data.isActive;
        data.isActive = !isActive;

        axios.put(`${baseUrl}/brewery/${breweryId}/beer/${beerId}`, data)
            .then(response => {
                alert("Beer is now " + (isActive ? "Inactive" : "Active"));
            })
            .catch((error) => {
                if (error.response) {
                    // Request made and server responded
                    alert(error.response.data);
                    console.error(error.response.status + ': ' + error.response.data);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    alert(error.request);
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    alert('Error \n', error.message);
                    console.log('Error', error.message);
                }
            });
    }

    const beerListElements = beersData.map((beer) => {
        const data = {
            beerId: beer.beerId,
            breweryId: beer.breweryId
        }
        if (isMyBrewery || beer.isActive) {
            const beerRating = beerRatings[data.beerId];
            return (
                <div>
                    <tr key={beer.id}>
                        <td>
                            <Link to={{ pathname: `/ViewBeerInformation/${beer.beerId}`, state: { data: data, isMyBrewery: isMyBrewery } }}>
                                {beer.name}
                            </Link>
                        </td>
                        <td>{beer.typeId}</td>
                        <td>{beer.description}</td>
                        <td>{beer.abv}</td>
                        <td>{beerRating}</td>
                        {isMyBrewery && (role === "ROLE_BREWER") ? <td> <button onClick={(e) => { handleActiveChange(e, beer.beerId) }}>Toggle beer to {beer.isActive ? "Inactive" : "Active"}</button> </td> : ""}
                    </tr>

                </div>
            )
        }
        else { return <div></div> }
    })


    return (
        <main>
            <div className='main--content-panel'>
                <h3>Page to View Full List of Beers</h3>
                <Link to='/'>View All Breweries</Link>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>ABV</th>
                            <th>AVG Rating</th>
                            {isMyBrewery && <th>Active Toggle</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {beerListElements}
                    </tbody>
                </table>
                {isMyBrewery ? <Link to={{ pathname: `/AddBeer/${breweryId}`, state: { breweryData: breweryData } }}>Add Beer</Link> : ""}
            </div>
            <div className='main__image-panel'>
                <img src='https://via.placeholder.com/600' alt='placeholder' />
            </div>
        </main>
    )
}