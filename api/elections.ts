const router = require('express').Router();
const validator = require('oversimplified-express-validator');
const simpleAvatarGenerator = require('simple-avatar-generator');

import Politician from '../models/politicians';
import Election from '../models/elections';
import Question from '../models/electionSpecificQuestions';
import Answer from '../models/answers';

import auth from '../middlewares/auth';
import User from '../models/user';
import listOfCountries from '../util/listOfCountries';
import listOfAmericanStates from '../util/listOfAmericanStates';


router.get('/location', async (req, res) => {
    try {
        console.log('get location');
        const { country, state, electionType, offset } = req.query;
        console.log(state)

        if (state !== 'null' && state) {
            console.log('1')
            if (!electionType || electionType === "null") {
                const elections = await Election.find({
                    'location.country': country,
                    'location.state': state
                }).skip(Number(offset)).limit(10);
                return res.json({ elections });
            }
            console.log(electionType)
            console.log('2')
            const elections = await Election.find({
                'location.country': country,
                'location.state': state, 
                type: electionType
            }).skip(Number(offset)).limit(10);
            console.log( {
                country, state
            })
            return res.json({ elections });
        }
        if (!electionType || electionType === "null") {
            console.log('3')
            const elections = await Election.find({
                'location.country': country
            }).skip(Number(offset)).limit(10);
            return res.json({ elections });
        }

        console.log('4')
        const elections = await Election.find({
            'location.country': country, type: electionType
        }).skip(Number(offset)).limit(10);
        return res.json({ elections });

    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.post('/', [auth, validator([{ name: "politicians" }, { name: "date" }, { name: "type" }, { name: "For" }, { name: "country" }])], async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (user.admin === 0) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        let { politicians, date, type, For, country, additionalDetails, state, city, district } = req.body;
        if (!["Federal", "State", "Municipal", "Primaries-Federal", "Primaries-State", "Primaries-Municipal"].includes(type)) {
            return res.status(400).json({ error: "This type input has not yet been added to our database" });
        }
        let election = new Election({ date, type, for: For, additionalDetails, location: { city, district }, createdBy: user._id, editors: [user._id] });
        if (country && !listOfCountries.includes(country)) {
            return res.status(400).json({ error: "This country input has not yet been added to our database" })
        }
        else if (country) {
            election.location.country = country;
        }
        if (state && !listOfAmericanStates.includes(state)) {
            return res.status(400).json({ error: "This state input has not yet been added to our database" });
        }
        else if (state) {
            election.location.state = state;
        }

        if (politicians) {
            let Politicians: any = [];
            for (let i = 0; i < politicians.length; i++) {
                try {
                    const a = await Politician.findById(politicians[i]);
                    if (!a) {
                        return res.status(404).json({ error: `politician ${politicians[i]} not found` });
                    }
                    Politicians.push(a._id);
                }
                catch (e) {
                    return res.status(404).json({ error: `politician ${politicians[i]} not found` });
                }
            }
            election.politicians = Politicians;
        }
        await election.save();
        return res.json({ election });
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
        let election = await Election.findById(req.params.id);
        if (user.admin < 2 && election.user.toString() !== user._id.toString()) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        let { politicians, date, type, For, country, additionalDetails, state, city, district } = req.body;
        if (date) {
            election.date = date;
        }
        if (For) {
            election.for = For;
        }
        if (additionalDetails) {
            election.additionalDetails = additionalDetails;
        }
        if (city) {
            election.city = city;
        }
        if (district) {
            election.district = district;
        }
        if (type && !["Federal", "State", "Municipal", "Primaries-Federal", "Primaries-State", "Primaries-Municipal"].includes(type)) {
            return res.status(400).json({ error: "This type input has not yet been added to our database" });
        }
        else if (type) {
            election.type = type;
        }
        if (country && !listOfCountries.includes(country)) {
            return res.status(400).json({ error: "This country input has not yet been added to our database" })
        }
        else if (country) {
            election.location.country = country;
        }
        if (state && !listOfAmericanStates.includes(state)) {
            return res.status(400).json({ error: "This state input has not yet been added to our database" });
        }
        else if (state) {
            election.location.state = state;
        }

        if (politicians) {
            let Politicians: any = [];
            for (let i = 0; i < politicians.length; i++) {
                try {
                    const a: any = await Politician.findById(politicians[i]);
                    if (!a) {
                        return res.status(404).json({ error: `politician ${politicians[i]} not found` });
                    }
                    Politicians.push(a._id);
                }
                catch (e) {
                    return res.status(404).json({ error: `politician ${politicians[i]} not found` });
                }
            }
            election.politicians = Politicians;
        }
        await election.save();
        return res.json({ election });
    }
    catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ error: "Not Found" })
        }
        console.log(err);
        return res.status(500).json({ error: "We can't process your request at this moment. Please try again later!" })
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        let election = await Election.findById(req.params.id);
        let user = await User.findById(req.user);
        let politicians = []
        if (!election) {
            return res.status(404).json({ error: "Not Found" })
        }
        for (let i = 0; i < election.politicians.length; i++) {
            let a: any = await Politician.findById(election.politicians[i]);

            await politicians.push(a)
        }
        let questions = await Question.find({ election: election._id });
        let answers: any = [];
        for (let i = 0; i < questions.length; i++) {
            let answer = await Answer.findOne({ user: user._id, question: questions[i]._id });
            console.log(answer)
            answers = [...answers, answer];
        }
        console.log(answers)
        // election.politicians = politicians;
        console.log(politicians);
        return res.json({
            election: {
                _id: election._id,
                date: election.date,
                type: election.type,
                for: election.for,
                location: election.location,
                createdBy: election.createdBy,
                editors: election.editors,
                politicians,
                answers,
                questions
            }
        });
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
        let election = await Election.findById(req.params.id);
        if (user.admin < 2 && election.user.toString() !== user._id.toString()) {
            return res.status(401).json({ error: "You need to be at least a moderator to access this route" })
        }
        if (!election) {
            return res.status(404).json({ error: "Not Found" })
        }
        await election.delete();
        return res.json({ msg: "successfully deleted!" })
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