import axios from 'axios';
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl'; 

export default function ViewBeerInformation(props) {

    const location = useLocation();
    const [beerData,setBeerData]=React.useState([]);
    const {breweryId, beerId}=location.state.data;

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
                {/*adv is a typo of abv*/}
                <p>{beerData.adv}</p>
                {/*TODO: change beerTypeId to beerType */}
                <p>{beerData.typeId}</p>
                <Link to='/'>View All Breweries</Link>
                <img src={beerData.image_url} alt={beerData.beerName}/>
            </div>
        );}
    else{
        return(
            <p>Sorry, this beer is not available at this time.</p>
        )
    }
}