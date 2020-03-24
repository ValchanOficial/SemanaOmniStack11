const mongoose = require('mongoose');
const url = 'mongodb+srv://root:root@cluster0-mmf48.gcp.mongodb.net/db?retryWrites=true&w=majority';

class Database {
    static connect() {
        mongoose.connect(url, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        let conn = mongoose.connection;
        conn.on('error', (error) =>{
            console.log('Could not connect to the database!', error.message);
            process.exit();
        });
        conn.once('open', () => {
            console.log(`Database has been connected successfully`);
        });
    }
}

module.exports = Database;