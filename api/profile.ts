const router = require('express').Router();
const validator = require('oversimplified-express-validator');

const simpleAvatarGenerator = require('simple-avatar-generator');

import auth from '../middlewares/auth'
import Profile from '../models/profile';
import User from '../models/user';
import Upload from '../functions/uploadToCloudinary';
import listOfGenderIdentities from '../util/listOfGenderIdentities';
import listOfReligions from '../util/listOfReligions';
import listOfSexualities from '../util/listOfSexualities';
import listOfRaces from '../util/listOfRaces';
import listOfAmericanStates from '../util/listOfAmericanStates';
import listOfCountries from '../util/listOfCountries';
import listOfGenders from '../util/listOfGenders';

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
router.get('/:id', async (req, res) => {
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

router.get('/search/:text/:skip', async (req, res) => {
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

router.put('/name', [auth, validator([{ name: "name" }])], async (req, res) => {
    try {

        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        let name = req.body.name;
        if (name.length === 0) {
            name = "Anonymous";
        }
        profile.name = name;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});

router.put('/gender-identity', [auth, validator([{ name: "genderIdentity" }])], async (req, res) => {
    try {
        if (!listOfGenderIdentities.includes(req.body.genderIdentity)) {
            return res.status(400).json({ error: "This input has not yet been added to our database" })
        }
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        profile.genderIdentity = req.body.genderIdentity;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
router.put('/religion', [auth, validator([{ name: "religion" }])], async (req, res) => {
    try {
        if (!listOfReligions.includes(req.body.religion)) {
            return res.status(400).json({ error: "This input has not yet been added to our database" })
        }
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        profile.religion = req.body.religion;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
router.put('/sexual-orientation', [auth, validator([{ name: "sexualOrientation" }])], async (req, res) => {
    try {
        if (!listOfSexualities.includes(req.body.sexualOrientation)) {
            return res.status(400).json({ error: "This input has not yet been added to our database" })
        }
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        profile.sexualOrientation = req.body.sexualOrientation;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});

router.put('/race', [auth, validator([{ name: "race" }])], async (req, res) => {
    try {
        if (!listOfRaces.includes(req.body.race)) {
            return res.status(400).json({ error: "This input has not yet been added to our database" })
        }
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        profile.race = req.body.race;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
router.put('/state', [auth, validator([{ name: "state" }])], async (req, res) => {
    try {
        if (!listOfAmericanStates.includes(req.body.state)) {
            return res.status(400).json({ error: "This input has not yet been added to our database" })
        }
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        profile.state = req.body.state;
        if (profile.country !== "The United States Of America") {
            return res.status(400).json({ error: "Currently, you can only add your state info if you're in the United States of America" })
        }
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});

router.put('/country', [auth, validator([{ name: "country" }])], async (req, res) => {
    try {
        if (!listOfCountries.includes(req.body.country)) {
            return res.status(400).json({ error: "This input has not yet been added to our database" })
        }
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        profile.country = req.body.country;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});

router.put('/gender', [auth, validator([{ name: "gender" }])], async (req, res) => {
    try {
        if (!listOfGenders.includes(req.body.gender)) {
            return res.status(400).json({ error: "This input has not yet been added to our database" })
        }
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        profile.gender = req.body.gender;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
router.put('/picture', [auth, validator([{ name: "picture" }])], async (req, res) => {
    try {
        
        const user = await User.findById(req.user).select('-password');
        const profile = await Profile.findOne({ user: user._id })
        let picture = req.body.picture;
        if (picture.length === 0) {
            picture = await simpleAvatarGenerator(profile.name);
        }
        else{ 
            picture = await Upload(picture);
        }
        profile.picture = req.body.picture;
        await profile.save();
        return res.json({ msg: "successfully updated" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});

export default router;