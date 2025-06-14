const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id: ... } from JWT payload
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

module.exports = protect;
