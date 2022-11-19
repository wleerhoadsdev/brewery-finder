import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../../Shared/baseUrl'
import './Register.css'

export default function Register(props) {
    let navigate=useNavigate();

    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        name: '',
        email: '',
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            username: registerInfo.username,
            name: registerInfo.name,
            emailAddress: registerInfo.email,
            password: registerInfo.password,
            confirmPassword: registerInfo.confirmPassword,
            role: 'USER'
        }
        if (registerInfo.password === registerInfo.confirmPassword) {
            axios.post(baseUrl + "/register", data)
                .then(() => {
                    alert('Account creation successful! \nLogin to your new account')
                    navigate('/login')
                })
                .catch((error) => {
                    if (error.response) {
                        const { message } = error
                        alert(message)
                    } else if (error.request) {
                        console(error.response)
                    } else {
                        alert(error.response)
                    }
                })
        } else {
            alert("Password and Confirm Password must match!!!")
        }
    }

    return (
        <div>
            <h1>Create Account</h1>
            <form>
                <label className="sr-only">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    placeholder="Username"
                    autocomplete="username"
                    onChange={handleInputChange}
                    required
                />
                <label className="sr-only">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    autocomplete="username"
                    onChange={handleInputChange}
                    required
                />
                <label className="sr-only">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    autoComplete='email'
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
                    autoComplete="new-password"
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="password"
                    id="password-confirm"
                    name="confirmPassword"
                    className="form-control"
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    onChange={handleInputChange}
                    required
                />
                <Link to="/login">Have an account?</Link>
                <button type="submit" onClick={handleSubmit}>Create Account</button>
            </form>
        </div>
    )

}