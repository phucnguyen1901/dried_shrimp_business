const express = require("express")
const bcrypt = require('bcrypt');
const User = require("../models/user_model")
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
                // throw(error)
            }

        });
       
    }

}

module.exports = { authController }





