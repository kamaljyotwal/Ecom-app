const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPass,
  resetPass,
  getCurrentUser,
  updatePassword,
  updateProfile,
  getAllUsers,
  getuserDetails,
  updateProfileByAdmin,
  deleteUserByAdmin,
} = require("../controllers/authController");
const { isUserAuthenticated, checkRole } = require("../middlewares/isAuthehticated");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPass);
router.route("/password/reset/:hashedTkn").put(resetPass);
router.route("/me").get(isUserAuthenticated, getCurrentUser);
router.route("/password/update").post(isUserAuthenticated, updatePassword);
router.route("/updateProfile").put(isUserAuthenticated, updateProfile);
// admin operations
router.route("/admin/allUsers").get(isUserAuthenticated, checkRole("admin"), getAllUsers);
router.route("/admin/user/:id").get(isUserAuthenticated, checkRole("admin"), getuserDetails);
router.route("/admin/user/:id").post(isUserAuthenticated, checkRole("admin"), updateProfileByAdmin);
router.route("/admin/user/:id").delete(isUserAuthenticated, checkRole("admin"), deleteUserByAdmin);
module.exports = router;
