const fs = require('fs');

// Config object file.
class Config {

    /**
     * Config class constructor.
     * 
     * Config parameters can be accessed by:
     * 
     * let config = new Config();
     * let parameter = config.{parameterGroup}.{parameter};
     */
    constructor() {
        
        // File name and path of config file from the root
        this.configFileName = 'config.json';

        this.sync();
    }

    /**
     * Sync the Config class with the config.json file.  Reads config.json
     * and maps the config groups to the class.
     */
    sync() {

        let config = this.read();

        // Sync config object to class
        Object.entries(config).forEach(configGroup  => {
            const configGroupName = configGroup[0];
            this[configGroupName] = configGroup[1];
        });
    }

    /**
     * Read config.json file to Config class.  If config.json file not found,
     * copies config.json.default to config.json synchronously and reads again.
     * 
     * @returns config
     */
    read() {
        let config = null;

        try {
            config = JSON.parse(fs.readFileSync(this.configFileName));

        } catch (err) {
            console.log(`Generating clean config.js...`);

            try {

                fs.copyFileSync('config.json.default', 'config.json');
                console.log('config.json.default was copied to config.json');
                config = JSON.parse(fs.readFileSync(this.configFileName));
            } catch (copyErr) {
                if (copyErr) throw copyErr;
            }
        }

        return config;
    }

    /**
     * Write updated config.json file.
     * 
     * @param {Object} updatedConfig 
     */
    write(updatedConfig) {

        fs.writeFileSync(this.configFileName, updatedConfig, (err) => {
            if (err) {
                throw err;
            }
            console.log("Saving to config.json: " + updatedConfig);
        });

        this.sync();
    }

}

module.exports = Config;