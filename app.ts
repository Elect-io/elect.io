//npm module imports
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//custom module imports
import db from './config/db';
//routes imports
import user from './api/user'
import socials from './api/socials';
import profile from './api/profile';
import party from './api/party';
import mod from './api/mod';
import politicians from './api/politicians';
import election from './api/elections';
import generalQuestions from './api/generalQuestions';
import electionSpecificQuestions from './api/electionQuestions';
import answerGeneralQuestions from './api/answerGeneralQuestions';
import answerElections from './api/answerElectionQuestions';

db();
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
app.use('/api/socials', socials);
app.use('/api/profile', profile);

app.use('/api/mod', mod);

app.use('/api/party', party);
app.use('/api/politician', politicians);
app.use('/api/election', election);

app.use('/api/general-question', generalQuestions)
app.use('/api/election-specific-question', electionSpecificQuestions)

app.use('/api/answer-general-question', answerGeneralQuestions)
app.use('/api/answer-election-specific-question', answerElections);