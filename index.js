const express = require("express")

const readCsvFile = require("./utils/parsecsv")
const hashAndTransformData = require("./utils/transformdata")
const SendDataToFacebook = require("./services/conversionApi")
const validateInput = require("./middlewares/validateInput")

const app = express()
const PORT = process.env.PORT | 3000

app.get("/api/csv", validateInput, async (req, res) => {
  const url = req.query.url
  const parsedCsv = await readCsvFile(url)
  const transformedData = hashAndTransformData(parsedCsv)
  const statusCode = await SendDataToFacebook(transformedData)

  console.log(statusCode)
  res.sendStatus(statusCode)
})

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`)
})
