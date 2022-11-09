import { Link } from 'react-router-dom'

export default function AddBeer(props) {

    const userText = props.user ?
        <h3 className='home__user'>Welcome back {props.user.username}!</h3> :
        '';

    return (
        <div className='home__left-panel'>
            {userText}
            <h3> Add Beer Form</h3>
            <Link to='/'>View All Breweries</Link>
            <img src='https://via.placeholder.com/600' alt='placeholder' className='home__image' />
        </div>
    )
}