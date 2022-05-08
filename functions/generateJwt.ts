
const jwt = require('jsonwebtoken');
const generateJWT = async (id) => {
    try {

        let token = await jwt.sign({ id }, process.env.jwt_secret, { expiresIn: '90d' })
        return token;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export default generateJWT;