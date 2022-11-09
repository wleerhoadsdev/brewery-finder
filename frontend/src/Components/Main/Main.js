import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'
import AddBeer from '../AddBeer/AddBeer'
import AddBrewery from '../AddBrewery/AddBrewery'
import EditBeer from '../EditBeer/EditBeer'
import EditBrewery from '../EditBrewery/EditBrewery'
import ViewAllBreweries from '../ViewAllBreweries/ViewAllBreweries'
import ViewAllUsers from '../ViewAllUsers/ViewAllUsers'
import ViewBeerInformation from '../ViewBeerInformation/ViewBeerInformation'
import ViewBeerList from '../ViewBeerList/ViewBeerList'
import ViewBrewery from '../ViewBrewery/ViewBrewery'

export default function Main(props) {
    const [token, setToken] = useState("")
    const [user, setUser] = useState()

    const handleLogout = () => {
        setToken("")
        setUser()
    }

    const handleToken = (token) => {
        setToken(token)
    }

    const handleUser = (user) => {
        setUser(user)
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
                <Route path='/' component={() =>
                    <Home
                        user={user}
                        token={token}
                    />}
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
                    />}
                />
                <Route path='/EditBeer' component={() =>
                    <EditBeer
                        user={user}
                        token={token}
                    />}
                />
                <Route path='/EditBrewery' component={() =>
                    <EditBrewery
                        user={user}
                        token={token}
                    />}
                />
                <Route path='/ViewAllBreweries' component={() =>
                    <ViewAllBreweries
                        user={user}
                        token={token}
                    />}
                />
                <Route path='/ViewAllUsers' component={() =>
                    <ViewAllUsers
                        user={user}
                        token={token}
                    />}
                /><Route path='/ViewBeerInformation' component={() =>
                    <ViewBeerInformation
                        user={user}
                        token={token}
                    />}
                /><Route path='/ViewBeerList' component={() =>
                    <ViewBeerList
                        user={user}
                        token={token}
                    />}
                />
                <Route path='/ViewBrewery' component={() =>
                    <ViewBrewery
                        user={user}
                        token={token}
                    />}
                />
            </Switch>
        </div>
    )

}