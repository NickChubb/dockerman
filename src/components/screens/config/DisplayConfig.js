import React, { useState, useEffect } from 'react';
import ConfigGroup from "./ConfigGroup.js";
import { fetchConfig, updateConfig } from "../../api/system";
import Button from '../../Button';
import { Link, useHistory } from 'react-router-dom';
import { Form, Row, Col, InputGroup, FormControl } from 'react-bootstrap';


const DisplayConfig = () => {

    let history = useHistory();

    const [config, setConfig] = useState();

    useEffect(() => {
        const getConfig = async () => {
            const configFromServer = await fetchConfig();
            setConfig(configFromServer);
        }

        getConfig();
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        let newConfig = config;

        console.log(JSON.stringify(newConfig));

        // process evt target values to update new config.
        Object.entries(evt.target).forEach(( [index, param] ) => {
            // console.log(param.value);

            let name = param.name;
            let value = param.value;

            if ( typeof  value != "undefined" && name != "") {
                
                // console.log(name + ": " + value);

                // Get config groups
                Object.entries(newConfig).forEach(( [groupTitle, configGroup] ) => {
                    
                    // console.log("groupTitle: " + groupTitle);

                    // Search config group for key that matches
                    Object.entries(configGroup).forEach(( [paramName, paramValue] ) => {
                        // console.log("paramName: " + paramName + " == name: " + name);
                        if ( paramName == name ) {

                            if ( typeof paramValue == "boolean") {
                                value = param.value === 'true';
                            }

                            console.log("Attemping to set paramValue to: " + value);
                            // console.log(typeof value );
                            newConfig[groupTitle][paramName] = value;
                        }
                    })
                })
            }
        });

        // console.log(JSON.stringify(newConfig));
        updateConfig(newConfig);
        history.push('/');
    }

    return (
        <>
            <h2>
                <Link to="/" className="unfocused">Containers</Link>
                <Link to="/images" className="unfocused">Images</Link>
                <Link to="/repo" className="unfocused">Repo</Link>
                <span className="subpage-header">Config</span>
            </h2>
            <h3 className="topbar">
                {/* <Button text="save" onClick={handleSubmit}/> */}
            </h3>
            <Form onSubmit={handleSubmit}>
                <Button variant="primary" color="dodgerblue" name="submit" type="submit" text="save" />   
                { typeof config == "undefined" ?
                    <div className='container'>ERROR: config file not found.</div>
                    : 
                    Object.entries(config).map(( [groupTitle, configGroup] ) => (
                        <ConfigGroup setConfig={setConfig} groupTitle={groupTitle} configGroup={configGroup} />
                    ))
                }
            </Form>
        </>
    )
}

export default DisplayConfig;
