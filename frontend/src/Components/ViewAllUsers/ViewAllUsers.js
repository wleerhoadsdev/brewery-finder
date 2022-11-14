import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewAllUsers(props) {

    const [usersData, setUsersData] = React.useState([]);

    React.useEffect(() => {
        axios.get(baseUrl + '/usersbreweries').then((response) => {
            setUsersData(response.data);
        })
    }, [])

    const usersElements = usersData.map(userBreweryListItem => {
        if (props.role === 'ROLE_ADMIN' && userBreweryListItem.breweryName != null) {
            return (
                <tr key={userBreweryListItem.userId}>
                    <td>{userBreweryListItem.username}</td>
                    <td>{userBreweryListItem.name}</td>
                    <td>{userBreweryListItem.breweryName}</td>
                </tr>
            )
        }
        else if (props.role === 'ROLE_ADMIN') {
            return (
                <tr key={userBreweryListItem.userId}>
                    <td>{userBreweryListItem.username}</td>
                    <td>{userBreweryListItem.name}</td>
                    <td><Link to='/AddBrewery' onClick={props.handleCurrentBrewery(userBreweryListItem.userId)}><button>Create Brewery</button></Link></td>
                </tr>
            )
        }
        else {
            return (
                <tr key="Error Message">You are not authorized to view this page.</tr>
            )
        }
    })

    return (
        <div className='home--left-panel'>
            <h3> Page to View All Users</h3>
            <table>
                <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Brewery</th>
                </tr>
                {usersElements}
            </table>
            <Link to='/'>View All Breweries</Link>
            <img src='https://via.placeholder.com/600' alt='placeholder' />
        </div>
    )
}