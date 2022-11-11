import { Link } from 'react-router-dom'

export default function ViewBrewery(props) { 
    console.log(props)

    return (
        <div className='home--left-panel'>
            <h3>Page to View details about a Brewery</h3>
            <Link to='/'>View All Breweries</Link>
            <img src='https://via.placeholder.com/600' alt='placeholder' />
        </div>
    )
}