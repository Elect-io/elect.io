const router = require('express').Router();

import auth from '../middlewares/auth'
import Profile from '../models/profile';
import User from '../models/user';

router.post('/promote-to-mod/:id', auth, async (req, res) => {
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
router.post('/promote-to-admin/:id', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user);
        if (admin.admin < 3) {
            return res.status(401).json({ error: "You need to be at least an admin to promote people to mod" })
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
router.put('/demote/:id', auth, async (req, res) => {
    try {
        const admin = await User.findById(req.user);
        const user = await User.findById(req.params.user);

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
