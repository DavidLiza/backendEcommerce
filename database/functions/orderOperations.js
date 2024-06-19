const mongoose = require('mongoose')
const Order = require('../models/orders')

async function getAllBase() {
  try {
    return await Client.find({}).lean() //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive
  } catch (error) {
    //console.error(error)
    return error
  }
}

async function getBase(search) {
  try {
    return await Order.find(search).lean() //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive
  } catch (error) {
    //console.error(error)
    return error
  }
}

async function createUser(data) {
  try {
    //form1
    const { email, password, completeName } = data
    let newUser = new Order({
      email,
      password,
      completeName
    })

    const createdUser = await newUser.save()
    if (createdUser) {
      return { userCreated: true }
    } else {
      return { userCreated: false }
    }
  } catch (error) {
    return error
  }
}

async function updateBase(search, data) {
  try {
    let base = await Order.findOneAndUpdate(
      search,
      data,
      { new: true } // true: return updated object
    )
    return base.toObject()
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllBase,
  getBase,
  createUser,
  updateBase
}
