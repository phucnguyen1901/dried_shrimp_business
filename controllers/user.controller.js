
const User = require("../models/user_model")

const userController = {

    getAllUser: async (req,res) =>{

        try {
            const allUser = await User.find().select('-password');
            return res.status(200).json(allUser)
   
        } catch (error) {
            
            return res.status(404).json("Get All User Failed")
        }
        
    },

    deleteUser: async (req,res) => {

        const { id } = req.params;

        try {
            await User.findByIdAndDelete(id)
            return res.status(200).json("User has been deleted")
        } catch (error) {
            return res.status(404).json("Delete user failed")

        }
    }

}

module.exports = userController;













