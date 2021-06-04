import ConfigParameter from "./ConfigParameter.js"

const ConfigGroup = ({ setConfig, groupTitle, configGroup }) => {

    return (
        <div className='container'>
            <h2>{groupTitle}</h2>
            {Object.entries(configGroup).map(([param, value]) => (
                <ConfigParameter setConfig={setConfig} param={param} value={value} />
            ))}
        </div>
    )
}

export default ConfigGroup;
