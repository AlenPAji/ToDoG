require('dotenv').config(); // Import and configure dotenv
const mongoose = require('mongoose');

module.exports.connect = function () {
    const atlasUrl = process.env.MONGO_URI; // Get the URI from the .env file

    if (!atlasUrl) {
        console.error("MongoDB connection string is not defined in .env file.");
        process.exit(1); // Exit if the connection string is missing
    }

    mongoose.connect(atlasUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', (err) => {
        console.error('Database connection error:', err);
    });

    db.once('open', () => {
        console.log('Database connected');
    });
};
