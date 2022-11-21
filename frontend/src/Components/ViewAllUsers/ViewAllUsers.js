import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';

export default function ViewAllUsers(props) {
    const role = props.user ? props.user.authorities[0].name : '';

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        UserService.fetchAllUsers(setUsersData);
    }, []);

    const usersElements = usersData.map((userBreweryListItem) => {
        if (userBreweryListItem.username === 'admin') return '';
        if (role === 'ROLE_ADMIN' && userBreweryListItem.breweryName != null) {
            return (
                <tr key={userBreweryListItem.userId}>
                    <td>{userBreweryListItem.username}</td>
                    <td>{userBreweryListItem.name}</td>
                    <td>{userBreweryListItem.breweryName}</td>
                </tr>
            );
        } else if (role === 'ROLE_ADMIN') {
            return (
                <tr key={userBreweryListItem.userId}>
                    <td>{userBreweryListItem.username}</td>
                    <td>{userBreweryListItem.name}</td>
                    <td>
                        <Link
                            to={`/users/${userBreweryListItem.userId}/addbrewery`}
                        >
                            <button>Create Brewery</button>
                        </Link>
                    </td>
                </tr>
            );
        } else {
            return (
                <tr key='Error Message'>
                    You are not authorized to view this page.
                </tr>
            );
        }
    });

    return (
        <div className='home--left-panel'>
            <h3> Page to View All Users</h3>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Brewery</th>
                    </tr>
                </thead>
                <tbody>{usersElements}</tbody>
            </table>
            <Link to='/breweries'>View All Breweries</Link>
            <img
                src='https://via.placeholder.com/600'
                alt='placeholder'
            />
        </div>
    );
}
