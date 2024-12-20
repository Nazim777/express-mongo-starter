const express = require("express");
const {
  register,
  login,
  profile,
  updateProfile,
} = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, profile);
router.patch("/profile", authenticate, updateProfile);

module.exports = router;
