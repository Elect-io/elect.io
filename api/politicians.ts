const router = require('express').Router();
const validator = require('oversimplified-express-validator');
const simpleAvatarGenerator = require('simple-avatar-generator');

import Politician from '../models/politicians';
import auth from '../middlewares/auth';
import User from '../models/user';
import Party from '../models/party';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';

import imageUploader from '../functions/uploadToCloudinary';



export default router;