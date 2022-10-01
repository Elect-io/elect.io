const router = require('express').Router();
const validator = require('oversimplified-express-validator');

import Question from '../models/generalQuestions';
import User from '../models/user';
import auth from '../middlewares/auth';
import Answers from '../models/answers';

router.get('/', auth, async (req, res) => {
    try {
        const questions = await Question.find();
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

router.post('/', [auth, validator([{ name: "question" }, { name: "category" }, {name:'hook'}])], async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.admin < 2) {
            return res.status(401).json({ error: "You need to be at least an admin to access this route" })
        }
        let { question, category, xCoefficient, yCoefficient, hook } = req.body;
        if (!xCoefficient) {
            xCoefficient = 0;
        }
        if (!yCoefficient) {
            yCoefficient = 0;
        }
        let questionInstance = new Question({ question, category, hook, xCoefficient: Number(xCoefficient), yCoefficient: Number(yCoefficient), createdBy: user._id, editors: [user._id] });
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
        if (user.admin < 2) {
            return res.status(401).json({ error: "You need to be at least an admin to access this route" })
        }
        const { question, category, xCoefficient, yCoefficient, hook } = req.body;
        let questionInstance = await Question.findById(req.params.id);
        if (!questionInstance) {
            return res.status(404).json({ error: "Not Found" })
        }
        if (question) {
            questionInstance.question = question
        }
        if (category) {
            questionInstance.category = category
        }
        if (xCoefficient) {
            questionInstance.xCoefficient = Number(xCoefficient)
        }
        if (yCoefficient) {
            questionInstance.yCoefficient = Number(yCoefficient);
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
        let answers = await Answers.find({
            question: questionInstance._id
        });
        for(let i = 0; i < answers.length; i++) {
            await answers[i].delete();
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
