import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BeerService from '../../services/beer.service';
import NotAuthorized from '../NotAuthorized/NotAuthorized';
import './AddBeer.css';

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
        BeerService.postCreatedBeer(beerInformation, breweryId).then(
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
            <main id='add-beer__page'>
                <div className='main__content-panel'>
                    <form
                        onSubmit={handleSubmit}
                        id='add-beer__form'
                    >
                        <h1 className='heading'>Add a new beer</h1>
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
                            placeholder='https://www....'
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
                </div>

                <div className='main__image-panel'>
                    <img
                        src='https://images.unsplash.com/photo-1658245798119-4fad546590ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                        alt={'Glasses of beer clinking together for a toast'}
                    />
                </div>
            </main>
        );
    } else {
        return <NotAuthorized />;
    }
}
