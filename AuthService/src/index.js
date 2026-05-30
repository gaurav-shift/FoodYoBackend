const express = require('express');
const app = express();

const { PORT } = require('./config/serverConfig');

const setupAndStartServer = () => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

setupAndStartServer();