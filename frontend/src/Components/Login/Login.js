import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import axios from 'axios'

export default function Login(props) {

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: ''
    })

    const handleLogin = async () => {
        const data = {
            username: loginInfo.username,
            password: loginInfo.password
        };


        const userWithToken = await axios.post(baseUrl + '/login', data)

        await props.handleToken(userWithToken.data.token)
        await props.handleUser(userWithToken.data.user);
    }

    function handleInputChange(event) {
        event.preventDefault()
        setLoginInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <div>
            <h1>Please Sign In</h1>
            <label className="sr-only">Username</label>
            <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                placeholder="Username"
                v-model="user.username"
                onChange={handleInputChange}
                required
            />
            <label className="sr-only">Password</label>
            <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Password"
                v-model="user.password"
                onChange={handleInputChange}
                required
            />
            <Link to="/register">Need an account?</Link>
            <Link to="/">
                <button type="submit" onClick={handleLogin}>Sign in</button>
            </Link>

        </div>
    )

}