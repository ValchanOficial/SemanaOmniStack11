const app = require('./config/custom-express');
const config = require('./config/config');
const port = config.PORT;

app.listen(port, () => {
    console.log("Start: ADDRESS: " + config.getAddress() +" - PORT: "+ port);
});