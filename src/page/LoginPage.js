import React, { useState } from 'react';
import './LoginPage.css';
import Button from '../components/Button';
import PropTypes from 'prop-types';
import { loginUser } from '../components/api/login';

const LoginPage = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });
        setToken(token);
    }

    return (
        <div className='display'>
            <h2>Please Log In</h2>
            <form className='login-form' onSubmit={handleSubmit}>
                <label className='login-element'>
                    <p>Username</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label className='login-element'>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <Button color="blue" type="submit" text="Login" />
                </div>
            </form>
        </div>
    )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginPage;
