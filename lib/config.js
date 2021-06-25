const fs = require('fs');

// Config object file.
class Config {

    constructor() {
        
        // File name and path of config file from the root
        this.configFileName = 'config.json';

        this.sync();

    }

    // Sync the config object with the file
    // Use this before accessing elements from the config
    sync() {

        let config = this.read();

        Object.entries(config).forEach(configGroup  => {
            const configGroupName = configGroup[0];
            this[configGroupName] = configGroup[1];
        });
    }

    // Read config file from server
    // Private, use sync to 
    read() {
        return JSON.parse(fs.readFileSync(this.configFileName));
    }

    // Write new config file to server
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