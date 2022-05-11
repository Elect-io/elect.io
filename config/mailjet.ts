const mailjet = require('node-mailjet');

export default mailjet.connect(process.env.mailJet_api, process.env.mailJet_secret)