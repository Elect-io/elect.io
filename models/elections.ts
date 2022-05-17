import * as mongoose from 'mongoose';

import listOfCountries from '../util/listOfCountries';
import listOfStates from '../util/listOfAmericanStates';
const electionSchema = new mongoose.Schema({
    politicians: {
        type: [mongoose.Types.ObjectId],
        ref:"politician"
    },
    editors: {
        type: [mongoose.Types.ObjectId],
        required: true,
        ref: 'user'
    },
    date: {
        type: Date,
        required: true
    },
    additionalDetails: {
        type: String,
    },
    type: {
        type: String,
        enums: ["Federal", "State", "Municipal", "Primaries-Federal", "Primaries-State", "Primaries-Municipal"],
        required: true
    },
    for: {
        type: String,
        required: true
    },
    location: {
        required: true,
        type: {
            country: {
                required: true,
                type: String,
                enums: listOfCountries
            },
            state: {
                type: String,
                enums: listOfStates
            },
            district: {
                type: String
            },
            county: {
                type: String
            },
            city: {
                type: String
            }
        }
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "user"
    }
});

electionSchema.index({ '$**': "text" });
export default mongoose.model('election', electionSchema);