import ToggleLink from '../ToggleLink.js';

const Tabs = ({page}) => {

    return (
        <h2>
            <ToggleLink to="/" title="Containers" page={page} />
            <ToggleLink to="/images" title="Images" page={page} />
            <ToggleLink to="/" title="Repo" page="DISABLED" /> 
            <ToggleLink to="/config" title="Config" page={page} />
            <ToggleLink to="/log" title="Log" page={page} />
        </h2>
    )
}

export default Tabs;

