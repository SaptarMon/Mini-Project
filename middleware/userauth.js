const { verify } = require("jsonwebtoken");
const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk';

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader === "") {
    req.isAuth = false;
    res.status(301);
    return res.redirect(302,"/index.html");
    // return res.status(401).send("Authorization failed 1..");
  } else {
    let token=authHeader.split(" ").pop()
    let decoded;
    try {
      decoded = verify(token, JWT_SECRET);
    } catch (error) {
      req.isAuth = false;
    return res.redirect(302,"/index.html");
      // return res.status(401).send("Authorization failed 2..");
    }
    if (!decoded) {
      req.isAuth = false;
      return res.redirect(302,"/index.html");
      // return res.status(401).send("Authorization failed 3..");
    }
    if (decoded?.user?.role !== 'user') {
      req.isAuth = false;
      return res.redirect(302,"/index.html");
      // return res.status(401).send("Authorization failed 4..");
    }
    req.isAuth = true;
    req.user = decoded.user;
    req.userData = decoded;
    return next();
  }
};