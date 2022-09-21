const router = require("express").Router();

const {
  resetPasswordRequestController,
  resetPasswordController,
} = require("../controllers/ResetController");

router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);

module.exports = router;
