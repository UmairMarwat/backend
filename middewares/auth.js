const jwt = require("jsonwebtoken");
const User = require("../models/user");

verifyToken = (req, res, next) => {
  let token = extractToken(req);
  console.log(token);

  if (!token) {
    return res.send({
      success: false,
      error: "No token provided!",
      body: null,
    });
  }
  jwt.verify(token, "JWT_SECRET", (err, decoded) => {
    if (err) {
      return res.send({
        success: false,
        error: "Unauthorized!",
        body: null,
      });
    }
    console.log("sfsdfsdfsdfs", decoded);
    req.user_id = decoded.id;

    // console.log("This is auth",req.user_id);
    next();
  });
};

getUserId = (req, res, next) => {
  let token = extractToken(req);
  console.log(token);

  jwt.verify(token, "JWT_SECRET", (err, decoded) => {
    if (err) {
      // return res.send({
      //   success: false, error: "Unauthorized!", body: null
      // });
    }
    console.log("decoded", decoded);
    if (isUndefined(decoded)) {
      console.log("user not registered");
    } else {
      req.user_id = decoded.id;
    }
    console.log(req.user_id);
    next();
  });
};

function extractToken(req) {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  } else if (req.query && req.query.token) {
    return req.query.token;
  }
  return null;
}

// ... rest of the code ...

const authJwt = {
  verifyToken: verifyToken,
};

module.exports = authJwt;
