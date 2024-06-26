const mongoose = require('mongoose')
const User = require('../models/User')

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
    const { email, password, completeName } = data
    let newUser = new User({
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

async function FindUserWithValidation(userEmail, userPassword) {
  try {
    const usr = await User.findOne({ email: userEmail }).lean()

    if (usr) {
      const passwordValidation = await User.schema.methods.comparePassword(userPassword, userEmail)
      if (passwordValidation) {
        return usr
      } else {
        return 2
      }
    } else {
      return 3
    }
  } catch (error) {
    console.error('FindUserWithValidation ERROR:' + error)
    return 0
  }
}

module.exports = {
  getAllBase,
  getBase,
  createUser,
  updateBase,
  FindUserWithValidation
}
