class Config {
    static PORT = 3333;
    static getAddress() {
        const os = require('os');
        const values = Object.values(os.networkInterfaces()).map(el => el);
        const addresses = values.concat.apply([], values);
        const {address} = addresses.find(el => {
            return el.address.startsWith('192.168')
        });
        return address !== undefined ? address : 'localhost';
    }
}

module.exports = Config;