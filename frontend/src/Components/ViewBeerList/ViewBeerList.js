import React from 'react'
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewBeerList(props) {
    const location=useLocation();
    const [beersData, setBeersData] = React.useState([]);
    const [breweryData, setBreweryData] = React.useState({});
    const [address, setAddress] = React.useState("");
    const {isMyBrewery}= location.state;
    
    React.useEffect(() => {
        axios.get(baseUrl + `/brewery/${props.brewery}/beer`).then((response) => {
            setBeersData(response.data)
         });
         axios.get(baseUrl + `/brewery/${props.currentBrewery}`).then((response) => {
            const { street, city, state, zipCode, country } = response.data.address;
            setAddress(`${street} ${city} ${state} ${zipCode} ${country}`);
            setBreweryData(response.data);
        });
    }, [])

    const beerListElements = beersData.map((beer) => {
        const data={
            beerId:beer.beerId,
            breweryId:beer.breweryId
        }
        
        return (
            <tr key={beer.id}>
                <td>
                <Link to={{ pathname: `/ViewBeerInformation/${beer.beerId}`, state: {data} }}>
                            {beer.name}
                    </Link>

                </td>
                {/* TODO: update typeId once we figure that out*/}
                <td>{beer.typeId}</td>
                <td>{beer.description}</td>
                <td>{beer.abv}</td>
            </tr>
        )
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
                        </tr>
                    </thead>
                    <tbody>
                        {beerListElements}
                    </tbody>
                </table>
                {isMyBrewery ? <Link to={{pathname: `/AddBeer/${props.brewery}`, state: { breweryData: breweryData }}}>Add Beer</Link> : ""}
            </div>
            <div className='main__image-panel'>
                <img src='https://via.placeholder.com/600' alt='placeholder' />
            </div>
        </main>
    )
}