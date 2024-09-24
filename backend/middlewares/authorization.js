const {bypassRoutes,secretKey} = require("../config/vars")
const jwt = require("jsonwebtoken")


exports.authorize = (req,res,next) => {


    let path = req.path
    let pathArray = path.split("/")
    path = pathArray[pathArray.length - 1]    

    if(bypassRoutes.includes(path)) {
        return next()
    }
    else {
        try {
            const token = req.headers.authorization?.split(' ')[1]

            if(!token) {
                return res.status(400).send({status:false, message: "Access Denied, Token Missing!"})
            }

            else {
                const decodedToken = jwt.verify(token, secretKey)
                req.user = decodedToken._id
                next()
            }

        } catch (error) {
            return res.status(400).send({status:false, message: "Access Denied, Invalid or Expired Token!", error: error.message})
        }
    }
}