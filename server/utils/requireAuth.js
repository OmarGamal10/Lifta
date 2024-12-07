const jwt = require("jsonwebtoken");

exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;


    if(!token) {
        console.log("Error: No token detected");
        res.redirect("/login");
    }

    else {
    jwt.verify(token, process.env.SECRETKEY, (err, decodedToken) => {
        if(err) {
            console.log(err);
            res.redirect("/login");
        }
        else {
            next();
        }
    })
}
};