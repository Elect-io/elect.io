import * as mongoose from 'mongoose';

const partySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    symbol:{
        type: String,
        required: true
    },
    commonName:{
        type: String,
        required: true
    },
    color:{
        type: String
    },
    moreDetails:{
        type: String,
        required: true
    }
});

export default mongoose.model('party', partySchema)