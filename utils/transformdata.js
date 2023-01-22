const crypto = require("crypto")

const hashAndTransformData = (conversions) => {
  return conversions.map((item) => {
    let {
      email,
      phone,
      Name,
      gender,
      Checkout_time,
      madid,
      country,
      action,
      Price,
    } = item

    const nameArr = Name.split(" ")

    const em = email.map((e) => {
      return crypto.createHash("sha256").update(e.toLowerCase()).digest("hex")
    })

    // remover simbolos y espacios
    const cleanph = phone.replace(/[^\d]/g, "")
    const ph = crypto.createHash("sha256").update(cleanph).digest("hex")

    const fn = crypto
      .createHash("sha256")
      .update(nameArr[0].toLowerCase())
      .digest("hex")

    const ln = crypto
      .createHash("sha256")
      .update(nameArr[1].toLowerCase())
      .digest("hex")

    const ge = crypto
      .createHash("sha256")
      .update(gender[0].toLowerCase())
      .digest("hex")

    const zp = crypto
      .createHash("sha256")
      .update(item["zip code"])
      .digest("hex")

    const price = parseFloat(Price.replace(/[^\d,.]/g, "").replace(",", "."))
    // madid = crypto.createHash("sha256").update(madid).digest("hex")

    country = crypto
      .createHash("sha256")
      .update(country.toLowerCase())
      .digest("hex")

    let checkout_time = new Date(Checkout_time).toISOString()
    // validate that date is before today
    if (checkout_time > new Date().toISOString()) {
      checkout_time = new Date().toISOString()
    }

    action = action.toLowerCase()

    return {
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
    }
  })
}

module.exports = hashAndTransformData
