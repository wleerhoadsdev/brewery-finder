import axios from 'axios';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewBeerInformation(props) {

    const location = useLocation();
    const [beerData,setBeerData]=React.useState([]);
    const {breweryId, beerId}=location.state.data;
    /*TODO: Call on beerType API endpoint to display correct beer type */

    React.useEffect(()=>{
        axios.get(baseUrl+`/brewery/${breweryId}/beer/${beerId}`).then((response)=>{
            setBeerData(response.data);
        });
    },[]);

    if(beerData.isActive)
        {
        return (
            <div className='home--left-panel'>
                <h3>{beerData.beerName}</h3>
                <p>{beerData.description}</p>
                <p>{beerData.abv}</p>
                {/*TODO: change beerTypeId to beerType */}
                <p>{beerData.typeId}</p>
                <Link to={{pathname:'/ViewBeerList', state: {breweryId: breweryId, isMyBrewery: location.state.isMyBrewery}}}>View Beer List</Link>
                <img src={beerData.image_url} alt={beerData.beerName}/>
            </div>
        );}
    else{
        return(
            <></>
        )
    }
}