import React from 'react';
import { Switch, Route } from 'react-router-dom';

/**
 * Import all page components here
 */
import MainPage from './MainPage';
import ContainerPage from './ContainerPage';

/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
const Routes = () => {
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
