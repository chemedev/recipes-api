const jwt = require('jsonwebtoken')
const User = require('../../models/User')

module.exports.verifyUser = async req => {
  try {
    req.email = null
    const bearerHeader = req.headers.authorization
    if (bearerHeader) {
      const token = bearerHeader.split(' ')[1]
      const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.email = payload.email
      const user = await User.findOne({ where: { email: payload.email } })
      req.loggedInUserId = user.id
    }
  } catch (error) {
    console.log('verifyUser:', error)
    throw error
  }
}
