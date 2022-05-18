const router = require('express').Router();
const validator = require('oversimplified-express-validator');

import Election from '../models/elections';
import Question from '../models/electionSpecificQuestions';
import Politician from '../models/politicians'
import User from '../models/user';
import Answer from '../models/politicianAnswers';
import auth from '../middlewares/auth';

router.get('/:politician/:id', async (req, res) => {
    try {
        const politician = await Politician.findById(req.params.politician);
        if (!politician) {
            return res.status(404).json({ error: "Not Found" })
        }
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ error: "Not Found" })
        }
        const answer = await Answer.findOne({ question: question._id, politician: politician._id });
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
router.post('/:id/:politician/:answer', [auth, validator([{ name: "source" }])], async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const answer = Number(req.params.answer);
        let {source} = req.body;
        const politician = await Politician.findById(req.params.politician);
        if (!politician) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (user.admin < 1 && politician.user !== user._id) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        if (![0, 1, 2, 3, 4].includes(answer)) {
            return res.status(400).json({ error: "invalid response" })
        }
        const question = await Question.findById(req.params.id);
        const exists = await Answer.findOne({ question: question._id, politician: politician._id });
       
        if (exists) {
            if (user.admin < 2 && politician.user !== user._id) {
                return res.status(401).json({ error: "You need to be at least an admin to access this route" })
            }
           
            exists.answer = answer;
            exists.source = [...exists.source, [source, user._id]];
            exists.editors = [...exists.editors, user._id];
            await exists.save();
            await politician.save()

            return res.json({ answer: exists });
        }
        else {
            const newAnswer = new Answer({
                question: question._id,
                createdBy: user._id,
                politician: politician._id,
                editors: [user._id],
                source:[source, user._id],
                answer
            });

            await politician.save()
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