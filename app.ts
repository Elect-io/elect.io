//npm module imports
require('dotenv').config();
const express = require('express');
const app = express();

//custom module imports
import db from './config/db';
//routes imports
db()

try {
    app.listen(process.env.server_port, () => {
        console.log(`Server started successfully; Listening on port ${process.env.server_port}`);
    });
}
catch (err) {
    console.error('Failed to start the server');
    console.log(err);
}
