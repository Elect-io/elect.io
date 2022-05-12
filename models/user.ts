import * as mongoose from 'mongoose';

const user = new mongoose.Schema({
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
        type: Number,
        default: 0,
        enums: [0, 1, 2, 3]
        // 0, normal user
        // 1, mod(can add polls, responses, politician profiles, campaigns, etc)
        // 2 admin(can delete profiles, add mods, delete and edit politician responses, delete polls, edit generalized poll, plus everything on level 1 )
        // 3, super admin(can remove and add admins, plus everything on level 2)
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    }
})

export default mongoose.model('user', user);

