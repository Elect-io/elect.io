import * as mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enums: ["general", "election"]
    },
    election: {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "election"
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
    }
});

export default mongoose.model('question', questionSchema);