import axios from 'axios';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewBeerInformation(props) {

    const location = useLocation();
    const [beerData,setBeerData]=React.useState([]);
    const [avgRating,setAvgRating]=React.useState(0);
    const {breweryId, beerId}=location.state.data;
    /*TODO: Call on beerType API endpoint to display correct beer type */

    React.useEffect(()=>{
        axios.get(baseUrl+`/brewery/${breweryId}/beer/${beerId}`).then((response)=>{
            setBeerData(response.data);
        });
        axios.get(baseUrl+`/brewery/${breweryId}/beer/${beerId}/avgrating`).then((response)=>{
            setAvgRating(response.data);
        })
    },[]);

    if(beerData.isActive)
        {
        return (
            <div className='home--left-panel'>
                <h3>{beerData.beerName}</h3>
                <p>{beerData.description}</p>
                <p>{beerData.abv}</p>
                {/*TODO: change beerTypeId to beerType */}
                <p>Beer Type: {beerData.typeId}</p>
                <p>Average Rating:{avgRating}</p>
                <Link to={{pathname:'/ViewBeerList', state: {breweryId: breweryId, isMyBrewery: location.state.isMyBrewery}}}>View Beer List</Link>
                <br />
                <br />
                <Link to={{pathname:`/AddReview/brewery/${breweryId}/beer/${beerId}`,state: {beerId: beerId}}}>Add Review</Link>
                <img src={beerData.image_url} alt={beerData.beerName}/>
            </div>
        );}
    else{
        return(
            <></>
        )
    }
}