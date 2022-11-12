import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewAllBreweries(props) {

    const role = props.user ? props.user.authorities[0].name : '';
    const [breweriesData, setBreweriesData] = React.useState([]);
    const [myBrewery, setMyBrewery] = React.useState({})

    React.useEffect(() => {
        axios.get(baseUrl + '/brewery').then((response) => {
            setBreweriesData(response.data);
        });

        if(props.user) {
            axios.get(baseUrl + '/user/' + props.user.id + '/brewery').then((response) => {
                setMyBrewery(response.data);
            })
        }
    }, [props.user]);



    const breweryElements = breweriesData.map(brewery => {
        return (
            <tr key={brewery.id}>
                <td><Link to={{pathname: '/ViewBrewery', state: {id: brewery.id}}}>{brewery.name}</Link></td>
                <td>{brewery.address.city}</td>
                <td>{brewery.address.state}</td>
            </tr>
        );
    });

    return (
        <div className='breweries'>
            {/* {userText} */}
            <h3> Below are our List of Breweries!</h3>
            <Link to='/'>Go Back</Link>
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