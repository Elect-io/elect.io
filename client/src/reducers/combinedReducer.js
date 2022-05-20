import alerts from './alerts';
import answers from './answers';
import auth from './auth';
import poll from './generalPoll';
import election from './election';
import questions from './questions';
import profile from './profile';
import candidates from './candidates';

import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({alerts, answers, auth, poll, election, questions, profile, candidates});