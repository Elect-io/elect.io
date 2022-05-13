import * as mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'question'
    },
    source: {
        type: [[String, mongoose.Types.ObjectId]],
        required: true,
        ref: 'user'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    editors: {
        type: [mongoose.Types.ObjectId],
        required: true,
        ref: 'user'
    },
    politician: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "politician"
    }
});

export default mongoose.model('answer', answerSchema);