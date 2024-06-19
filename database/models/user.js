const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, select: false, required: true },
    completeName: { type: String, required: true },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    recommendations: [String],
    trustScore: { type: Number }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', default: Date.now } }
)

userSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

userSchema.methods.comparePassword = async function (candidatePassword, usr) {
  try {
    userFind = await user.findOne({ email: usr }).select('password').exec()
    result = await bcrypt.compare(candidatePassword, userFind.password)
    return result
  } catch (error) {
    return error
  }
}

var user = mongoose.model('User', userSchema, 'user')
module.exports = user
