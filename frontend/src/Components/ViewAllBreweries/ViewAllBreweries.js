import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewAllBreweries(props) {

    
    const role = props.user ? props.user.authorities[0].name : '';
    const [breweriesData, setBreweriesData] = React.useState([]);

    console.log(breweriesData);

    React.useEffect(() => {
        axios.get(baseUrl + '/brewery').then((response) => {
            setBreweriesData(response.data);
        })
    }, []);

    const breweryElements = breweriesData.map(brewery => {
        return (
            <tr>
                <td>{brewery.name}</td>
                <td>{brewery.address.city}</td>
                <td>{brewery.address.state}</td>
            </tr>
        )  
    })

    return (
        <div className='breweries'>
            {/* {userText} */}
            <h3> Below are our List of Breweries!</h3>
            <Link to='/'>Go Back Home</Link>
            <table>
                <tr>
                    <th>Brewery Name</th>
                    <th>City</th>
                    <th>State</th>
                </tr>
                {breweryElements}
            </table>
            <img
                src='https://via.placeholder.com/600'
                alt='placeholder'
                className='ViewAllBreweries__image' />
        </div>
    )
}