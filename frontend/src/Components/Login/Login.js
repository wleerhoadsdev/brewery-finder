import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../../Shared/baseUrl';
import axios from 'axios';

export default function Login(props) {
  let navigate = useNavigate();

  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      username: loginInfo.username,
      password: loginInfo.password,
    };

    await axios
      .post(baseUrl + '/login', data)
      .then((response) => {
        props.handleToken(response.data.token);
        props.handleUser(response.data.user);
        navigate('/');
      })
      .catch((error) => {
        console.log(
          error.response.data.error + ': ' + error.response.data.message
        );
        alert('Login was unsuccessful');
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
