import * as mongoose from 'mongoose';

const answerSchema = new mongoose.Schema({
    question: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    answer:{
        type:Number,
        required: true,
        enums:[0,1,2,3,4]
        /*
        0: strongly agree
        1: agree
        2: neutral
        3: disagree
        4:strongly disagree
        */
    },
    user: {
        type: mongoose.Types.ObjectId,
        required:true,
        ref:"user"
    }
});

export default mongoose.model('answer', answerSchema);