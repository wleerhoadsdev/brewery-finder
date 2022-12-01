import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import './Register.css';

export default function Register(props) {
    let navigate = useNavigate();

    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        name: '',
        emailAddress: '',
        password: '',
        confirmPassword: '',
        role: 'USER',
    });

    const handleInputChange = (event) => {
        event.preventDefault();
        setRegisterInfo((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (registerInfo.password === registerInfo.confirmPassword) {
            AuthService.register(registerInfo).then((response) => {
                if (response === 201) navigate('/login');
            });
        } else {
            alert('Password and Confirm Password must match!!!');
        }
    };

    return (
        <main>
            <div className='main__content-panel register__page'>
                <h1 className='heading'>Welcome to Beer Lovers</h1>
                <form id='register__form'>
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
                    <label className='sr-only'>Name</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        className='form-control'
                        placeholder='Name'
                        autoComplete='username'
                        onChange={handleInputChange}
                        required
                    />
                    <label className='sr-only'>Email</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        className='form-control'
                        placeholder='Email'
                        autoComplete='email'
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
                        autoComplete='new-password'
                        onChange={handleInputChange}
                        required
                    />
                    <input
                        type='password'
                        id='password-confirm'
                        name='confirmPassword'
                        className='form-control'
                        placeholder='Confirm Password'
                        autoComplete='new-password'
                        onChange={handleInputChange}
                        required
                    />
                    <button
                        type='submit'
                        onClick={handleSubmit}
                    >
                        Create Account
                    </button>
                </form>
                <div>
                    <span className='register__returning-user-prompt'>
                        Already have an account?
                    </span>
                    <Link
                        to='/login'
                        className='register__returning-user-link'
                    >
                        Log In
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
