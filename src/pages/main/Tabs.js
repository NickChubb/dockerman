import React from 'react';
import ToggleLink from '../../components/ToggleLink.js';

const Tabs = ({page}) => {

    return (
        <h2 className='tabs'>
            <ToggleLink to="/" title="Containers" page={page} />
            <ToggleLink to="/images" title="Images" page={page} />
            <ToggleLink to="/volumes" title="Volumes" page={page} />
            <ToggleLink to="/networks" title="Networks" page={page} />
        </h2>
    )
}

export default Tabs;

