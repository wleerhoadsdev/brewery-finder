import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';

export default function AddBrewery(props) {
    const routerHistory = useHistory();

    const [breweryInfo, setBreweryInfo] = React.useState({
        name: '',
        breweryOwnerUserId: '',
    })

    const handleCreateBrewery = async (e) => {
        e.preventDefault()
        const data = {
            "breweryOwnerUserId": props.myBrewery,
            "name": breweryInfo.name,
            "isActive": false,
            "isApproved": false,
            "imageUrl": "",
            "history": "",
            "hoursOfOperation": "",
            "phoneNumber": "",
            "emailAddress": "",
            "homePageUrl": "",
            "address": {
                "street": "",
                "city": "",
                "state": "",
                "zipCode": "",
                "country": ""
            }
        }

        axios.post(baseUrl + '/brewery/addbrewery', data)
            .then(response => {
                alert("Brewery was created")
                routerHistory.push('/viewAllUsers')
                props.handleCurrentBrewery('')
            })
            .catch(error => {
                console.log(error.response.data.error + ': ' + error.response.data.message)
                alert('Brewery creation was unsuccessful')
            })
    }

    function handleInputChange(event) {
        event.preventDefault()
        setBreweryInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }


    return (
        <main>
            <div className='home--content-panel'>

                <h3>Add Brewery Form</h3>
                <Link to='/'>View All Breweries</Link>
                <form>
                    <label className="sr-only">Brewery Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Brewery Name"
                        onChange={handleInputChange}
                        required
                    />
                    <button type="submit" onClick={handleCreateBrewery}>Create Account</button>
                </form>
            </div>
            <div>
                <img src='https://via.placeholder.com/600' alt='placeholder' />
            </div>
        </main>
    )
}