import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function EditBrewery(props) {
  const params = useParams();
  const breweryId = params.breweryId;
  const breweryData = props.breweryData;
  const [formData, setFormData] = React.useState({
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

    const data = {
      ...breweryData,
      ...formData,
      isActive: true,
      isApproved: true,
    };
    console.log(data);
    axios
      .put(baseUrl + `/brewery/${breweryId}`, data)
      .then((response) => {
        alert('Brewery infomation was updated!');
        console.log(response);
      })
      .catch((error) => {
        console.log(
          error.respone.data.error + ': ' + error.response.data.message
        );
        alert('Brewery information was not updated!');
      });
  }

  return (
    <div className='edit_brewery_page'>
      <h3 className='edit_brewery_heading'>
        {' '}
        Edit Existing Brewery Information
      </h3>
      <form onSubmit={handleSubmit}>
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
      <br />
      <Link to={{ pathname: `/brewery/${breweryId}` }}>Go back</Link>
    </div>
  );
}
