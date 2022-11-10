import { Link } from 'react-router-dom'

export default function EditBeer(props) {

    const userText = props.user ?
        <h3>Welcome back {props.user.username}!</h3> :
        '';

    return (
        <div className='home--left-panel'>
            {userText}
            <h3> Page to Edit Existing Beer</h3>
            <Link to='/'>View All Breweries</Link>
            <img src='https://via.placeholder.com/600' alt='placeholder' />
        </div>
    )
}