import axios from 'axios';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBeerInformation(props) {
  const [beerData, setBeerData] = React.useState([]);
  const [avgRating, setAvgRating] = React.useState(0);
  /*TODO: Call on beerType API endpoint to display correct beer type */

  let params = useParams();
  const breweryId = params.breweryId;
  const beerId = params.beerId;

  React.useEffect(() => {
    axios
      .get(baseUrl + `/brewery/${breweryId}/beer/${beerId}`)
      .then((response) => {
        setBeerData(response.data);
      });
    axios
      .get(baseUrl + `/brewery/${breweryId}/beer/${beerId}/avgrating`)
      .then((response) => {
        setAvgRating(response.data);
      });
  }, [beerId, breweryId]);

  if (beerData.isActive) {
    return (
      <div className='home--left-panel'>
        <h3>{beerData.beerName}</h3>
        <p>{beerData.description}</p>
        <p>{beerData.abv}</p>
        {/*TODO: change beerTypeId to beerType */}
        <p>Beer Type: {beerData.typeId}</p>
        <p>Average Rating:{avgRating}</p>
        <Link
          to={{
            pathname: `/brewery/${breweryId}/beers`,
          }}
        >
          View Beer List
        </Link>
        <br />
        <br />
        <Link
          to={{
            pathname: `/brewery/${breweryId}/beer/${beerId}/addreview`,
          }}
        >
          Add Review
        </Link>
        <img
          src={beerData.imageUrl}
          alt={`${beerData.beerName}`}
        />
      </div>
    );
  } else {
    return <></>;
  }
}
