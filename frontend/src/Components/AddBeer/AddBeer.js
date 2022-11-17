import axios from 'axios';
import React from 'react';
import { useHistory,useLocation } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl';

export default function AddBeer(props) {

    const userText = props.user ?
        <h3 className='home__user'>Welcome back {props.user.username}!</h3> :
        '';

    const location=useLocation();

    const role = props.user ? props.user.authorities[0].name:'';
    const routerHistory=useHistory();
    const [name,setName]=React.useState();
    const [description,setDescription]=React.useState();
    const [image,setImage]=React.useState();
    const [abv,setAbv]=React.useState();
    const [beerType,setBeerType]=React.useState();
    const {breweryData}=location.state;

    const handleCreateBeer = async  (e) =>{
        const data = {
            "name": name,
            "breweryId": props.brewery,
            "description": description,
            "abv": abv,
            "typeId": 1,
            "isActive": true,
            "imageUrl": image
        }
        let fullUrl=`${baseUrl}/brewery/${breweryData.breweryId}/addBeer`;
        console.log(fullUrl);
        axios.post(`${baseUrl}/brewery/${breweryData.breweryId}/addBeer`,data)
            .then(response =>{
                alert("Beer was created");
                routerHistory.push(baseUrl+'/ViewBeerList/'+props.brewery);
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
            })
    }

    function handleSubmit(event){
        event.preventDefault();
        handleCreateBeer(event);
    }
    
    if(role=='ROLE_BREWER'){
        return (
            <form onSubmit={e => {handleSubmit(e)}}>
            <label>Name of Beer</label>
            <br />
            <input 
                name='name' 
                type='text'
                onChange={e=>setName(e.target.value)}
                value={name}
            />
            <br/>
            <label>Description</label>
            <br />
            <input 
                name='description' 
                type='text'
                onChange={e=>setDescription(e.target.value)}
                value={description}
            />
            <br />
            <label>Image</label>
            <br/>
            <input
                name='image'
                type='url'
                onChange={e=>setImage(e.target.value)}
                value={image}
            />
            <br />
            <label>Alcohol by Volume</label>
            <br />
            <input
                name='abv' 
                type='number'
                min='0.0'
                max='67.5'
                onChange={e=>setAbv(e.target.value)}
                value={abv}
            />
            <br/>
            <label>Beer Type</label>
            <input
                name='beerType'
                type='text'
                onChange={e=>setBeerType(e.target.value)}
                value={beerType}
                />
            <button>Add Beer</button>
        </form>
        )
    }
    else{
        return(
            <p>You are not authorized to view this page.</p>
        )
    }
}