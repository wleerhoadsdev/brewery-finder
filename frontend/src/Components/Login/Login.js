import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import './Login.css';

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
        <main>
            <div className='main__content-panel login__page'>
                <h1 className='heading'>Welcome to Beer Lovers</h1>
                <form id='login__form'>
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
                    <button
                        type='submit'
                        onClick={handleLogin}
                    >
                        Log in
                    </button>
                </form>
                <div>
                    <span className='login__new-user-prompt'>
                        Are you a new user?
                    </span>
                    <Link
                        to='/register'
                        className='login__new-user-link'
                    >
                        Sign up
                    </Link>
                </div>
            </div>
            <div className='main__image-panel'>
                <img
                    src='https://images.unsplash.com/photo-1585507137283-f883284cfcda?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                    alt={'goblet of beer'}
                />
            </div>
        </main>
    );
}
