/**
 * Home Screen to Display list of containers and the
 * Container info panel.
 */

import React from 'react';
import { Switch, Route, useRouteMatch, withRouter } from 'react-router-dom';

// CSS imports
import '../home.css';

//
import Tabs from '../../Tabs.js';
import DisplayContainers from './DisplayContainers.js';
import DisplayContainer from './DisplayContainer.js';

const ContainersScreen = () => {

    let { path, url } = useRouteMatch();
    console.log(path);

    return (
        <div className="home-screen">

            <div className="side-panel">
                <Tabs page="Containers" />
                <DisplayContainers />
            </div>
    
            <Switch>
                <Route path={`${path}/:id`}>
                    <div className="info-panel">
                        <DisplayContainer />
                    </div>
                </Route>

                <Route exact path={path} >
                    <div style={{ display: 'none' }}>
                        
                    </div>    
                </Route>
            </Switch>

        </div>
    )
}

export default withRouter(ContainersScreen);