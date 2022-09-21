const {
  requestPasswordReset,
  resetPassword,
} = require("../services/AuthService");

const resetPasswordRequestController = async (req, res, next) => {
  try {
    const requestPasswordResetService = await requestPasswordReset(
      req.body.email
    );
    return res.status(200).json(requestPasswordResetService);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const resetPasswordController = async (req, res, next) => {
  try {
    const resetPasswordService = await resetPassword(
      req.body.userId,
      req.body.token,
      req.body.password
    );
    return res.status(200).json(resetPasswordService);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  resetPasswordRequestController,
  resetPasswordController,
};
