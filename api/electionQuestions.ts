const router = require('express').Router();
const validator = require('oversimplified-express-validator');

import Election from '../models/elections';
import Question from '../models/electionSpecificQuestions';
import User from '../models/user';
import auth from '../middlewares/auth';


router.get('/:id', auth, async (req, res) => {
    try {
        const election = await Election.findById(req.params.id);
        if (!election) {
            return res.status(404).json({ error: "Not Found" })
        }
        const questions = await Question.find({ election: election._id });
        return res.json({ questions });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.post('/:id', [auth, validator([{ name: "question" }, { name: 'hook' }])], async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const election = await Election.findById(req.params.id);
        if (user.admin === 0) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        if (!election) {
            return res.status(404).json({ error: "Not Found" })
        }
        let { question, category, hook } = req.body;
        let questionInstance = new Question({ question, hook, createdBy: user._id, election: election._id, editors: [user._id] });
        await questionInstance.save();
        return res.json({ questionInstance });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
});

router.put('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        let questionInstance = await Question.findById(req.params.id);
        if (!questionInstance) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (user.admin < 2 && questionInstance.user.toString() !== user._id.toString()) {
            return res.status(401).json({ error: "You need to be at least an admin to access this route" })
        }
        const { question, category, hook } = req.body;

        if (question) {
            questionInstance.question = question
        }
        if (hook) {
            questionInstance.hook = hook;
        }
        questionInstance.editors = [...questionInstance.editors, user._id];
        await questionInstance.save();
        return res.json({ questionInstance });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
});
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.admin < 2) {
            return res.status(401).json({ error: "You need to be at least an admin to access this route" })
        }
        let questionInstance = await Question.findById(req.params.id);
        if (!questionInstance) {
            return res.status(404).json({ error: "Not Found" })
        }
        await questionInstance.delete();
        return res.json({ msg: "Successfully deleted" });
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
