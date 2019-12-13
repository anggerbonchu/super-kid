const User = require('../models/user');
const Response = require('../config/response');
const ValidationResult = require('express-validator');

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
        const user = User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check authentication credentials'})
        }
        const token = user.generateAuthToken()
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error)
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
