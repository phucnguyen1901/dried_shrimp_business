
const router = require("express").Router();
const authController = require("../controllers/auth_controller")
const userController = require("../controllers/user.controller")
const verifyAccessToken = require("../middlewares/verifyAccessToken.middleware")


const authRoute = (app) => {

    router.post("/register", authController.registerUser)
    router.post("/login", authController.loginUser)
    router.post("/refreshToken", authController.refreshToken)
    router.post("/logout", authController.logout)
    // user route
    router.get("/allUser", verifyAccessToken, userController.getAllUser)
    router.delete("/delete/:id", userController.deleteUser)
    router.post("/refreshToken", userController.deleteUser)

    return app.use('/api',router)
}

module.exports = authRoute;











