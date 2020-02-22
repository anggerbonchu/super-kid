const Atec = require("../models/atec");
const Response = require("../config/response");

exports.getAll = (req, res) => {
  console.log(req.user);
  Atec.find()
    .then(data => {
      Response.send(data, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};
exports.detail = function(req, res) {
  Atec.findOne({ _id: req.params.id })
    .then(function(data) {
      Response.send(data, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};

exports.getByUser = function(req, res) {
  Atec.findOne({ userId: req.params.id })
    .then(function(data) {
      Response.send(data, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};

exports.create = function(req, res) {
  let atec = new Atec({
    userId: req.body.userId,
    kidName: req.body.kidName,
    monthYear: req.body.atecYear + req.body.atecMonth,
    bicaraTotal: req.body.bicaraTotal,
    sosialTotal: req.body.sosialTotal,
    sensorikTotal: req.body.sensorikTotal,
    umumTotal: req.body.umumTotal,
    bicara1: req.body.bicara1,
    bicara2: req.body.bicara2,
    bicara3: req.body.bicara3,
    bicara4: req.body.bicara4,
    bicara5: req.body.bicara5,
    bicara6: req.body.bicara6,
    bicara7: req.body.bicara7,
    bicara8: req.body.bicara8,
    bicara9: req.body.bicara9,
    bicara10: req.body.bicara10,
    bicara11: req.body.bicara11,
    bicara12: req.body.bicara12,
    bicara13: req.body.bicara13,
    bicara14: req.body.bicara14,
    sosial1: req.body.sosial1,
    sosial2: req.body.sosial2,
    sosial3: req.body.sosial3,
    sosial4: req.body.sosial4,
    sosial5: req.body.sosial5,
    sosial6: req.body.sosial6,
    sosial7: req.body.sosial7,
    sosial8: req.body.sosial8,
    sosial9: req.body.sosial9,
    sosial10: req.body.sosial10,
    sosial11: req.body.sosial11,
    sosial12: req.body.sosial12,
    sosial13: req.body.sosial13,
    sosial14: req.body.sosial14,
    sosial15: req.body.sosial15,
    sosial16: req.body.sosial16,
    sosial17: req.body.sosial17,
    sosial18: req.body.sosial18,
    sosial19: req.body.sosial19,
    sosial20: req.body.sosial20,
    sensorik1: req.body.sensorik1,
    sensorik2: req.body.sensorik2,
    sensorik3: req.body.sensorik3,
    sensorik4: req.body.sensorik4,
    sensorik5: req.body.sensorik5,
    sensorik6: req.body.sensorik6,
    sensorik7: req.body.sensorik7,
    sensorik8: req.body.sensorik8,
    sensorik9: req.body.sensorik9,
    sensorik10: req.body.sensorik10,
    sensorik11: req.body.sensorik11,
    sensorik12: req.body.sensorik12,
    sensorik13: req.body.sensorik13,
    sensorik14: req.body.sensorik14,
    sensorik15: req.body.sensorik15,
    sensorik16: req.body.sensorik16,
    sensorik17: req.body.sensorik17,
    sensorik18: req.body.sensorik18,
    umum1: req.body.umum1,
    umum2: req.body.umum2,
    umum3: req.body.umum3,
    umum4: req.body.umum4,
    umum5: req.body.umum5,
    umum6: req.body.umum6,
    umum7: req.body.umum7,
    umum8: req.body.umum8,
    umum9: req.body.umum9,
    umum10: req.body.umum10,
    umum11: req.body.umum11,
    umum12: req.body.umum12,
    umum13: req.body.umum13,
    umum14: req.body.umum14,
    umum15: req.body.umum15,
    umum16: req.body.umum16,
    umum17: req.body.umum17,
    umum18: req.body.umum18,
    umum19: req.body.umum19,
    umum20: req.body.umum20,
    umum21: req.body.umum21,
    umum22: req.body.umum22,
    umum23: req.body.umum23,
    umum24: req.body.umum24,
    umum25: req.body.umum25
  });

  atec
    .save()
    .then(function() {
      Response.send(atec, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};

exports.delete = function(req, res) {
  Atec.deleteOne({ _id: req.params.id })
    .then(function(data) {
      Response.send(data, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};

exports.getReport = (req, res, next) => {
  Atec.find(
    { userId: req.query.userId },
    {
      _id: 1,
      monthYear: 1,
      bicaraTotal: 1,
      sosialTotal: 1,
      sensorikTotal: 1,
      umumTotal: 1
    }
  )
    .sort({ monthYear: "desc" })
    .then(data => {
      Response.send(data, res);
    })
    .catch(err => {
      Response.send("", res, err);
    });
};
