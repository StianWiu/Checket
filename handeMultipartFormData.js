const formidable = require('formidable');

module.exports = function (req, res, next) {
  const formData = new formidable.IncomingForm();

  formData
    .parse(req, (err, fields, files) => {
        if (err) {
          next(err);
        } else {
          req.body = fields;
          req.files = files;
          next();
        }
    })
    .on('error', err => {
      next(err);
    });
}