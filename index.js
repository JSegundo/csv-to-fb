const express = require("express")

const readCsvFile = require("./utils/parsecsv")
const hashAndTransformData = require("./utils/transformdata")

const app = express()
const PORT = process.env.PORT | 3000

// const fbURL = `https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}`

app.get("/api/csv", async (req, res) => {
  const url = req.query.url
  const parsedCsv = await readCsvFile(url)
  const transformedData = hashAndTransformData(parsedCsv)

  console.log(transformedData)
  res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})

// los eventos que no correspondan a sitios web requieren solo action_source.

// Enviar solicitudes
// Para enviar eventos nuevos, haz una solicitud POST al perímetro /events de la API desde esta ruta: https://graph.facebook.com/{API_VERSION}/{PIXEL_ID}/events?access_token={TOKEN}. Cuando realizas una publicación en este perímetro, Facebook crea nuevos eventos del servidor.
