import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Screens
import LogScreen from './log/LogScreen';
import ConfigScreen from './config/ConfigScreen';
import ImagesScreen from './home/images/ImagesScreen';
import VolumesScreen from './home/volumes/VolumesScreen';
import NetworksScreen from './home/networks/NetworksScreen';
import ContainersScreen from './home/containers/ContainersScreen';


const MainRoutes = () => {

    return(
        <div className='main-routes'>
            <Switch>

                <Route path="/log">
                    <LogScreen />
                </Route>

                <Route path="/config">
                    <ConfigScreen />
                </Route>

                <Route path="/images">
                    <ImagesScreen />
                </Route>

                <Route path="/volumes">
                    <VolumesScreen />
                </Route>

                <Route path="/networks">
                    <NetworksScreen />
                </Route>

                <Route path={["/containers", "/"]}>
                    <ContainersScreen />
                </Route>

            </Switch>
        </div>

    )
}

export default MainRoutes;