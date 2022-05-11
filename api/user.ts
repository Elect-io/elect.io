const express = require('express')
const router = express.Router()
const validator = require('oversimplified-express-validator')
const bcrypt = require('bcryptjs');
import auth from '../middlewares/auth';
import User from '../models/user'
import generateJWT from '../functions/generateJwt';
import imageUploader from '../functions/uploadToCloudinary';
const simpleAvatarGenerator = require('simple-avatar-generator');
import Profile from '../models/profile';
import Verify from '../models/verify';
import mailjet from '../config/mailjet';
import { signupEmail } from '../emailTemplates/authEmails';

router.get('/', auth, async (req, res) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user).select('-password');
        return res.json(user)
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})

router.get('/verify/:id', async (req, res)=>{
    try{
        const verify = await Verify.findById(req.params.id);
        if(!verify){
            return res.status(404).json({ error: "Not Found" });  
        }
        const user = await User.findById(verify.user);
        user.verified = true;
        await user.save();
        await verify.delete();
        return res.redirect(process.env.client_url);
    }
    catch(err){
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
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

            let image;

            if (req.body.image) {
                image = await imageUploader(req.body.image);
            }
            else {
                image = await simpleAvatarGenerator(name);
            }
            const user = new User({
                email,
                password: Password
            });

            const verify = new Verify({
                user: user._id
            });
            let profile;
            if (name.length > 0) {
                profile = new Profile({ picture: image, user: user._id, name });
            }
            else {
                profile = new Profile({ picture: image, user: user._id });
            }
            const token = await generateJWT(user._id)

            const Email = mailjet.post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [{
                        "From": {
                            "Email": "shresth21oct@gmail.com",
                            "Name": `Elect io`
                        },
                        "To": [{
                            "Email": `${user.email}`,
                            "Name": `${profile.name}`
                        }],
                        "Subject": `Verify Your Elect io Account`,
                        "TextPart": "",
                        "HTMLPart": signupEmail(profile.name, verify._id)
                    }]
                });
            await Email
                .then(async a => {
                    console.log(a.response);
                    await verify         .save();
                    await profile.save();
                    await user.save();
                    return res.json({ token });
                }).catch(err => {
                    console.log(err);
                    return res.status(500).json({ error: "Our services are unavailable at this moment, please try again later!" })
                })
        }
        catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ error: "Not Found" });
            }
            console.log(err)
            return res.status(500).json({ error: "We can't process your request at this moment" });
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
        catch (err) {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ error: "Not Found" });
            }
            return res.status(500).json({ error: "We can't process your request at this moment" });
        }
    })
router.put('/password', [auth, validator([{ name: "password", minlength: 8 }])], async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const salt = await bcrypt.genSalt(Number(process.env.salt_rounds))
        const password = await bcrypt.hash(req.body.password, salt)
        user.password = password;
        await user.save();
        return res.json({ msg: "Password updated successfully!" })
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})
router.delete('/', [auth, validator([{ name: "password", minlength: 8 }])], async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const verify = await Verify.findOne({ user: user._id });
        const profile = await Profile.findOne({ user: user._id });
        let comparison = await bcrypt.compare(req.body.password, user.password)
        if (!comparison) {
            return res.status(401).json({ error: `Can't delete account: invalid credentials` });
        }

        if (verify) {
            await verify.delete();
        }
        await profile.delete();
        await user.delete();
        return res.json({ msg: "Account deleted successfully!" })
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" });
        }
        return res.status(500).json({ error: "We can't process your request at this moment" });
    }
})




export default router;