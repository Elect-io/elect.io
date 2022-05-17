import * as mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"user"
    }
});

export default mongoose.model('answer', answerSchema);