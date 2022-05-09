const express = require('express')
const router = express.Router()
const validator = require('oversimplified-express-validator')
const bcrypt = require('bcryptjs');
const {google} = require('googleapis');

import auth from '../middlewares/auth';
import User from '../models/user'
import generateJWT from '../functions/generateJwt';


router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user).select('-password');
        return res.json(user)
    }
    catch (err) {

    }
})
router.post('/create-account',
    validator([{ name: 'email', email: true }, { name: 'password', minlength: 8 }, { name: "name" }]),
    async (req, res) => {
        try {
            const exists = await User.findOne({ email: req.body.email });
            if (exists) {
                return res.status(422).json({ error: `A user already exists with the email address ${req.body.email}` });
            }
            const { name, email, password } = req.body;
            let salt = await bcrypt.genSalt(Number(process.env.salt_rounds))
            let Password = await bcrypt.hash(password, salt)
            const user = new User({
                name,
                email,
                password: Password
            });
            await user.save();
            const token = await generateJWT(user._id)
            return res.json({ token });

        }
        catch (err) {
            console.log(err);
        }
    })
router.post('/sign-in',
    validator([{ name: 'email', email: true }, { name: 'password', minlength: 8 }]), async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json({ error: `Can't sign in: invalid credentials` });
            }
            let comparison = await bcrypt.compare(req.body.password, user.password)
            if (!comparison) {
                return res.status(401).json({ error: `Can't sign in: invalid credentials` });
            }
            const token = await generateJWT(user._id);
            console.log(token)
            return res.json({ token })
        }
        catch (err) { }
    })

router.delete('/', [auth, validator([{name:"password", minlength: 8}])], async (req, res)=>{
    try{
        const user = await User.findById(req.user);
        let comparison = await bcrypt.compare(req.body.password, user.password)
        if (!comparison) {
            return res.status(401).json({ error: `Can't delete account: invalid credentials` });
        }
        await user.delete();
        return res.json({ msg:"Account deleted successfully!"})
    }
    catch (err){

    }
})


export default router;