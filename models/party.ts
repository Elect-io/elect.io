import * as mongoose from 'mongoose';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';
const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    editors: {
        type: [mongoose.Types.ObjectId],
        ref: 'user',
        required: true

    },
    symbol: {
        type: String,
        required: true
    },
    country: {
        type: String,
        enums: listOfCountries,
        required: true
    },
    commonName: {
        type: String,
        required: true
    },
    color: {
        type: String
    },
    moreDetails: {
        type: String,
        required: true
    }
});
partySchema.index({ '$**': "text" });
export default mongoose.model('party', partySchema)