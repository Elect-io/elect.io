const router = require('express').Router();
const validator = require('oversimplified-express-validator');

import Question from '../models/electionSpecificQuestions';
import Answer from '../models/answers';
import Politician from '../models/politicians'
import User from '../models/user';

import Election from '../models/elections';
import auth from '../middlewares/auth';



router.get('/election/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        
        const election = await Election.findById(req.params.id);
        const questions = await Question.find({ election: election._id });
     
        let answers:any = [];
        for (let i = 0; i < questions.length; i++) {
            const answer = await Answer.findOne({ question: questions[i]._id, user:user._id});
            answers = [...answers, answer];
        }
        if (!election) {
            return res.status(404).json({ error: "Not Found"});
        };
        return res.json({ answers, election, questions  });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const question = await Question.findById(req.params.id);
        const answer = await Answer.findOne({ question: question._id, user: user._id});
        return res.json({ answer });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})
router.post('/:id/:answer', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const answer = Number(req.params.answer);
        if (![0, 1, 2, 3, 4].includes(answer)) {
            return res.status(400).json({ error: "invalid response" })
        }
        const question = await Question.findById(req.params.id);
        const exists = await Answer.findOne({ question: question._id, user:user._id });
        if (exists) {
            exists.answer = answer;
            await exists.save();
            return res.json({ answer: exists });
        }
        else {
            const newAnswer = new Answer({
                question: question._id,
                user: user._id,
                answer,
                effect:{
                    yCoefficient: 0,
                    xCoefficient: 0
                }
            });
            await newAnswer.save();
            return res.json({ answer: newAnswer });
        }
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})



export default router;