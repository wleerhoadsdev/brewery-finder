import { Link } from 'react-router-dom'

export default function Home(props) {

    const userText = props.user ?
        <h3 className='home__greeting'>Welcome back <span className='home__user'>{props.user.username}</span>!</h3> :
        '';
    const role = props.user ? props.user.authorities[0].name : '';
    if(role==="ROLE_ADMIN"){
        return (
            <div className='home__left-panel'>
                {userText}
                <h3>Discover your new favorite beer</h3>
                <Link to='/ViewAllBreweries'>View All Breweries</Link>
                <Link to='/ViewAllUsers'>View All Users</Link>
                <img
                    src='https://via.placeholder.com/600'
                    alt='placeholder'
                    className='home__image' />
            </div>
        )
    }
    return (
        <div className='home__left-panel'>
            {userText}
            <h3>Discover your new favorite beer</h3>
            <Link to='/ViewAllBreweries'>View All Breweries</Link>
            <img
                src='https://via.placeholder.com/600'
                alt='placeholder'
                className='home__image' />
        </div>
    )
}