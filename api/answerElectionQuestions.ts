const router = require('express').Router();
const validator = require('oversimplified-express-validator');

import Question from '../models/electionSpecificQuestions';
import Answer from '../models/answers';
import User from '../models/user';
import auth from '../middlewares/auth';


export default router;