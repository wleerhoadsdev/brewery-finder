import React from 'react';
import { Link } from 'react-router-dom'

export default function AddBeer(props) {

    const userText = props.user ?
        <h3 className='home__user'>Welcome back {props.user.username}!</h3> :
        '';

    const role = props.user ? props.user.authorities[0].name:'';
    const [name,setName]=React.useState();
    const [description,setDescription]=React.useState();
    const [image,setImage]=React.useState();
    const [adv,setAdv]=React.useState();
    const [beerType,setBeerType]=React.useState();

    React.useEffect(()=>{
        //Send POST request to API with information about new beer
    },[])

    function handleSubmit(event){
        return(
            <p>Form Submitted!</p>
        )
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
                name='adv' 
                type='number'
                min='0.0'
                max='67.5'
                onChange={e=>setAdv(e.target.value)}
                value={adv}
            />
            <br/>
            <label>Beer Type</label>
            <input
                name='beerType'
                type='text'
                onChange={e=>setBeerType(e.target.value)}
                value={beerType}
                />
            <input 
                className='submitButton'
                type='submit' 
                value='Add Beer'
            />
        </form>
        )
    }
    else{
        return(
            <p>You are not authorized to view this page.</p>
        )
    }
}