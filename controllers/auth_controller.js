const bcrypt = require('bcrypt');
const User = require("../models/user_model")
const jwt = require("jsonwebtoken")
const saltRounds = 10;

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
            const accessToken = jwt.sign({ 
                id: user.id,
                admin: user.admin
            },
                process.env.SECRET_JWT,
                { expiresIn: "30s" }
            )
            const { password, ...others } = user._doc;
            return res.status(200).json({...others, accessToken})
        } 
    },


}

module.exports = authController





