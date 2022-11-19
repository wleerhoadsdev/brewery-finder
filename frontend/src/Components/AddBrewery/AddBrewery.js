import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';

export default function AddBrewery(props) {
  let navigate = useNavigate();

  const [breweryInfo, setBreweryInfo] = React.useState({
    name: '',
  });

  const handleCreateBrewery = async (e) => {
    e.preventDefault();
    const data = {
      breweryOwnerUserId: props.newBrewerId,
      name: breweryInfo.name,
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
    };

    axios
      .post(baseUrl + '/brewery/addbrewery', data)
      .then((response) => {
        alert('Brewery was created');
        props.handleNewBrewerId('');
        navigate('/users');
      })
      .catch((error) => {
        if (error.response) {
          // Request made and server responded
          alert(error.response.data);
          console.error(error.response.status + ': ' + error.response.data);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          alert(error.request);
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          alert('Error \n', error.message);
          console.log('Error', error.message);
        }
      });
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
