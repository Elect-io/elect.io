import * as mongoose from 'mongoose';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';
import listOfGenderIdentities from '../util/listOfGenderIdentities';
import listOfReligions from '../util/listOfReligions';
import listOfGenders from '../util/listOfGenders';
import listOfSexualities from '../util/listOfSexualities';
import listOfRaces from '../util/listOfRaces';
const profile = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true,
        default: 'Anonymous'
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
        enums: listOfRaces
    },
    sexualOrientation: {
        type: String,
        enums: listOfSexualities
    },
    gender: {
        type: String,
        enums: listOfGenders
    },
    religion: {
        type: String,
        enums: listOfReligions
    },
    genderIdentity: {
        type: String,
        enums: listOfGenderIdentities
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

profile.index({ '$**': "text" });
export default mongoose.model('profile', profile);

