import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import AddBeer from '../AddBeer/AddBeer'
import AddBrewery from '../AddBrewery/AddBrewery'
import EditBrewery from '../EditBrewery/EditBrewery'
import ViewAllBreweries from '../ViewAllBreweries/ViewAllBreweries'
import ViewAllUsers from '../ViewAllUsers/ViewAllUsers'
import ViewBeerInformation from '../ViewBeerInformation/ViewBeerInformation'
import ViewBeerList from '../ViewBeerList/ViewBeerList'
import ViewBrewery from '../ViewBrewery/ViewBrewery'
import axios from 'axios';
import { baseUrl } from '../../Shared/baseUrl'
import data from '../../data'

export default function Main(props) {
    // Use below for when API is unavailable and comment out other user useState()
    // const [user, setUser] = useState(data.mockLogins.user) 
    const [token, setToken] = useState("")
    const [user, setUser] = useState()
    const [currentBrewery, setCurrentBrewery] = useState("")
    const [currentBeer, setCurrentBeer] = useState("")
    const [myBrewery, setMyBrewery] = useState("")
    const [newBrewerId, setNewBrewerId] = useState("")

    const handleLogout = () => {
        setToken("")
        setUser()
        setCurrentBrewery("")
        setMyBrewery("")
        setCurrentBeer("")
        setNewBrewerId("")
    }

    const handleToken = (token) => {
        setToken(token)
    }

    const handleUser = (user) => {
        setUser(user)
    }

    const handleCurrentBrewery = (breweryId) => {
        setCurrentBrewery(breweryId)
    }

    const handleMyBrewery = (breweryId) => {
        setMyBrewery(breweryId)
    }

    const handleCurrentBeer = (beerId) => {
        setCurrentBeer(beerId)
    }

    const handleNewBrewerId = (userId) => {
        setNewBrewerId(userId)
    }

    return (
        <div>
            <Navbar
                user={user}
                handleLogout={handleLogout} />
            <Switch>
                <Route path='/login' component={() =>
                    <Login
                        handleToken={handleToken}
                        handleUser={handleUser}
                    />}
                />
                <Route path='/register' component={() =>
                    <Register />}
                />
                <Route path='/AddBeer' component={() =>
                    <AddBeer
                        user={user}
                        token={token}
                    />}
                />
                <Route path='/AddBrewery' component={() =>
                    <AddBrewery
                        user={user}
                        token={token}
                        newBrewerId={newBrewerId}
                        handleNewBrewerId={handleNewBrewerId}
                    />}
                />
                <Route path='/EditBrewery' component={() =>
                    <EditBrewery
                        user={user}
                        token={token}
                        brewery={currentBrewery}
                    />}
                />
                <Route path='/ViewAllBreweries' component={() =>
                    <ViewAllBreweries
                        user={user}
                        token={token}
                        handleCurrentBrewery={handleCurrentBrewery}
                        myBrewery={myBrewery}
                        brewery={currentBrewery}
                    />}
                />
                <Route path='/ViewAllUsers' component={() =>
                    <ViewAllUsers
                        user={user}
                        token={token}
                        handleNewBrewerId={handleNewBrewerId}
                    />}
                /><Route path='/ViewBeerInformation' component={() =>
                    <ViewBeerInformation
                        user={user}
                        token={token}
                        brewery={currentBrewery}
                        beer={currentBeer}
                    />}
                /><Route path='/ViewBeerList' component={() =>
                    <ViewBeerList
                        user={user}
                        token={token}
                        brewery={currentBrewery}
                        myBrewery={myBrewery}
                    />}
                />
                <Route path='/ViewBrewery'>
                    <ViewBrewery
                        user={user}
                        token={token}
                        brewery={currentBrewery}
                        myBrewery={myBrewery}
                    />
                </Route>
                <Route path='/' component={() =>
                    <Home
                        user={user}
                        token={token}
                        myBrewery={myBrewery}
                        handleMyBrewery={handleMyBrewery}
                    />}
                />
            </Switch>
        </div>
    )

}