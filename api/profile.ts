const router = require('express').Router();
const validator = require('oversimplified-express-validator');

const simpleAvatarGenerator = require('simple-avatar-generator');

import auth from '../middlewares/auth'
import Profile from '../models/profile';
import User from '../models/user';
import Upload from '../functions/uploadToCloudinary';

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        return res.json(profile);
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });

    }
})
router.get('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        return res.json({ name: user.name, ...profile });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})

router.get('/search/:text/:skip', auth, async (req, res) => {
    try {
        const profiles = await Profile.find({
            $text: {
                $search: req.params.text
            }
        }).skip(Number(req.params.skip)).limit(10);
        return res.json(profiles);
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})

export default router;