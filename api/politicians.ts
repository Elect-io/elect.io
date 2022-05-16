const router = require('express').Router();
const validator = require('oversimplified-express-validator');
const simpleAvatarGenerator = require('simple-avatar-generator');

import Politician from '../models/politicians';
import auth from '../middlewares/auth';
import User from '../models/user';
import Party from '../models/party';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';
import imageUploader from '../functions/uploadToCloudinary';
import listOfGenders from '../util/listOfGenders';
import listOfSexualities from '../util/listOfSexualities';
import listOfRaces from '../util/listOfRaces';
import listOfGenderIdentities from '../util/listOfGenderIdentities';
import politicians from '../models/politicians';

//get a politician's info by id
router.get('/:id', async (req, res) => {
    try {
        const politician = await Politician.findById(req.params.id);
        return res.json({ politician });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})
//get a politicians' info by political party

router.get('/party/:id/:skip', async (req, res) => {
    try {
        const party = await Party.findById(req.params.id);
        if (!party) {
            return res.status(404).json({ error: "Not Found" })
        }
        const politicians = await Politician.find({ partyAffiliation: party._id }).skip(Number(req.params.skip));
        return res.json({ politicians });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

//create a politician's profile

router.post('/', validator([{ name: 'name' }, { name: "country" }, { name: "state" }, { name: "race" }, { name: "sexualOrientation" }, { name: "gender" }, { name: "genderIdentity" }, { name: 'dateOfBirth' }]), async (req, res) => {
    try {
        let { name, gender, genderIdentity, partyAffiliation, sexualOrientation, country, dateOfBirth, state, race, picture } = req.body;
        const user = await User.findById(req.user);
        if (user.admin === 0) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        if (country && !listOfCountries.includes(country)) {
            return res.status(400).json({ error: "This country input has not yet been added to our database" })
        }
        if (state && !listOfAmericanStates.includes(state)) {
            return res.status(400).json({ error: "This state input has not yet been added to our database" })
        }
        if (partyAffiliation) {
            let party = await Party.findById(partyAffiliation);
            if (!party) {
                return res.status(404).json({ error: "Not Found" })
            }
            partyAffiliation = party._id;
        }
        if (gender && !listOfGenders.includes(gender)) {
            return res.status(400).json({ error: "This gender input has not yet been added to our database" })
        }
        if (sexualOrientation && !listOfSexualities.includes(sexualOrientation)) {
            return res.status(400).json({ error: "This sexual orientation input has not yet been added to our database" })
        }
        if (race && !listOfRaces.includes(race)) {
            return res.status(400).json({ error: "This race input has not yet been added to our database" })
        }
        if (genderIdentity && !listOfGenderIdentities.includes(genderIdentity)) {
            return res.status(400).json({ error: "This gender identity input has not yet been added to our database" })
        }
        if (picture) {
            picture = await imageUploader(picture);
        }
        else {
            picture = await simpleAvatarGenerator(name);
        }
        const politician = new Politician({ name, gender, dateOfBirth, sexualOrientation, picture, country, state, user: user._id, editors: [user._id] });
        await politician.save();
        return res.json({ politician });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})


//edit a politician's profile

router.put('/:id', async (req, res) => {
    try {
        let { name, gender, genderIdentity, partyAffiliation, sexualOrientation, country, dateOfBirth, state, race, picture } = req.body;
        let politician = await Politician.findById(req.params.id);
        const user = await User.findById(req.user);
        if (user.admin < 2 && politician.user !== user._id) {
            return res.status(401).json({ error: "You need to be at least an admin to access this route" })
        }

        if (country && !listOfCountries.includes(country)) {
            return res.status(400).json({ error: "This country input has not yet been added to our database" })
        }
        else if (country) {
            politician.country = country;
        }
        if (state && !listOfAmericanStates.includes(state)) {
            return res.status(400).json({ error: "This state input has not yet been added to our database" })
        }
        else if (state) {
            politician.state = state;
        }
        if (partyAffiliation) {
            let party = await Party.findById(partyAffiliation);
            if (!party) {
                return res.status(404).json({ error: "Not Found" })
            }
            partyAffiliation = party._id;
        }
        if (gender && !listOfGenders.includes(gender)) {
            return res.status(400).json({ error: "This gender input has not yet been added to our database" })
        } else if (gender) {
            politician.gender = gender
        }
        if (sexualOrientation && !listOfSexualities.includes(sexualOrientation)) {
            return res.status(400).json({ error: "This sexual orientation input has not yet been added to our database" })
        } else if (sexualOrientation) {
            politician.sexualOrientation = sexualOrientation;
        }
        if (race && !listOfRaces.includes(race)) {
            return res.status(400).json({ error: "This race input has not yet been added to our database" })
        }
        else if (race) {
            politician.race = race;
        }
        if (genderIdentity && !listOfGenderIdentities.includes(genderIdentity)) {
            return res.status(400).json({ error: "This gender identity input has not yet been added to our database" })
        } else if (genderIdentity) {
            politician.genderIdentity = genderIdentity;
        }
        if (picture) {
            picture = await imageUploader(picture);
            politician.picture = picture;
        }
        politician.editors = [...politician.editors, user._id];
        await politician.save();
        return res.json({ politician });
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