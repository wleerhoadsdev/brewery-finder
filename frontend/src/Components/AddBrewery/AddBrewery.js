import { Link } from 'react-router-dom'

export default function AddBrewery(props) {

    const userText = props.user ?
        <h3>Welcome back {props.user.username}!</h3> :
        '';

    return (
        <div className='home--left-panel'>
            {userText}
            <h3> Form to Add Breweries</h3>
            <Link to='/'>View All Breweries</Link>
            <img src='https://via.placeholder.com/600' alt='placeholder' />
        </div>
    )
}