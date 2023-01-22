require("dotenv").config()
const axios = require("axios")
const _ = require("lodash")

const fbURL = `https://graph.facebook.com/v9.0/${process.env.FB_PIXEL_ID}/events?access_token=${process.env.CONVERSIONS_API_ACCESS_TOKEN}`

const SendDataToFacebook = async (arrOfEvents) => {
  let eventsData = _.map(arrOfEvents, (event) => {
    let {
      em,
      ph,
      fn,
      ln,
      ge,
      zp,
      madid,
      checkout_time,
      action,
      price,
      country,
    } = event

    return {
      event_name: action,
      event_time: checkout_time,
      action_source: "physical_store",
      user_data: {
        em,
        ph,
        fn,
        ln,
        ge,
        zp,
        country,
        madid,
      },
      custom_data: {
        currency: "eur",
        value: price,
      },
    }
  })

  const body = { data: eventsData }

  // return axios
  //   .post(fbURL, body)
  //   .then((res) => {
  //     return res.status
  //   })
  //   .catch((err) => console.error(err))

  try {
    const res = await axios.post(fbURL, body)
    return res.status
  } catch (err) {
    console.error(err)
  }
}

module.exports = SendDataToFacebook
