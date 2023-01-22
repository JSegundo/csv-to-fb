const csv = require("fast-csv")
const request = require("request")
const _ = require("lodash")

const readCsvFile = async (csvurl) => {
  const conversions = []
  let objres

  await new Promise((resolve, reject) => {
    csv
      .parseStream(request.get(csvurl))
      .on("data", (data) => {
        conversions.push(data)
      })
      .on("end", () => {
        objres = arrayToObject(conversions)
        resolve()
      })
    on("error", () => {
      reject()
    })
  }).catch((err) => {
    console.error(err)
  })

  return objres
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
