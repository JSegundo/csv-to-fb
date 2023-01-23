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

    // The PassThrough class is a way to create a "stream" of data that can be used to process and move data from one place to another. It's like a pipe that moves water from one place to another. The end() method is used to stop the movement of data through the stream, just like turning off the water in the pipe. In this case, the Buffer.from(data) is used to create a new buffer filled with the data from the response, and the end() method is used to stop the data movement in the stream, so the data is ready to be used. The responseType: "arraybuffer" option is used to tell axios that the data is an array of bytes, and that it should be treated as an array buffer when returned.

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
