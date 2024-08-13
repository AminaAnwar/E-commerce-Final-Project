const adminModel = require("../../models /admin.model")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {saltRounds,secretKey} = require("../../config/vars")

exports.register = async(req,res) => {
 try {
    const payload = req.body  
    const existingAdmin = await adminModel.findOne({email: payload.email})
    if(existingAdmin) {
      return res.send({messgae: "User already Exists!"})
    }
  
    const hashedPassword = await bcrypt.hash(payload.password, parseInt(saltRounds))
    payload.password = hashedPassword
    const admin = await adminModel.create(payload)
  
    return res.send({status: true, message: "Admin created successfully", data: admin})
  
  
 } catch (error) {
    return res.send({status: false, message: "Something went wrong", error: error.message})
 }

}

exports.login = async(req,res) => {
    try {
    const payload = req.body
    console.log(payload)
    const existingAdmin = await adminModel.findOne({email: payload.email})

    if(!existingAdmin) {
        return res.send({status: false, messgae: "Invalid Credentials"})
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, existingAdmin.password)

    if(!isPasswordMatched) {
        return res.send({status: false, messgae: "Invalid Credentials"})
    }

    const token = jwt.sign({id: existingAdmin._id}, secretKey, { expiresIn: '12h' })
    return res.send({status: true, message: "Admin logged in successfully", data: {token,existingAdmin}})


    } catch (error) {
        return res.send({status: false, message: "Something went wrong", error: error.message})
    }
}