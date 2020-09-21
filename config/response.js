exports.send = function(data, res, err = "", code = 200) {
  var data = {
    status: err == "" ? true : false,
    data: data,
    message: err
  };
  res.status(code);
  res.json(data);
  res.end();
};
