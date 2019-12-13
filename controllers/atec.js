const Atec = require('../models/atec');
const Response = require('../config/response');

exports.getAll = (req, res) => {
    Atec.find()
    .then(data => {
        Response.send(data, res)
    }).catch(err => {
        Response.send('', res, err)
    });
}
exports.detail = function(req, res) {
    Atec.findOne({_id: req.params.id})
    .then( function( data ){
        Response.send(data, res)
    }).catch(err => {
        Response.send('', res, err)
    });
};

exports.getByUser = function(req, res) {
    Atec.findOne({userId: req.params.id})
    .then( function( data ){
        Response.send(data, res)
    }).catch(err => {
        Response.send('', res, err)
    });
};
