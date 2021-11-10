import React from 'react';
import Tabs from '../../Tabs.js';
import ImagesPanel from './ImagesPanel.js';

const ImagesScreen = () => {

    return (
        <div className="home-screen">

            <div className="side-panel">
                <Tabs page="Images" />
                <ImagesPanel />
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

export default ImagesScreen;