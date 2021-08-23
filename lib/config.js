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
    async sync() {

        let config = await this.read();

        Object.entries(config).forEach(configGroup  => {
            const configGroupName = configGroup[0];
            this[configGroupName] = configGroup[1];
        });
    }

    // Read config file from server
    // Private, use sync to 
    async read() {
        let config = null;

        try {
            config = JSON.parse(fs.readFileSync(this.configFileName));

        } catch (err) {
            console.log(`Generating clean config.js...`);
            fs.copyFile('config.json.default', 'config.json', (err) => {
                if (err) throw err;
                console.log('config.json.default was copied to config.json');
              }).then(() => {
                this.sync();
              });   
        }

        return config;
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