import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';

export default function ViewAllUsers(props) {
    const role = props.user ? props.user.authorities[0].name : '';
    const isRoleAdmin = role === 'ROLE_ADMIN';

    const [usersData, setUsersData] = useState([]);

    useEffect(() => {
        UserService.fetchAllUsers(setUsersData);
    }, []);

    const usersElements = usersData.map((userBreweryListItem) => {
        const hasBreweryName = userBreweryListItem.breweryName != null;
        const isListItemAdmin = userBreweryListItem.username === 'admin';

        return (
            !isListItemAdmin && (
                <tr key={userBreweryListItem.userId}>
                    <td>{userBreweryListItem.username}</td>
                    <td>{userBreweryListItem.name}</td>
                    <td>
                        {hasBreweryName ? (
                            userBreweryListItem.breweryName
                        ) : (
                            <Link
                                to={`/users/${userBreweryListItem.userId}/addbrewery`}
                            >
                                <button>Create Brewery</button>
                            </Link>
                        )}
                    </td>
                </tr>
            )
        );
    });

    return (
        <div className='home--left-panel'>
            <h3> Page to View All Users</h3>
            {!isRoleAdmin && <h3>You are not authorized to view this page.</h3>}
            {isRoleAdmin && (
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
            )}
            <Link to='/breweries'>View All Breweries</Link>
            <img
                src='https://via.placeholder.com/600'
                alt='placeholder'
            />
        </div>
    );
}
