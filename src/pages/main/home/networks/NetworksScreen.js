import React from 'react';
import Tabs from '../../Tabs.js';
// import DisplayImages from './DisplayImages.js';
import NetworksPanel from './NetworksPanel';

const NetworksScreen = () => {

    return (
        <div className="home-screen">

            <div className="side-panel">
                <Tabs page="Networks" />
                <NetworksPanel />
            </div>

        </div>
    )
}

export default NetworksScreen;