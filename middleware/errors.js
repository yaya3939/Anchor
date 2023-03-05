const { validationResult } = require("express-validator");

function validateError(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

function serverError(error, res) {
  console.log(error.message);
  res.status(500).send("Server error");
}

module.exports = { validateError, serverError };
