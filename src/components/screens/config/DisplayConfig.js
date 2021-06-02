import React, { useState, useEffect } from 'react';
import ConfigGroup from "./ConfigGroup.js";
import { fetchConfig } from "../../api/system";
import Button from '../../Button';
import { Link } from 'react-router-dom';

const DisplayConfig = () => {

    const [config, setConfig] = useState();

    useEffect(() => {
        const getConfig = async () => {
            const configFromServer = await fetchConfig();
            setConfig(configFromServer);
        }

        getConfig();
    }, []);

    return (
        <>
            <h2>
                <Link to="/" className="unfocused">Containers</Link>
                <Link to="/images" className="unfocused">Images</Link>
                <Link to="/repo" className="unfocused">Repo</Link>
                <span className="subpage-header">Config</span>
            </h2>
            <h3 className="topbar">
                <Button text="save"/>
            </h3>
            <div>
                { typeof config == "undefined" ?
                    <div />
                    : 
                    Object.entries(config).map(([groupTitle, configGroup]) => (
                        <ConfigGroup groupTitle={groupTitle} configGroup={configGroup} />
                    ))
                }
            </div>
        </>
    )
}

export default DisplayConfig;
