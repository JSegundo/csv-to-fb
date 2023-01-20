let conversionApiBody = {
  data: [
    {
      event_name: "Purchase", // action (checkout..)
      event_time: 1674219889, // formatear checkout_time
      action_source: "email", // ya que son conversiones offline, segun docu sería 'physical_store'
      user_data: {
        em: "7b17fb0bd173f625b58636fb796407c22b3d16fc78302d79f0fd30c2fc2fc068", // email hasheado
        ph: null, // telefono hasheadom
      },
      custom_data: {
        currency: null,
      },
    },
  ],
}
