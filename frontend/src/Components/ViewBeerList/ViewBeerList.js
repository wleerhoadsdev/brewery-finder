import React from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewBeerList(props) {
    const location = useLocation();
    const [beersData, setBeersData] = React.useState([]);
    const { breweryId } = location.state;
    
    React.useEffect(() => {
        axios.get(baseUrl + `/brewery/${breweryId}/beer`).then((response) => {
            setBeersData(response.data)
         });
    }, [])

    const beerListElements = beersData.map((beer) => {
        const data={
            beerId:beer.beerId,
            breweryId:beer.breweryId
        }
        console.log(data);
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
                {/* adv is a typo of abv*/}
                <td>{beer.adv}</td>
            </tr>
        )
    })
    

    return (
        <main>
            <div className='home__content-panel'>
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
            </div>
            <div className='home__image-panel'>
                <img src='https://via.placeholder.com/600' alt='placeholder' />
            </div>
        </main>
    )
}