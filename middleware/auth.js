const jwt = require("jsonwebtoken");
const Response = require("../config/response");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    if (typeof req.headers.authorization !== "undefined") {
      // JWT using the split function
      let token = req.headers.authorization.split(" ")[1];
      let decode = jwt.verify(token, process.env.JWT_KEY);
      // Here we validate that the JSON Web Token is valid and has been
      var userId = decode.id;
      User.findOne({ _id: userId }).then(function(user){
        req.user = user;
        req.token = token;
        next();
      }).catch(err => {
        throw new Error("Not authorized to access this resource");
      })
    } else {
      throw new Error("Not authorized to access this resource");
    }
  } catch (error) {
    Response.send("", res, error.message);
  }
};
module.exports = auth;
