const { User } = require("../../models/user");
const { HttpError, sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a href="http://localhost:300/api/auth/verify/${user.verificationToken}" target="_blank">Натисніть для підтвердження реєстрації</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;
