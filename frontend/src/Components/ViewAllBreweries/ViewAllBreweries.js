import { Link } from 'react-router-dom'

export default function ViewAllBreweries(props) {

    // const userText = props.user ?
    //     <h3>Welcome back {props.user.username}!</h3> :
    //     '';

    const role = props.user ? props.user.authorities[0].name : '';
    const {brewery_name, phone_number, hours_of_operation, address} = props.data.breweryData;
    console.log('role: ' + role);
    console.log('breweryName: ' + brewery_name);
    console.log('breweryPhone: ' + phone_number);
    console.log('breweryHours: ' + hours_of_operation);
    console.log('breweryAddress: ' + address);

    return (
        <div className='breweries'>
            {/* {userText} */}
            <h3> Below are our List of Breweries!</h3>
            <div className="breweries--list">
                <h1>{brewery_name}</h1>
            </div>
            <Link to='/'>View All Breweries</Link>
        </div>
    )
}