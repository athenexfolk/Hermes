const mongoose = require('mongoose');

const databaseHost = process.env.MONGO_DB_HOST || "database"
const databasePort = process.env.MONGO_DB_PORT || "27017"
const databaseName = process.env.MONGO_DB_DATABASE || "chat"

const connectDatabase = async () => {
    console.log(`DATABASE : mongodb://${databaseHost}:${databasePort}/${databaseName}`);
    await mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`).then(() => {
        console.log("Connect to database seccess");
    }).catch(console.error);
}

module.exports = connectDatabase;
