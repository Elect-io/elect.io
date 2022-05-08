const jwt = require('jsonwebtoken');
const auth = async (req, res, next) => {
    try {
        let token = req.headers['x-auth-token']
        if (!token) {
            return res.status(401).json({
                error: "You need to be signed in to make this request"
            });
        }
        let decoded = await jwt.verify(token, process.env.jwt_secret)
        req.user = decoded.id
        next();
    }
    catch (err) {
        console.log(err)

        return res.status(401).json({
            error: "Please sign in again"
        });
    }
}
export default auth;