import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useToken from './components/useToken';

/**
 * Import all page components here
 */
import MainPage from './page/MainPage';
import ContainerPage from './page/ContainerPage';
import LoginPage from './page/LoginPage';

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
const Routes = () => {

    const { token, setToken } = useToken();

    if(!token) {
      return <LoginPage setToken={setToken} />
    }

    return (
    <Switch>
        
        <Route path="/container/:containerId">
          <ContainerPage />
        </Route>

        <Route path="/">
          <MainPage />
        </Route>

      </Switch>
    )
}

export default Routes;
