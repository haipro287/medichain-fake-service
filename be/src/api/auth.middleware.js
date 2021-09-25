const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = require("../config/vars");
const responseUtil = require("../utils/responseUtil");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                return responseUtil.error(res, 200, {
                    status: "AUTH.FAILED"
                });
            }
            req.user = user;
            next();
        });
    } else {
        return responseUtil.error(res, 200, {
            status: "AUTH.FAILED"
        });
    }
};

module.exports = {
    authenticateJWT
}