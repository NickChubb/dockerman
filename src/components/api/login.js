import { homepage } from '../../../package.json';

// 
export const loginUser = async (credentials) => {
    
    let response = await fetch(`${homepage}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    let status = response.status;
    if (status != 200){
        alert('ERROR: invalid credentials.');
    }

    let data = await response.json();
    return data;
}