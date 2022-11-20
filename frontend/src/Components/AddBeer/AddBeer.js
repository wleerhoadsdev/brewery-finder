import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserService from '../../services/user.service';

export default function AddBeer(props) {
    const role = props.user ? props.user.authorities[0].name : '';
    let navigate = useNavigate();
    const params = useParams();
    const breweryId = params.breweryId;

    const [beerInformation, setBeerInformation] = useState({
        name: '',
        description: '',
        imageUrl: '',
        abv: 0,
        typeId: 1,
        breweryId: breweryId,
        isActive: true,
    });

    const handleInputChange = (event) => {
        event.preventDefault();
        setBeerInformation((prevBeerInformation) => ({
            ...prevBeerInformation,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        UserService.postCreatedBeer(beerInformation, breweryId).then(
            (response) => {
                alert('Beer was created');
                navigate(`/brewery/${breweryId}/beers`);
            }
        );
    };

    const beerOptions = props.beerTypes.map((type) => {
        return (
            <option
                key={type.typeId}
                value={type.typeId}
            >
                {type.style}
            </option>
        );
    });

    if (role === 'ROLE_BREWER') {
        return (
            <form onSubmit={handleSubmit}>
                <label>Name of Beer</label>
                <input
                    name='name'
                    type='text'
                    onChange={handleInputChange}
                />
                <label>Description</label>
                <input
                    name='description'
                    type='text'
                    onChange={handleInputChange}
                />
                <label>Image</label>
                <input
                    name='imageUrl'
                    type='url'
                    onChange={handleInputChange}
                />
                <label>Alcohol by Volume</label>
                <input
                    name='abv'
                    type='number'
                    min='0.0'
                    max='67.5'
                    step='0.01'
                    onChange={handleInputChange}
                />
                <label>Beer Type</label>
                <select
                    name='typeId'
                    type='text'
                    onChange={handleInputChange}
                    value={beerInformation.beerType}
                >
                    {beerOptions}
                </select>
                <button>Add Beer</button>
            </form>
        );
    } else {
        return <p>You are not authorized to view this page.</p>;
    }
}
