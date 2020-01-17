exports.send = function(data, res, err = "") {
  var data = {
    status: err == "" ? true : false,
    data: data,
    message: err
  };
  res.json(data);
  res.end();
};
