const router = require('express').Router();
const validator = require('oversimplified-express-validator');

import Profile from '../models/profile';
import Question from '../models/generalQuestions';
import User from '../models/user';
import Answer from '../models/answers';
import auth from '../middlewares/auth';

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const questions = await Question.find();
        let answers = [];
        let solved = 0;
        for (let i = 0; i < questions.length; i++) {
            let question = questions[i];
            const answer = await Answer.findOne({ question: question._id, user: user._id });
            if (answer) {
                solved++;
                answers.push(answer);
            }
        }
        let remaining = answers.length - solved;
        return res.json({ answers, questions, remaining, solved });
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
        const answer = await Answer.findOne({ question: question._id, user: user._id });
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
        const profile = await Profile.findOne({ user: user._id })
        if (![0, 1, 2, 3, 4].includes(answer)) {
            return res.status(400).json({ error: "invalid response" })
        }
        const question = await Question.findById(req.params.id);
        const exists = await Answer.findOne({ question: question._id, user: user._id });
        let effect = {
            yCoefficient: 0,
            xCoefficient: 0
        };
        switch (answer) {
            case 0:
                profile.yCoefficient += 2 * question.yCoefficient;
                effect.yCoefficient = 2 * question.yCoefficient;
                effect.xCoefficient = 2 * question.xCoefficient;
                profile.xCoefficient += 2 * question.xCoefficient;
                break;
            case 1:
                profile.yCoefficient += question.yCoefficient;
                profile.xCoefficient += question.xCoefficient;
                effect.yCoefficient = question.yCoefficient;
                effect.xCoefficient = question.xCoefficient;
                break;
            case 3:
                profile.yCoefficient -= question.yCoefficient;
                profile.xCoefficient -= question.xCoefficient;
                effect.yCoefficient = -question.yCoefficient;
                effect.xCoefficient = -question.xCoefficient;
                break;
            case 4:
                profile.yCoefficient -= 2 * question.yCoefficient;
                profile.xCoefficient -= 2 * question.xCoefficient;
                effect.yCoefficient = -2 * question.yCoefficient;
                effect.xCoefficient = -2 * question.xCoefficient;
                break;
        }
        if (exists) {
            switch (exists.answer) {
                case 0:
                    profile.yCoefficient -= 2 * question.yCoefficient;
                    profile.xCoefficient -= 2 * question.xCoefficient;
                    effect.yCoefficient = -2 * question.yCoefficient;
                    effect.xCoefficient = -2 * question.xCoefficient;
                    break;
                case 1:
                    profile.yCoefficient -= question.yCoefficient;
                    profile.xCoefficient -= question.xCoefficient;
                    effect.yCoefficient = -question.yCoefficient;
                    effect.xCoefficient = -question.xCoefficient;
                    break;
                case 3:
                    profile.yCoefficient += question.yCoefficient;
                    profile.xCoefficient += question.xCoefficient;
                    effect.yCoefficient = question.yCoefficient;
                    effect.xCoefficient = question.xCoefficient;
                    break;
                case 4:
                    profile.yCoefficient += 2 * question.yCoefficient;
                    profile.xCoefficient += 2 * question.xCoefficient;
                    effect.yCoefficient = 2 * question.yCoefficient;
                    effect.xCoefficient = 2 * question.xCoefficient;
                    break;
            }
            exists.answer = answer;
            exists.effect = effect;

            await exists.save();

            await profile.save()
            return res.json({ answer: exists });
        }
        else {
            const newAnswer = new Answer({
                question: question._id,
                user: user._id,
                answer,
                effect
            });

            await profile.save()
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