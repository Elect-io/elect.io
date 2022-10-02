const router = require('express').Router();
const validator = require('oversimplified-express-validator');

import Question from '../models/generalQuestions';
import Politician from '../models/politicians'
import User from '../models/user';
import Answer from '../models/politicianAnswers';
import auth from '../middlewares/auth';

router.get('/:politician', async (req, res) => {
    try {
        const politician = await Politician.findById(req.params.politician);
        if (!politician) {
            return res.status(404).json({ error: "Not Found" })
        }
        const answers = await Answer.find({ politician: politician._id });
        return res.json({ answers });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})
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
        console.log(req.params.id)
        let { source } = req.body;
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
        if (!question) {
            return res.status(400).json({ error: "invalid response" })
        }
        const exists = await Answer.findOne({ question: question._id, politician: politician._id });
        switch (answer) {
            case 0:
                politician.yCoefficient += 2 * question.yCoefficient;
                politician.xCoefficient += 2 * question.xCoefficient;
                break;
            case 1:
                politician.yCoefficient += question.yCoefficient;
                politician.xCoefficient += question.xCoefficient;
                break;
            case 3:
                politician.yCoefficient -= question.yCoefficient;
                politician.xCoefficient -= question.xCoefficient;
                break;
            case 4:
                politician.yCoefficient -= 2 * question.yCoefficient;
                politician.xCoefficient -= 2 * question.xCoefficient;
                break;
        }
        if (exists) {
            if (user.admin < 2 && politician.user !== user._id) {
                return res.status(401).json({ error: "You need to be at least an admin to access this route" })
            }
            switch (exists.answer) {
                case 0:
                    politician.yCoefficient -= 2 * question.yCoefficient;
                    politician.xCoefficient -= 2 * question.xCoefficient;
                    break;
                case 1:
                    politician.yCoefficient -= question.yCoefficient;
                    politician.xCoefficient -= question.xCoefficient;
                    break;
                case 3:
                    politician.yCoefficient += question.yCoefficient;
                    politician.xCoefficient += question.xCoefficient;
                    break;
                case 4:
                    politician.yCoefficient += 2 * question.yCoefficient;
                    politician.xCoefficient += 2 * question.xCoefficient;
                    break;
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
                source: [source, user._id],
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