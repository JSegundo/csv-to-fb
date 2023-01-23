const validator = require("validator")

function validateInput(req, res, next) {
  const url = req.query.url
  if (!url) {
    return res.status(400).send({ error: "Missing 'url' query parameter" })
  }

  if (!validator.isURL(url)) {
    return res.status(400).send({ error: "Invalid 'url' query parameter" })
  }

  if (!url.endsWith(".csv")) {
    return res
      .status(400)
      .send({ error: "Invalid file type, must be a CSV file" })
  }

  next()
}

module.exports = validateInput
