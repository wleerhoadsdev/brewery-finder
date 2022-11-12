import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBrewery(props) { 

    const [breweryData, setBreweryData] = React.useState();

    React.useEffect(() => {
        console.log(props);
        
        // axios.get(baseUrl + `/brewery/${id}`).then((response) => {
        //     setBreweryData(response.data);
        // });
    }, []);
    

    // const breweryElement = breweryData.map((brewery) => {
    //     return (
    //         <div>
    //             <h1>{brewery.name}</h1>
    //         </div>
    //     );
    // });

    return (
        <div className='home--left-panel'>
            <h3>Brewery Info</h3>
            <Link to='/ViewAllBreweries'>Go Back to Listing</Link>
            {/* {breweryElement} */}
        </div>
    )
}