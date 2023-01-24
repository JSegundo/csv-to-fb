const csv = require("fast-csv")
const axios = require("axios")
const _ = require("lodash")
const stream = require("stream")

const readCsvFile = async (csvurl) => {
  try {
    const conversions = []
    let objres

    const response = await axios.get(csvurl, { responseType: "arraybuffer" })
    const data = response.data
    const streamdata = new stream.PassThrough()
    streamdata.end(new Buffer.from(data))


    const csvStream = csv.parseStream(streamdata)

    await new Promise((resolve, reject) => {
      csvStream
        .on("data", (data) => {
          conversions.push(data)
        })
        .on("end", () => {
          objres = arrayToObject(conversions)
          resolve()
        })
        .on("error", (err) => {
          console.error(err)
          reject()
        })
    })
    return objres
  } catch (err) {
    console.error(err)
  }
}

const arrayToObject = (conversions) => {
  const headers = conversions.shift()
  const data = _.map(conversions, (row) => {
    const email = headers.reduce((acc, h, index) => {
      if (h === "email") {
        acc.push(row[index])
      }
      return acc
    }, [])
    const obj = _.zipObject(headers, row)
    obj.email = email
    return obj
  })
  return data
}

module.exports = readCsvFile
