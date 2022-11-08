import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'

export default function Register(props) {
    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })

    const handleInputChange = (event) => {
        event.preventDefault()
        setRegisterInfo(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
    }

    const handleSubmit = () => {
        const data = {
            username: registerInfo.username,
            password: registerInfo.password,
            confirmPassword: registerInfo.confirmPassword,
            role: 'USER'
        }
        if (registerInfo.password === registerInfo.confirmPassword) {
            axios.post(baseUrl + "/register", data)
        } else {
            alert("Password and Confirm Password must match!!!")
        }
    }

    return (
        <div>
            <h1>Create Account</h1>
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
            <input
                type="password"
                id="password-confirm"
                name="confirmPassword"
                className="form-control"
                placeholder="Confirm Password"
                v-model="user.password"
                onChange={handleInputChange}
                required
            />
            <Link to="/login">Have an account?</Link>
            <button type="submit" onClick={handleSubmit}>Sign in</button>
        </div>
    )

}