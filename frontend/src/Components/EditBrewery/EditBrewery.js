import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import BreweryService from '../../services/brewery.service';
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import './EditBrewery.css';

export default function EditBrewery(props) {
    const userId = props.user ? props.user.id : '';
    const params = useParams();
    const navigate = useNavigate();
    const breweryId = params.breweryId;
    const breweryData = props.breweryData;
    const [formData, setFormData] = useState({
        name: breweryData.name || '',
        emailAddress: breweryData.emailAddress || '',
        history: breweryData.history || '',
        hoursOfOperation: breweryData.hoursOfOperation || '',
        address: {
            street: breweryData.address.street || '',
            city: breweryData.address.city || '',
            state: breweryData.address.state || '',
            zipCode: breweryData.address.zipCode || '',
            country: breweryData.address.country || '',
        },
        phoneNumber: breweryData.phoneNumber || '',
        homePageUrl: breweryData.homePageUrl || '',
        imageUrl: breweryData.imageUrl || '',
    });
    const { street, city, state, zipCode, country } = formData.address;

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevFormData) => {
            const newFormData = { ...prevFormData };

            if (
                name === 'street' ||
                name === 'city' ||
                name === 'state' ||
                name === 'zipCode' ||
                name === 'country'
            ) {
                newFormData.address[name] = value;
            } else {
                newFormData[name] = value;
            }

            return newFormData;
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const updatedBreweryData = {
            ...breweryData,
            ...formData,
            isActive: true,
            isApproved: true,
        };

        BreweryService.putUpdatedBrewery(breweryId, updatedBreweryData).then(
            () => {
                navigate(`/brewery/${breweryId}`);
            }
        );
    }

    if (!userId) return <NotAuthorized />;
    return (
        <main id='edit-brewery__page'>
            <div className='main__content-panel'>
                <h1 className='edit_brewery_heading'>
                    Edit Brewery Information
                </h1>
                <form
                    onSubmit={handleSubmit}
                    id='edit-brewery__form'
                >
                    <input
                        type='text'
                        placeholder='Brewery Name'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        type='email'
                        placeholder='Brewery Email'
                        name='emailAddress'
                        value={formData.emailAddress}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery History'
                        name='history'
                        value={formData.history}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Hours of Operation'
                        name='hoursOfOperation'
                        value={formData.hoursOfOperation}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Address: Street Address'
                        name='street'
                        value={street}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Address: City'
                        name='city'
                        value={city}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Address: State'
                        name='state'
                        value={state}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Address: ZipCode'
                        name='zipCode'
                        value={zipCode}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Address: Country'
                        name='country'
                        value={country}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Phone Number'
                        name='phoneNumber'
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Home Page Url'
                        name='homePageUrl'
                        value={formData.homePageUrl}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        placeholder='Brewery Image Url'
                        name='imageUrl'
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                </form>
                <Link to={{ pathname: `/brewery/${breweryId}` }}>
                    Go back to {formData.name} page
                </Link>
            </div>

            <div className='main__image-panel'></div>
        </main>
    );
}
