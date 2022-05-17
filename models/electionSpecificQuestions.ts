import * as mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    election: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "election"
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: String,
        required: true
    },
    editors: {
        type: [mongoose.Types.ObjectId],
        ref: 'user',
        required: true
    }
});

export default mongoose.model('electionSpecificQuestion', questionSchema);