const User = require("../models/user");
const Response = require("../config/response");
const ValidationResult = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.getAll = (req, res) => {
  User.find()
    .then(function(data){
      Response.send(data, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};

exports.detail = function(req, res) {
  User.findOne({ _id: req.params.id })
    .then(function(data){
      Response.send(data, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};

exports.create = function(req, res) {
    const email = req.body.email;
    User.findOne({ email }, (err, user) => {
      if (!err && user) {
        Response.send("", res, "Email is already registered.");
      }else{

        let user = new User();
        user.email = req.body.email;
        user.password = req.body.password;
        user.role = 'RL-02';
        user
          .save()
          .then(function() {
            Response.send(user, res);
          })
          .catch(err => {
            Response.send("", res, err);
          });

      }
    }).catch(err => {
      Response.send("", res, err);
    });
 
};

exports.addKid = (req, res, next) => {
  let id_user = req.body.id_user;
  let kid = {
    name: req.body.name,
    gender: req.body.gender,
    birthday: req.body.birthday
  }

  User.findOneAndUpdate({ _id: id_user }, { $push: { kids: kid } }, {new: true})
    .then(function(data){
      Response.send(data, res);
    }).catch(err => {
      Response.send("", res, err);
    });
 
};

exports.updateKid = (req, res) => {
  let id = req.params.id;
  let { name, gender, birthday, id_user } = req.body;

  User.findOneAndUpdate({
          "_id": id_user, "kids._id" : id 
        }, { 
            $set: { 
              "kids.$.name": name,
              "kids.$.gender": gender,
              "kids.$.birthday": birthday
            } 
        }, {new: true})
    .then(function(data){
      Response.send(data, res);
    }).catch(err => {
        Response.send("", res, err);
    });
}

exports.delete = function(req, res) {
  User.deleteOne({ _id: req.params.id })
    .then(user => {
      Response.send(user.ok, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};

exports.login = function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (!err && user) {
        bcrypt
          .compare(password, user.password)
          .then(match => {
            if (!match) {
              Response.send("", res, "Login failed! Check authentication credentials");
            }

            const payload = { id: user.id };
            const options = { expiresIn: "2d", issuer: "https://scotch.io" };
            const secret = process.env.JWT_KEY;
            const token = jwt.sign(payload, secret, options);
            Response.send({ user, token }, res);
          })
          .catch(err => {
            Response.send("", res, "Login failed! Check authentication credentials");
          });
      } else {
        Response.send("", res, "Login failed! Check authentication credentials");
      }
    });
};

exports.resetPassword = function(req, res){
  const email = req.body.email
   User
       .findOne({
           where: {email: email},//checking if the email address sent by client is present in the db(valid)
       })
       .then(function (user) {
           if (!user) {
               return throwFailed(res, 'No user found with that email address.')
           }
           ResetPassword
               .findOne({
                   where: {userId: user.id, status: 0},
               }).then(function (resetPassword) {
               if (resetPassword)
                   resetPassword.destroy({
                       where: {
                           id: resetPassword.id
                       }
                   })
               token = crypto.randomBytes(32).toString('hex')//creating the token to be sent to the forgot password form (react)
               bcrypt.hash(token, null, null, function (err, hash) {//hashing the password to store in the db node.js
                   ResetPassword.create({
                       userId: user.id,
                       resetPasswordToken: hash,
                       expire: moment.utc().add(config.tokenExpiry, 'seconds'),
                   }).then(function (item) {
                       if (!item)
                           return throwFailed(res, 'Oops problem in creating new password record')
                       let mailOptions = {
                           from: '"<Super Kid>" info@superkid.id',
                           to: user.email,
                           subject: 'Reset your account password',
                           html: '<h4><b>Reset Password</b></h4>' +
                           '<p>To reset your password, complete this form:</p>' +
                           '<a href=' + config.clientUrl + 'reset/' + user.id + '/' + token + '">' + config.clientUrl + 'reset/' + user.id + '/' + token + '</a>' +
                           '<br><br>' +
                           '<p>--Team</p>'
                       }
                       let mailSent = sendMail(mailOptions)//sending mail to the user where he can reset password.User id and the token generated are sent as params in a link
                       if (mailSent) {
                           return res.json({success: true, message: 'Check your mail to reset your password.'})
                       } else {
                           return throwFailed(error, 'Unable to send email.');
                       }
                   })
               })
           });
       })
}

exports.changePassword = function(req, res) {
    User.findByIdAndUpdate(req.params.email, {
      password: req.body.password,
      content: req.body.content
  }, {new: true})
};


