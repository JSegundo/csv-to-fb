const crypto = require("crypto")

const hashAndTransformData = (conversions) => {
  return conversions.map((item) => {
    let { email, phone, Name, gender, Checkout_time, madid, country, ...rest } =
      item
    const nameArr = Name.split(" ")

    // cambiarlo pq ahora email es un array de mails
    const em = crypto.createHash("sha256").update(email).digest("hex")
    const ph = crypto.createHash("sha256").update(phone).digest("hex")

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

    madid = crypto.createHash("sha256").update(madid).digest("hex")

    country = crypto
      .createHash("sha256")
      .update(country.toLowerCase())
      .digest("hex")

    const checkout_time = new Date(Checkout_time).toISOString()
    return { em, ph, fn, ln, ge, zp, madid, checkout_time, ...rest }
  })

  // conversions.forEach((conversion) => {
  //   conversion.email = crypto
  //     .createHash("sha256")
  //     .update(conversion.email)
  //     .digest("hex")
  //   conversion.phone = crypto
  //     .createHash("sha256")
  //     .update(conversion.phone)
  //     .digest("hex")

  //   conversion.fn = conversion.Name.split(" ")[0]
  //   conversion.ln = conversion.Name.split(" ")[1]
  //   conversion["zip-code"] = crypto
  //     .createHash("sha256")
  //     .update(conversion["zip-code"])
  //     .digest("hex")
  //   conversion.ge = conversion.gender[0].toLowerCase()
  //   // conversion.Checkout_time =
  //   conversion.madid = crypto
  //     .createHash("sha256")
  //     .update(conversion.madid)
  //     .digest("hex")
  //   delete conversion.gender
  //   delete conversion.Name
  // })

  return conversions
}

module.exports = hashAndTransformData
