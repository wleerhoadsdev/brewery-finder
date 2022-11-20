import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';

export default function Login(props) {
    let navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        username: '',
        password: '',
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        AuthService.login(loginInfo)
            .then((response) => {
                if (response.token) {
                    props.handleToken(
                        JSON.parse(sessionStorage.getItem('token'))
                    );
                    props.handleUser(
                        JSON.parse(sessionStorage.getItem('user'))
                    );
                    navigate('/');
                }
            })
            .catch((error) => {
                setLoginInfo((prevState) => ({
                    ...prevState,
                    password: '',
                }));
            });
    };

    function handleInputChange(event) {
        event.preventDefault();
        setLoginInfo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }

    return (
        <div>
            <h1>Please Sign In</h1>
            <form>
                <label className='sr-only'>Username</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    className='form-control'
                    placeholder='Username'
                    autoComplete='username'
                    onChange={handleInputChange}
                    required
                />
                <label className='sr-only'>Password</label>
                <input
                    type='password'
                    id='password'
                    name='password'
                    className='form-control'
                    placeholder='Password'
                    autoComplete='current-password'
                    onChange={handleInputChange}
                    value={loginInfo.password}
                    required
                />
                <Link to='/register'>Need an account?</Link>
                <button
                    type='submit'
                    onClick={handleLogin}
                >
                    Sign in
                </button>
            </form>
        </div>
    );
}
