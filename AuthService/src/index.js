const express = require('express');
const app = express();

const { PORT } = require('./config/serverConfig');
const  connect  = require('./config/database');

const setupAndStartServer = async () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    try{
    await connect();
    console.log('Connected to MongoDB');

    app.listen(PORT, async () => {
        console.log(`Server started on port ${PORT}`);
        
    });
    }catch(err){
        console.log('Error connecting to MongoDB', err);
        process.exit(1); //terminate the process synchronously with an exit code of 1, indicating that an error occurred
    }
};

setupAndStartServer();