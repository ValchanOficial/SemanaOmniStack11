const app = require('./src/config/custom-express');
const config = require('./src/config/config');
const port = config.PORT;

app.listen(port, () => {
    console.log("Start: ADDRESS: " + config.getAddress() +" - PORT: "+ port);
});