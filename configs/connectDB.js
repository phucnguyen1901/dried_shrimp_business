    const mongoose = require("mongoose");

    async function connectDB(){
        try {
            await mongoose.connect(process.env.URL_MONGODB);
            console.log("MongodDB is connecting ");
        } catch (error) {
            throw(error);
        }
   }

   module.exports = connectDB