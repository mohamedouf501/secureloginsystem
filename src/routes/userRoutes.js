const router = require("express").Router();
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");
const validateRequest = require("../../util/validateRequest");
const JoiControllers = require("../controllers/JoiControllers");

router.post("/signup",validateRequest(JoiControllers.validateRegister), authController.signup);
router.post("/login",validateRequest(JoiControllers.validateLogIn), authController.login);
router.post("/forgotPassword",validateRequest(JoiControllers.validateForgetPassword), authController.forGetPassword);
router.patch("/resetPassword/:token",validateRequest(JoiControllers.validateResetPassword), authController.resetPassword);
router.get("/verify/:id" , authController.emailVerification);

router.use(authController.protect);

router.patch("/updateMyPassword", validateRequest(JoiControllers.validateChangePassword),authController.updatePassword);
router.patch("/updateMe", validateRequest(JoiControllers.validateUpdate),userController.updateMe);
router.delete("/deleteMe", userController.deleteMe);

 router.use(authController.restrictTo('admin'));

router.route("/")
    .get(userController.getAllUsers);
router.route("/:id")
    .get(userController.getUser)
    .delete(userController.deleteUser)
    .patch(userController.AddAdmin);
    

module.exports = router;
