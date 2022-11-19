import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBrewery(props) {
  const [isMyBrewery, setIsMyBrewery] = React.useState(false);
  const [breweryData, setBreweryData] = React.useState({});
  const [address, setAddress] = React.useState('');

  let params = useParams();
  const breweryId = params.breweryId;
  const userId = props.user ? props.user.id : '';

  React.useEffect(() => {
    axios.get(baseUrl + `/brewery/${breweryId}`).then((response) => {
      const { street, city, state, zipCode, country } = response.data.address;
      setAddress(`${street} ${city} ${state} ${zipCode} ${country}`);
      setBreweryData(response.data);
      if (response.data.breweryOwnerUserId === userId) {
        setIsMyBrewery(true);
      }
    });
  }, [breweryId, userId]);

  return (
    <main>
      <div className='main--content-panel'>
        <h3>Brewery Info</h3>
        <Link to='/breweries'>Go Back to Listing</Link>
        <p>{breweryData.name}</p>
        <Link
          to={{
            pathname: `/brewery/${breweryId}/beers`,
          }}
        >
          View Brewery Beer List
        </Link>
        <p>{breweryData.emailAddress}</p>
        <p>{breweryData.history}</p>
        <p>{breweryData.hoursOfOperation}</p>
        <p>{address}</p>
        <p>{breweryData.phoneNumber}</p>
        {isMyBrewery ? (
          <Link
            to={{
              pathname: `/brewery/${breweryId}/editbrewery`,
            }}
            onClick={() => {
              props.handleEditBreweryData(breweryData);
            }}
          >
            Edit Brewery Information
          </Link>
        ) : (
          ''
        )}
        <br />
      </div>
      <div className='main--image-panel'>
        <img
          src={breweryData.imageUrl}
          alt='placeholder'
          className='ViewAllBreweries__image'
        />
      </div>
    </main>
  );
}
