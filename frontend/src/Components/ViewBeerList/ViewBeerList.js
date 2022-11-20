import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';

export default function ViewBeerList(props) {
  const role = props.user ? props.user.authorities[0].name : '';
  const userId = props.user ? props.user.id : '';
  const [beersData, setBeersData] = React.useState([]);
  const [breweryData, setBreweryData] = React.useState({});
  const [beerRatings, setBeerRatings] = React.useState({});
  const [isMyBrewery, setIsMyBrewery] = React.useState({});

  let params = useParams();
  let breweryId = params.breweryId;
  const beerTypes = props.beerTypes;
  let beerTypesObj = {};

  beerTypes.forEach((beerType) => {
    beerTypesObj = {
      ...beerTypesObj,
      [beerType.typeId]: beerType.style,
    };
  });

  React.useEffect(() => {
    setBeersAndBrewery();
    getBeerRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setBeersAndBrewery() {
    axios.get(baseUrl + `/brewery/${breweryId}/beer`).then((response) => {
      setBeersData(response.data);
    });
    axios.get(baseUrl + `/brewery/${breweryId}`).then((response) => {
      setBreweryData(response.data);
      if (userId === breweryData.breweryOwnerUserId) {
        setIsMyBrewery(true);
      }
    });
  }

  function getBeerRatings() {
    axios
      .get(baseUrl + `/brewery/${breweryId}/beer/avgrating`)
      .then((response) => {
        response.data.forEach((rating) => {
          const beerId = rating.beerId;
          const averageRating = rating.averageRating;
          setBeerRatings(() => ({
            ...beerRatings,
            [beerId]: averageRating,
          }));
        });
      });
  }

  function handleActiveChange(e, beerId) {
    const data = beersData.filter((beer) => beer.beerId === beerId)[0];
    const isActive = data.isActive;
    data.isActive = !isActive;

    axios
      .put(`${baseUrl}/brewery/${breweryId}/beer/${beerId}`, data)
      .then((response) => {
        alert('Beer is now ' + (isActive ? 'Inactive' : 'Active'));
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
  }

  const beerListElements = beersData.map((beer) => {
    if (isMyBrewery || beer.isActive) {
      const beerRating = beerRatings[beer.beerId]
        ? beerRatings[beer.beerId]
        : '';
      return (
        <tr key={beer.id}>
          <td>
            <Link
              to={{
                pathname: `/brewery/${breweryId}/beers/${beer.beerId}`,
              }}
            >
              {beer.name}
            </Link>
          </td>
          <td>{beerTypesObj[beer.typeId]}</td>
          <td>{beer.description}</td>
          <td>{beer.abv}</td>
          <td>{beerRating}</td>
          {isMyBrewery && role === 'ROLE_BREWER' ? (
            <td>
              <button
                onClick={(e) => {
                  handleActiveChange(e, beer.beerId);
                }}
              >
                Toggle beer to {beer.isActive ? 'Inactive' : 'Active'}
              </button>
            </td>
          ) : (
            ''
          )}
        </tr>
      );
    } else {
      return <div></div>;
    }
  });

  return (
    <main>
      <div className='main--content-panel'>
        <h3>Page to View Full List of Beers</h3>
        <Link to='/breweries'>View All Breweries</Link>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>ABV</th>
              <th>AVG Rating</th>
              {isMyBrewery && <th>Active Toggle</th>}
            </tr>
          </thead>
          <tbody>{beerListElements}</tbody>
        </table>
        {isMyBrewery ? (
          <Link
            to={{
              pathname: `/brewery/${breweryId}/addbeer`,
            }}
          >
            Add Beer
          </Link>
        ) : (
          ''
        )}
      </div>
      <div className='main__image-panel'>
        <img
          src='https://via.placeholder.com/600'
          alt='placeholder'
        />
      </div>
    </main>
  );
}
