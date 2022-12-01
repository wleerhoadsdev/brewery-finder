import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';
import NotAuthorized from '../NotAuthorized/NotAuthorized';

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
        <main>
            {!isRoleAdmin ? (
                <NotAuthorized />
            ) : (
                <>
                    <div className='main__content-panel'>
                        <h1 className='heading'>View All Users</h1>
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
                    </div>
                    <div className='main__image-panel'>
                        <img
                            src='https://images.unsplash.com/photo-1591373032196-95ddc21ee140?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1541&q=80'
                            alt='bottle of beer tossed in the air'
                        />
                    </div>
                </>
            )}
        </main>
    );
}
