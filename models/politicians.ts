import * as mongoose from 'mongoose';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';
import listOfGenderIdentities from '../util/listOfGenderIdentities';
import listOfReligions from '../util/listOfReligions';
import listOfGenders from '../util/listOfGenders';
import listOfSexualities from '../util/listOfSexualities';
import listOfRaces from '../util/listOfRaces';
const politicians = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    dateOfBirth:{
        type:Date,
        required: true
    },
    country: {
        type: String,
        required: true,
        enums: listOfCountries
    },
    state: {
        type: String,
        required: true,
        enums: listOfAmericanStates
    },
    race: {
        type: String,
        required: true,
        enums: listOfRaces
    },
    sexualOrientation: {
        type: String,
        required: true,
        enums: listOfSexualities
    },
    gender: {
        type: String,
        required: true,
        enums: listOfGenders
    },
    religion: {
        type: String,
        required: true,
        enums: listOfReligions
    },
    genderIdentity: {
        type: String,
        required: true,
        enums: listOfGenderIdentities
    },
    partyAffiliation: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref:'party'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required: true
    },
    editors: {
       type: [mongoose.Types.ObjectId],
       ref:'user',
       required: true 
    }
})

politicians.index({ '$**': "text" });
export default mongoose.model('politicians', politicians);

