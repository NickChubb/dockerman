import { useState } from 'react';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const useToken = () => {
    const getToken = () => {
        return cookies.get('token');
    };
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        // Store token as cookie
        const token = userToken?.token;
        cookies.set('token', token, { path: "/" });
        setToken(token);
    };

    return {
        setToken: saveToken,
        token
    }
}

export default useToken;