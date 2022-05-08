//npm module imports
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//custom module imports
import db from './config/db';
//routes imports
import user from './api/user'


db()
app.use(bodyParser.json({extended:false}));
try {
    app.listen(process.env.server_port, () => {
        console.log(`Server started successfully; Listening on port ${process.env.server_port}`);
    });
}
catch (err) {
    console.error('Failed to start the server');
    console.log(err);
}

app.use('/api/user', user);