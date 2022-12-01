import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BreweryService from '../../services/brewery.service';
import './AddBrewery.css';

export default function AddBrewery(props) {
    const navigate = useNavigate();
    const params = useParams();
    const breweryOwnerUserId = params.userId;
    const role = props.user ? props.user.authorities[0].name : '';
    const isRoleAdmin = role === 'ROLE_ADMIN';

    const [breweryInfo, setBreweryInfo] = useState({
        name: '',
        breweryOwnerUserId: breweryOwnerUserId,
        isActive: false,
        isApproved: false,
        imageUrl: '',
        history: '',
        hoursOfOperation: '',
        phoneNumber: '',
        emailAddress: '',
        homePageUrl: '',
        address: {
            street: '',
            city: '',
            state: '',
            zipCode: '',
            country: '',
        },
    });

    const handleCreateBrewery = async (e) => {
        e.preventDefault();
        BreweryService.postCreateBrewery(breweryInfo);
        navigate('/users');
    };

    function handleInputChange(event) {
        event.preventDefault();
        setBreweryInfo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }
    if (!isRoleAdmin)
        return (
            <main>
                <h1 className='heading'>
                    You are not authorized to view this page.
                </h1>
            </main>
        );
    return (
        <main>
            <div className='main__content-panel add-brewery__panel'>
                <h3>Add Brewery Form</h3>
                <form id='add-brewery__form'>
                    <label className='sr-only'>Brewery Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Brewery Name'
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type='submit'
                        onClick={handleCreateBrewery}
                        id='add-brewery__button'
                    >
                        Add Brewery
                    </button>
                </form>
            </div>
            <div className='main__image-panel'>
                <img
                    src='https://images.unsplash.com/photo-1658245798119-4fad546590ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                    alt={'Glasses of beer clinking together for a toast'}
                />
            </div>
        </main>
    );
}
