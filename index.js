const express = require("express")

const readCsvFile = require("./utils/parsecsv")
const hashAndTransformData = require("./utils/transformdata")
const SendDataToFacebook = require("./services/conversionApi")

const app = express()
// const PORT = process.env.PORT | 3000
const PORT = 3000

app.get("/api/csv", async (req, res) => {
  const url = req.query.url
  const parsedCsv = await readCsvFile(url)
  const transformedData = hashAndTransformData(parsedCsv)
  const statusCode = await SendDataToFacebook(transformedData)

  res.sendStatus(statusCode)
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
