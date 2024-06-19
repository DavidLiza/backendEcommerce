const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
Schema = mongoose.Schema
const SALT_WORK_FACTOR = 10

const orderSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    quantity: { type: String, select: false, required: true },
    totalAmount: { type: String },
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    estimatedDelivery: { type: String }
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt', default: Date.now } }
)

var order = mongoose.model('orderSchema', orderSchema, 'orderSchema')
module.exports = order
