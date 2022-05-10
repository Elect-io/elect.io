import * as mongoose from 'mongoose';

const user = new mongoose.Schema({
    name: {
        type: String,
        default: "Anonymous"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    verified: {
        type: Boolean,
        default: false
    },
    email: {
        type: String,
        required: true
    },
    socials: {
        google: {
            type: Boolean,
            default: false
        },
        twitter: {
            type: String
        }
    },
    admin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
})

export default mongoose.model('user', user);

