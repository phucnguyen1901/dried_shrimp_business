const bcrypt = require('bcrypt');
const User = require("../models/user_model")
const jwt = require("jsonwebtoken")
const saltRounds = 10;

let refreshTokenStored = []

const authController = {

    registerUser : async (req,res) => {
        const { fullname, username, password } = req.body;
        // hash password
        bcrypt.hash(password, saltRounds, async function(err, passwordHash) {
             const newUser = new User({
                fullname: fullname,
                username: username,
                password: passwordHash
            })

            try {
                const userRegister = await newUser.save();
                res.status(200).json(userRegister)
            } catch (error) {
                res.status(500).json({error: "Not Save User"})
            }

        });
       
    },

    loginUser: async (req,res) => {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username })
        // select("-password")

        if(!user){
            return res.status(404).json("Wrong username or password");
        }

        const checkPassword = await bcrypt.compare(password, user.password);
        if(!checkPassword){
            return res.status(404).json("Wrong username or password");
        }else{
            const accessToken = generateToken(user)
            const refreshToken = generateRefreshToken(user)
            storeRefreshToken(refreshToken, res)
            refreshTokenStored.push(refreshToken)
            const { password, ...others } = user._doc;
            return res.status(200).json({...others, accessToken})
        } 
    },

    
    refreshToken : (req, res) => {

        const refreshTokenFromCookie = req.cookies.refreshToken;

        // if( !refreshTokenFromCookie) return res.status(401).json("Not Authenticated")
        if( !refreshTokenStored.includes(refreshTokenFromCookie) ) return res.status(401).json("Not Found Refresh Token")

        jwt.verify(refreshTokenFromCookie, process.env.SECRET_REFRESH_JWT, (err, user) => {

            if(err){
                return res.status(403).json("Refresh token is not valid")
            }

            refreshTokenStored = refreshTokenStored.map( (el) => el !== refreshTokenFromCookie)
            const newAccessToken = generateToken(user)
            const newRefreshToken = generateRefreshToken(user)
            storeRefreshToken(newRefreshToken, res)
            refreshTokenStored.push(newAccessToken)

            res.status(200).json(newAccessToken);

        } )
        
    },

    logout : (req,res) => {
        
        refreshTokenStored = refreshTokenStored.filter( (el) => el !== req.cookies.refreshToken)
        res.clearCookie("refreshToken")
        res.status(200).json("Logged out ")
    }


}


const generateToken = (user) => {
    
    return jwt.sign({ 
            id: user.id,
            admin: user.admin
        },
            process.env.SECRET_JWT,
            { expiresIn: "20s" }
        )
}

const generateRefreshToken = (user) => {
    
    return jwt.sign({ 
            id: user.id,
            admin: user.admin
        },
            process.env.SECRET_REFRESH_JWT,
            { expiresIn: "10m" }
        )
}

const storeRefreshToken = (refreshToken, res) => {
    const options = {
            secure: false,
            httpOnly: true,
            sameSite: "strict"
    }

    res.cookie("refreshToken", refreshToken, options)
}

module.exports = authController





