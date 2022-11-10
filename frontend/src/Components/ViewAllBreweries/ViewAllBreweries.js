import { Link } from 'react-router-dom'

export default function ViewAllBreweries(props) {

    // const userText = props.user ?
    //     <h3>Welcome back {props.user.username}!</h3> :
    //     '';

    return (
        <div className='home--left-panel'>
            {/* {userText} */}
            <h3> Below are our List of Breweries!</h3>
            <Link to='/'>View All Breweries</Link>
        </div>
    )
}