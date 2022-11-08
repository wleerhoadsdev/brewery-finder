import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'
import Login from '../Login/Login'
import Register from '../Register/Register'
import Home from '../Home/Home'
import Navbar from '../Navbar/Navbar'

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
            </Switch>
        </div>
    )

}