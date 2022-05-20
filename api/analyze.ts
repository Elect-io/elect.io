const router = require('express').Router();

import auth from '../middlewares/auth';

import Answer from '../models/answers';
import PoliticianAnswer from '../models/politicianAnswers';
import User from '../models/user';
import Question from '../models/generalQuestions';
import ElectionQuestion from '../models/electionSpecificQuestions';
import Politician from '../models/politicians';
import Election from '../models/elections';

router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const politician = await Politician.findById(req.params.id);
        if (!politician) {
            return res.status(404).json({ error: "Not Found" })
        }
        const questions = await Question.find();
        let totalQuestions = 0;
        let matchingQuestions = 0
        for (let i = 0; i < questions.length; i++) {

            const answer = await Answer.findOne({ user: user._id, question: questions[i]._id });
            console.log(answer)
            if (answer !== undefined) {
                const politicianAnswer = await PoliticianAnswer.findOne({ question: questions[i]._id, politician: politician._id });

                if (politicianAnswer !== undefined && politicianAnswer !== null) {
                    console.log(politicianAnswer)
                    if (answer.answer === politicianAnswer.answer) {
                        matchingQuestions += 1;
                    }
                    else if (answer.answer < 3 && politicianAnswer.answer < 3) {
                        matchingQuestions += .5;
                    }
                    else if (answer.answer > 3 && politicianAnswer.answer > 3) {
                        matchingQuestions += .5;
                    }
                    totalQuestions += 1
                }
            }
        }
        return res.json({ matchingQuestions: matchingQuestions, totalQuestions: totalQuestions });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.get('/:election/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const politician = await Politician.findById(req.params.id);
        if (!politician) {
            return res.status(404).json({ error: "Not Found" })
        }
        const election = await Election.findById(req.params.election);
        const questions = await ElectionQuestion.find({ election: election._id });
        let totalQuestions = 0;
        let matchingQuestions = 0
        for (let i = 0; i < questions.length; i++) {

            const answer = await Answer.findOne({ user: user._id, question: questions[i]._id });
            console.log(answer)
            if (answer !== undefined) {
                const politicianAnswer = await PoliticianAnswer.findOne({ question: questions[i]._id, politician: politician._id });

                if (politicianAnswer !== undefined && politicianAnswer !== null) {
                    console.log(politicianAnswer)
                    if (answer.answer === politicianAnswer.answer) {
                        matchingQuestions += 1;
                    }
                    else if (answer.answer < 3 && politicianAnswer.answer < 3) {
                        matchingQuestions += .5;
                    }
                    else if (answer.answer > 3 && politicianAnswer.answer > 3) {
                        matchingQuestions += .5;
                    }
                    totalQuestions += 1
                }
            }
        }
        return res.json({ matchingQuestions: matchingQuestions, totalQuestions: totalQuestions });
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

