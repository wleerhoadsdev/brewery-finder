import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postCreateBrewery } from '../../api';

export default function AddBrewery(props) {
    let navigate = useNavigate();

    const [breweryInfo, setBreweryInfo] = React.useState({
        name: '',
        breweryOwnerUserId: props.newBrewerId,
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

        postCreateBrewery(breweryInfo);
        props.handleNewBrewerId('');
        navigate('/users');
    };

    function handleInputChange(event) {
        event.preventDefault();
        setBreweryInfo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <main>
            <div className='main--content-panel'>
                <h3>Add Brewery Form</h3>
                <Link to='/breweries'>View All Breweries</Link>
                <form>
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
                    >
                        Add Brewery
                    </button>
                </form>
            </div>
            <div className='main--image-panel'>
                <img
                    src='https://via.placeholder.com/600'
                    alt='placeholder'
                />
            </div>
        </main>
    );
}
