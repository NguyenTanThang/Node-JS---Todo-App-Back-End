const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("./config");

const validateJWT = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.json({
            msg: "You need a token",
            msg_type: "danger"
          })
    }

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        if (error) {
            console.log(error);
            return res.json({
                msg: "Invalid token",
                msg_type: "danger"
              })
        }
    }
}

module.exports = validateJWT;