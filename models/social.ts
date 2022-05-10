import * as mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: {
        type: String,
        default: "Anonymous"
    },
    type:{
        type: String,
        enums: ["twitter", "google"],
        required: true
    },
    image:{
        type:String
    },
    credential: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    email: {
        type: String,
    }
})

export default mongoose.model('social', user);

