const router = require('express').Router();
const validator = require('oversimplified-express-validator');
const simpleAvatarGenerator = require('simple-avatar-generator');

import auth from '../middlewares/auth';
import User from '../models/user';
import Party from '../models/party';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';

import imageUploader from '../functions/uploadToCloudinary';



router.get('/:country/:skip', async (req, res) => {
    try {
        //get all political parties from a certain region
        if (!listOfCountries.includes(req.params.country)) {
            return res.status(404).json({ error: "Not Found" })
        }
        const parties = await Party.find({
            country: req.params.country
        }).skip(Number(req.params.skip)).limit(10);
        return res.json({ parties });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const party = await Party.findById(req.params.id);
        return res.json({ party });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})
router.get('/search/:country/:name', async (req, res) => {
    try {
        console.log(req.params.country)
        //search all political parties from a certain region
        if (req.params.country !== "all") {
            const party = await Party.find({
                country: req.params.country, $text: {
                    $search: req.params.name
                }
            });
            return res.json({ party });
        }
        else {
            console.log("all")
            const party = await Party.find({
                $text: {
                    $search: req.params.name
                }
            });
            return res.json({ party });
        }
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.post('/', [auth, validator([{ name: "name" }, { name: "country" }, { name: "commonName" }, { name: "color" }, { name: "moreDetails" }])], async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.admin === 0) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        let { country, name, symbol, moreDetails, color, commonName } = req.body;
        if (!listOfCountries.includes(country)) {
            return res.status(400).json({ error: "Unable to process request: mentioned country is not included in database" });
        }
        if (symbol) {
            symbol = await imageUploader(symbol);
        }
        else {
            symbol = await simpleAvatarGenerator(name);
        }
        const party = new Party({ country, name, symbol, moreDetails, color, commonName, createdBy: user._id, editors: [user._id] });
        await party.save();
        return res.json({ party });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        let party = await Party.findById(req.params.id);
        if (user.admin < 2 && party.createdBy.toString() !== user._id.toString()) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        let { country, name, symbol, moreDetails, color, commonName } = req.body;

        if (symbol) {
            symbol = await imageUploader(symbol);
            party.symbol = symbol;
        }
        if (country) {
            if (!listOfCountries.includes(country)) {
                return res.status(400).json({ error: "Unable to process request: mentioned country not included in database" });
            }
            party.country = country;
        }
        if (name) {
            party.name = name;
        }
        if (moreDetails) {
            party.moreDetails = moreDetails;
        }
        if (color) {
            party.color = color;
        }
        if (commonName) {
            party.commonName = commonName;
        }
        party.editors = [...party.editors, user._id];
        await party.save();
        return res.json({ party });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        let party = await Party.findById(req.params.id);
        if (user.admin < 2) {
            return res.status(401).json({ error: "You need to be at least an admin to access this route" })
        }
        if (!party) {

            return res.status(404).json({ error: "Not Found" })
        }
        await party.delete();
        return res.json({ msg: "successfully deleted" });
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