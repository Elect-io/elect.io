const router = require('express').Router();
var mongoose = require('mongoose');

import auth from '../middlewares/auth'
import Profile from '../models/profile';
import User from '../models/user';
import Elections from '../models/elections';
import PoliticianAnswer from '../models/politicianAnswers';
import Politician from '../models/politicians';
import Parties from '../models/party';

router.get('/stats', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user);
        if (admin.admin < 1) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" });
        }
        const profiles = await Profile.countDocuments({})
        const admins = await User.find({
            admin: {
                $gte: 1
            }
        });
        const moderatorProfiles: Array<any> = [];
        let i = 0;
        while (admins[i]) {
            let { name, picture, createdAt } = (await Profile.findOne({ user: admins[i]._id }).select(['name', 'picture', 'createdAt']) as any);

            moderatorProfiles.push({ name, picture, createdAt, admin: admins[i].admin, user: admins[i]._id });
            i++;
        }
        const createdElections = await Elections.find({ createdBy: admin._id });
        const createdPoliticians = await Politician.find({ createdBy: admin._id });
        const createdPoliticianAnswers = await PoliticianAnswer.find({ createdBy: admin._id });
        const createdPoliticalParties = await Parties.find({ createdBy: admin._id });
        const totalContributions = await Elections.countDocuments({
            editors: {
                $in: [admin._id]
            }
        }) + await Politician.countDocuments({
            editors: {
                $in: [admin._id]
            }
        }) + await PoliticianAnswer.countDocuments({
            editors: {
                $in: [admin._id]
            }
        }) + await Parties.countDocuments({
            editors: {
                $in: [admin._id]
            }
        });
        const politicians = await Politician.find()
        const parties = await Parties.find();
        const elections = await Elections.find()
        return res.json({
            profileCount: profiles,
            mods: moderatorProfiles,
            politicians: politicians,
            elections: elections,
            totalContributions,
            createdElections, createdPoliticianAnswers, createdPoliticians, createdPoliticalParties, parties
        })
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            console.log(err)
            return res.status(404).json({ error: "Not Found" });
        }
        console.log(err)
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})
router.get('/email/:id', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user);
        if (admin.admin < 3) {
            return res.status(401).json({ error: "You need to be at least a super admin to promote people to admin" })
        }
        const user = await User.findOne({ email: req.params.id, admin: 0 }).select('-password');
        if (user) {
            const profile = await Profile.findOne({ user: user._id }).select(['name', 'picture']);
            return res.json({ user, profile })
        }
        return res.status(404).json({ error: "Not Found" });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})
router.post('/promote-to-mod/:user', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user);
        if (admin.admin < 2) {
            return res.status(401).json({ error: "You need to be at least an admin to promote people to mod" })
        }
        const user = await User.findById(req.params.user);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" })
        }
        if (user.admin > 0) {
            return res.status(401).json({ error: "The user is already a mod or higher." })
        }
        user.admin = 1;
        await user.save();
        return res.json({
            msg: "The user has successfully have been promoted to mod"
        })
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
router.post('/promote-to-admin/:user', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user);
        if (admin.admin < 3) {
            return res.status(401).json({ error: "You need to be at least a super admin to promote people to admin" })
        }
        const user = await User.findById(req.params.user);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" })
        }
        if (user.admin > 1) {
            return res.status(401).json({ error: "The user is already a admin or higher." })
        }
        user.admin = 2;
        await user.save();
        return res.json({
            msg: "The user has successfully have been promoted to admin"
        })
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
});
router.put('/demote/:user', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user);
        const user = await User.findById(req.params.user);
        console.log(req.params.user);
        if (!user) {
            return res.status(404).json({ error: "User Not Found" })
        }
        if (admin.admin <= user.admin) {
            return res.status(401).json({ error: "You need to have a higher admin level than the demoting member to demote people" })
        }
        if (user.admin === 0) {
            return res.status(401).json({ error: "The user is not a mod." })
        }
        user.admin -= 1;
        await user.save();
        return res.json({
            msg: "The user has successfully have been demoted"
        })
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})

export default router;
