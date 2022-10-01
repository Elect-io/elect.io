import User from '../models/user';
import Elections from '../models/elections'
import GeneralQuestions from '../models/generalQuestions';
import Party from '../models/party';
import Answers from '../models/answers'
import politicianAnswers from '../models/politicianAnswers';
import politicians from '../models/politicians';
import Social from '../models/social';
import auth from '../middlewares/auth';
import Profile from '../models/profile';
import { profile } from 'console';

const validator = require('oversimplified-express-validator');

const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.admin !== 3) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        return res.json({
            msg: "Reset Route"
        })
    }
    catch (err) {
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})

router.post('/reset/soft', validator([{ name: 'code' }]), auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.admin !== 3) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (req.body.code !== process.env.RESET_CODE_SOFT) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await Answers.remove();
        await politicianAnswers.remove();
        let profiles = await Profile.find();
        let Politicians = await politicians.find();
        for (let i = 0; i < profiles.length; i++) {
            profile[i].xCoefficient = 0;
            profile[i].yCoefficient = 0;
            await profiles[i].save()
        }
        for (let i = 0; i < Politicians.length; i++) {
            Politicians[i].xCoefficient = 0;
            Politicians[i].yCoefficient = 0;
            await profiles[i].save()
        }
        return res.json({
            msg: "Reset Completed"
        })
    }
    catch (err) {
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
router.post('/reset/hard', validator([{ name: 'code' }]), auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.admin !== 3) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        if (req.body.code !== process.env.RESET_CODE_HARD) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        await politicians.remove();
        await Party.remove();
        await GeneralQuestions.remove();
        await Answers.remove();
        await politicianAnswers.remove();
        await Elections.remove();
        await Social.remove();

        let users = await User.find({ _id: { $not: user._id } });
        let profile = await Profile.findOne({ _id: user._id });
        profile.xCoefficient = 0;
        profile.yCoefficient = 0;
        let profiles = await Profile.find({ user: { $not: user._id } });
        for (let i = 0; i < users.length; i++) {
            await users[i].delete();
        }
        for (let i = 0; i < profiles.length; i++) {
            await profiles[i].delete();
        }

        await profile.save();
        return res.json({
            msg: "Reset Completed"
        })
    }
    catch (err) {
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
export default router;