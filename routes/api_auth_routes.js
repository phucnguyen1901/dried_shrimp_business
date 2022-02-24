
const router = require("express").Router();
const { authController } = require("../controllers/auth_controller")


const authRoute = (app) => {

    router.post("/register",authController.registerUser)

    return app.use('/api',router)
}

module.exports = authRoute;











