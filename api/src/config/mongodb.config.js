const mongoose = require('mongoose');

const databaseHost = process.env.MONGO_DB_HOST || "database"
const databasePort = process.env.MONGO_DB_PORT || "27017"
const databaseName = process.env.MONGO_DB_DATABASE || "chat"

const connectDatabase = async () => {
    await mongoose.connect(`mongodb://${databaseHost}:${databasePort}/${databaseName}`).then(() => {
        console.info("Connected to database " + `mongodb://${databaseHost}:${databasePort}/${databaseName}`);
    }).catch(err => console.error);
}

module.exports = connectDatabase;
