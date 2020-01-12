const User = require('../models/user');
const Response = require('../config/response');
const ValidationResult = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getAll = (req, res) => {
    User
    .find()
    .then(data => {
        Response.send(data, res);
    }).catch(err => {
        Response.send('', res, err);
    });
}

exports.detail = function(req, res) {
    User
    .findOne({_id: req.params.id})
    .then( function( data ){
        Response.send(data, res);
    }).catch(err => {
        Response.send('', res, err);
    });
};

exports.create = function(req, res) {
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    user.save().then(function(){
        Response.send(user, res);
    }).catch(err => {
        Response.send('', res, err);
    });
};

exports.delete = function(req, res) {
    User
    .deleteOne({_id: req.params.id})
    .then(user => {
        Response.send(user.ok, res);
    })
    .catch(err => {
        Response.send('', res, err);
    });
};


exports.login = function(req, res) {
    try {
        const { email, password } = req.body
        User.findOne({email}, (err, user) => {
            if (!err && user) {
                console.log('masuk');
              // We could compare passwords in our model instead of below
              bcrypt.compare(password, user.password).then(match => {
                if (!match) {
                    throw new Error("Not authorized to access this resource");
                }

                const payload = { user: user.name };
                const options = { expiresIn: '2d', issuer: 'https://scotch.io' };
                const secret = process.env.JWT_KEY;
                const token = jwt.sign(payload, secret, options);
                res.send({ user, token })
              }).catch(err => {
                  console.log(err);
                Response.send('', res, 'Login failed! Check authentication credentials');
              });
            } else {
                Response.send('', res, 'Login failed! Check authentication credentials');
            }
        });
    } catch (error) {
        Response.send('', res, error.message);
    }
};

exports.logout = function(req, res) {
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        req.user.save()
        res.send()
    } catch (error) {
        res.status(500).send(error)
    }
};
