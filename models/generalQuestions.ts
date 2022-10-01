import * as mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    hook: {
        type: 'string',
        required:true
    },
    xCoefficient: {
        type: Number,
        //agree = +x
        //strongly agree = +2x
        //neutral = 0
        //disagree = -x
        //strongly disagree = -2x
        required: true
    },
    yCoefficient: {
        type: Number,
        //agree = +y
        //strongly agree = +2y
        //neutral = 0
        //disagree = -y
        //strongly disagree = -2y
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    category: {
        type: String,
        required: true
        // 
    },
    editors: {
        type: [mongoose.Types.ObjectId],
        ref: 'user',
        required: true
    }
});

export default mongoose.model('generalQuestion', questionSchema);