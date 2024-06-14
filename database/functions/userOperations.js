const mongoose = require('mongoose')
const User = require('../models/user')

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
    return await User.find(search).lean() //The lean option tells Mongoose to skip hydrating the result documents. This makes queries faster and less memory intensive
  } catch (error) {
    //console.error(error)
    return error
  }
}

async function createUser(data) {
  try {
    //form1
    let newUser = new User({
      example1: data.example1,
      example2: data.example2,
      example3: data.example3,
      example4: data.example4
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
    let base = await User.findOneAndUpdate(
      search,
      data,
      { new: true } // true: return updated object
    )
    return base.toObject()
  } catch (error) {
    return error
  }
}

async function deleteBase(search) {
  try {
    const user = await User.findOneAndDelete(search)
    return user.toObject()
  } catch (error) {
    return error
  }
}

module.exports = {
  getAllBase,
  getBase,
  createUser,
  updateBase,
  deleteBase
}
