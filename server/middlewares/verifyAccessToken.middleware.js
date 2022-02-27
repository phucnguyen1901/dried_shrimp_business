
const jwt = require("jsonwebtoken")

const verifyAccessToken = (req, res, next) =>{

    const header = req.headers.token
    if(header){
        
        const token = header.split(" ")[1]
        jwt.verify(token,process.env.SECRET_JWT, (err, result) => {
            if(err){
                return res.status(403).json("Token is not valid")
            }
                next()

        })
    }else{
        return res.status(401).json("Not Found Token")
    }

}

module.exports = verifyAccessToken




