const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendEmail = require("../utils/sendEmail");

exports.sendEmail = catchAsyncErrors(async (req, res, next) => {
  const { name, email, message } = req.body;

  const output = `
    <h2>Hello Emmanuel</h2>
    <p>You have a new mail from your Portfolio</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
  `;

  try {
    await sendEmail({
      email: `${process.env.PORTFOLIO_EMAIL}`,
      subject: "New mail from portfolio",
      //   message,
      output,
    });

    res.status(200).json({
      success: true,
      message: `Email sent`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
