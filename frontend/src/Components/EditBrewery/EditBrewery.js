import React from 'react';
import { Link, useLocation } from 'react-router-dom'

export default function EditBrewery(props) {

    const location = useLocation();
    const breweryId = location.state.breweryId;
    const breweryData = location.state.breweryData;
    const [formData, setFormData] = React.useState({
        name: breweryData.name || "",
        email: breweryData.emailAddress || "",
        history: breweryData.history || "",
        hoursOfOperation: breweryData.hoursOfOperation || "",
        address: {
            street: breweryData.address.street || "",
            city: breweryData.address.city || "",
            state: breweryData.address.state || "",
            zipCode: breweryData.address.zipCode || "",
            country: breweryData.address.country || ""
        },
        phoneNumber: breweryData.phoneNumber || ""
    });
    const {street, city, state, zipCode, country} = formData.address;

    return (
        <div className='edit_brewery_page'>
            <h3 className='edit_brewery_heading'> Edit Existing Brewery Information</h3>
            <form>
                <input type="text" placeholder="Brewery Name" value={formData.name} /* onChange={handleNameChange} */ />
                <input type="email" placeholder="Brewery Email" value={formData.email} /* onChange={handleEmailChange} */ />
                <input type="text" placeholder="Brewery History" value={formData.history} /* onChange={handleHistoryChange} */ />
                <input type="text" placeholder="Brewery Hours of Operation" value={formData.hoursOfOperation} /* onChange={handleHourOfOperationChange} */ />
                <input type="text" placeholder="Brewery Address: Street Address" value={street} /* onChange={handleSteetChange} */ />
                <input type="text" placeholder="Brewery Address: City" value={city} /* onChange={handleCityChange} */ />
                <input type="text" placeholder="Brewery Address: State" value={state} /* onChange={handleStateChange} */ />
                <input type="text" placeholder="Brewery Address: ZipCode" value={zipCode} /* onChange={handleZipCodeChange} */ />
                <input type="text" placeholder="Brewery Address: Country" value={country} /* onChange={handleCountryChange} */ />
                <input type="text" placeholder="Brewery Phone Number" value={formData.phoneNumber} /* onChange={handlePhoneNumberChange} */ />
            </form>
            <br />
            <Link to={{pathname: `/ViewBrewery/${breweryId}`, state:{breweryId: breweryId}}}>Go back</Link>
        </div>
    )
}