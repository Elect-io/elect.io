const { google } = require('googleapis');
const express = require('express');
const router = express.Router();
const validator = require('oversimplified-express-validator');
const bcrypt = require('bcryptjs');
const simpleAvatarGenerator = require('simple-avatar-generator');

import imageUploader from '../functions/uploadToCloudinary';
import axios from 'axios';
import generateJWT from '../functions/generateJwt';
import auth from '../middlewares/auth';
import User from '../models/user';
import Social from '../models/social';
import Profile from '../models/profile';

const oauth2Client = new google.auth.OAuth2(
    process.env.google_id,
    process.env.google_secret,
    `${process.env.server_url}/api/socials/google-callback`
);


router.get('/google', async (req, res) => {
    try {
        let url = oauth2Client.generateAuthUrl({ scope: ['https://www.googleapis.com/auth/userinfo.email', "https://www.googleapis.com/auth/userinfo.profile"] });
        return res.json({ url });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.get('/google-callback', async (req, res) => {
    try {
        const code = req.query.code;
        const { tokens } = await oauth2Client.getToken(code)
        const googleUser = (await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`,
            {
                headers: {
                    Authorization: `Bearer ${tokens.id_token}`,
                },
            },
        )).data;
        console.log(googleUser)
        let socialExists = await Social.findOne({ email: googleUser.email, type: 'google' });
        let exist = await User.findOne({ email: googleUser.email });

        if (socialExists) {
            if (!exist) {
                return res.redirect(`${process.env.client_url}/profile/socials/google/${socialExists._id}`);
            }
            return res.redirect(`${process.env.client_url}/profile/socials/merge/${socialExists._id}`);
        }
        const socials = new Social({ name: googleUser.name, email: googleUser.email, type: "google", image: googleUser.picture });
        console.log(socials);
        if (exist) {
            if (exist.socials.google) {
                const token = await generateJWT(exist._id);
                return res.redirect(`${process.env.client_url}/profile/authenticate/${token}`);
            }
            else {
                await socials.save();
                return res.redirect(`${process.env.client_url}/profile/socials/merge/${socials._id}`);
            }
        }
        await socials.save();
        return res.redirect(`${process.env.client_url}/profile/socials/google/${socials._id}`);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.post('/merge/:id', async (req, res) => {
    try {
        let social = await Social.findById(req.params.id);
        let user = await User.findOne({ email: social.email });
        if (!social) {
            return res.status(404).json({ error: "Not Found" })
        }
        switch (social.type) {
            case "google":
                user.socials.google = true;
                user.verified = true;
                await social.delete();
                break;
            case "facebook":
                break;
        }
        user.socials['google'] = true;
        await user.save();
        let token = await generateJWT(user._id);
        return res.json({ token })
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.get('/:id', async (req, res) => {
    try {
        let social = await Social.findById(req.params.id);
        if (!social) {
            return res.status(404).json({ error: "Not Found" })
        }
        return res.json({ social });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.post('/create/:id', validator([{ name: "password", minlength: 8 }, { name: "name" }]), async (req, res) => {
    try {
        let social = await Social.findById(req.params.id);
        if (!social) {
            return res.status(404).json({ error: "Not Found" })
        }
        let exists = await User.findOne({ email: social.email });
        if (exists) {
            return res.redirect(`${process.env.client_url}/socials/merge/${social._id}`);
        }
        let salt = await bcrypt.genSalt(Number(process.env.salt_rounds));
        let password = await bcrypt.hash(req.body.password, salt);
        let user = new User({ email: social.email, password, socials: { google: true }, verified: true });
        console.log(social)
        let image;
        if (social.image) {
            image = await imageUploader(social.image);
        }
        else {
            image = await simpleAvatarGenerator(req.body.name)
        }

        console.log(image);
        await user.save();
        if (req.body.name.length > 0) {
            const profile = new Profile({ user: user._id, picture: image, name: req.body.name })
            await profile.save()
        }
        else {
            const profile = new Profile({ user: user._id, picture: image })
            await profile.save()
        }
        await social.delete();
        let token = await generateJWT(user._id);
        return res.json({ token })
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
