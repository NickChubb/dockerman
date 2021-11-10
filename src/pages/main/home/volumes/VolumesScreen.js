import React from 'react';
import Tabs from '../../Tabs.js';
import VolumesPanel from './VolumesPanel.js';

// CSS Import
import './volumes.css';

const VolumesScreen = () => {

    return (
        <div className="home-screen">

            <div className="side-spanel">
                <Tabs page="Volumes" />
                <VolumesPanel />
            </div>
    
            <div className="info-panel">
                
                {/* <Switch>
                    <Route path="/container/:id">
                        <DisplayContainer />
                    </Route>

                    <Route path={["/container", "/"]}>
                        <NoContainerSelected />
                    </Route>
                </Switch> */}
                
            </div>

        </div>
    )
}

export default VolumesScreen;