const csv = require("fast-csv")
const request = require("request")
const express = require("express")
const app = express()
const PORT = process.env.PORT | 3000

// using all so i can test from browser
app.get("/api/csv", (req, res) => {
  const url = req.query.url
  console.log(url)
  const resp = readCsvFile(url)
  res.send(resp)
})

const readCsvFile = (csvurl) => {
  const conversions = []

  csv
    .parseStream(request.get(csvurl))
    .on("data", (data) => {
      conversions.push(data)
    })
    .on("end", () => {
      console.log(conversions)
    })
}

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})
