import ConfigParameter from "./ConfigParameter.js"

const ConfigGroup = ({ groupTitle, configGroup }) => {

    return (
        <div className='container'>
            <h3>{groupTitle}</h3>
            {Object.entries(configGroup).map(([param, value]) => (
                <ConfigParameter param={param} value={value} />
            ))}
        </div>
    )
}

export default ConfigGroup;
