const User = require("../models/userModel")
const jwt = require("jsonwebtoken")


const createToken =(_id) => {
    jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
    res.json({createToken: createToken})

}



const requireAuth =async (req, res, next) =>{
    

    //verify authentication
    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "authorization token required"})
    }

    const token = authorization.split(' ')[1]



    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(404).json({error: "request is not authorized"})
        
    }



}

module.exports = requireAuth;