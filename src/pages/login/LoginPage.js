import React, { useState } from 'react';
import PropTypes from 'prop-types';

// CSS imports
import './login.css';

// Components
import Button from '../../components/Button';
import { loginUser } from '../../api/login';

const LoginPage = ({ setToken }) => {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get client info from https://geolocation-db.com/json/
        const geolocationResponse = await fetch('https://geolocation-db.com/json/');
        const clientInfo = await geolocationResponse.json();

        const ip = clientInfo.IPv4;
        const location = `${clientInfo.city}, ${clientInfo.state}, ${clientInfo.country_name}`;

        const token = await loginUser({
            username,
            password,
            ip,
            location
        });
        
        if (token) {
            setToken(token);
        }
    }

    return (
        <div className="body">
            <div className='display'>
                <h1>Please Log In</h1>
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
        </div>
    )
}

LoginPage.propTypes = {
  setToken: PropTypes.func.isRequired
}

export default LoginPage;
