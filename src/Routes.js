import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import useToken from './components/useToken';

/**
 * Import all page components here
 */
import MainPage from './page/MainPage';
import ContainerPage from './page/ContainerPage';
import LoginPage from './page/LoginPage';

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

      <Route path="/">
        <MainPage />
      </Route>

    </Switch>
    )
}

export default Routes;
