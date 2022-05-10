import * as mongoose from 'mongoose';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';
const profile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    country: {
        type: String,
        enums: listOfCountries
    },
    state: {
        type: String,
        enums: listOfAmericanStates
    },
    race: {
        type: String,
        enums: ["Hispanic", "White alone, non-Hispanic", "Black or African American alone, non- Hispanic", "American Indian and Alaska Native alone, non - Hispanic", "Asian alone, non - Hispanic", "Native Hawaiian and Other Pacific Islander alone, non - Hispanic", "Some Other Race alone, non - Hispanic", "Multiracial, non - Hispanic"]
    },
    sexualOrientation: {
        type: String,
        enums: ["Bisexual", "Homosexual", "Heterosexual", "Pansexual", "Asexual", "Other", "Don't Know"]
    },
    gender: {
        type: String,
        enums: ['Male', 'Female', 'Agender', 'Non Binary', "Other"]
    },
    religion: {
        type: String,
        enums: ['None', 'Christianity', "Islam", "Hinduism", "Buddhism", "Judaism", "Other"]
    },
    trans: {
        type: Boolean
    },



    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('profile', profile);

