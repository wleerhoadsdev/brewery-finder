import React from 'react'
import axios from 'axios';
import { Link,useLocation } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewBeerList(props) {
    const location=useLocation();
    const [beersData, setBeersData] = React.useState([]);
    const [breweryData, setBreweryData] = React.useState({});
    const [address, setAddress] = React.useState("");
    const {isMyBrewery, breweryId}= location.state;
    
    React.useEffect(() => {
        axios.get(baseUrl + `/brewery/${breweryId}/beer`).then((response) => {
            setBeersData(response.data)
         });
         axios.get(baseUrl + `/brewery/${breweryId}`).then((response) => {
            const { street, city, state, zipCode, country } = response.data.address;
            setAddress(`${street} ${city} ${state} ${zipCode} ${country}`);
            setBreweryData(response.data);
        });
    }, [])

    function handleActiveChange(e, beerId){
        console.log(beerId);
        //console.log("Before BeerData: " + JSON.stringify(beersData));
    }

    const beerListElements = beersData.map((beer) => {
        const data={
            beerId:beer.beerId,
            breweryId:beer.breweryId
        }
        if(isMyBrewery||beer.isActive){
            return (
                <div>
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
                    {isMyBrewery && !beer.isActive ? <button onClick={(e) => {handleActiveChange(e, beer.beerId)}}>Toggle beer to inactive</button> : <button name={beer.beerId} onClick={(e) => {handleActiveChange(e, beer.beerId)}}>Toggle beer to active</button>}
                </div>
            )
        }
        else{return <div></div>}
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
                {isMyBrewery ? <Link to={{pathname: `/AddBeer/${breweryId}`, state: { breweryData: breweryData }}}>Add Beer</Link> : ""}
            </div>
            <div className='main__image-panel'>
                <img src='https://via.placeholder.com/600' alt='placeholder' />
            </div>
        </main>
    )
}