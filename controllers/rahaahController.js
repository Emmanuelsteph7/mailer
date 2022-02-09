const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendMailgun } = require("../utils/sendEmail");

exports.sendEmail = catchAsyncErrors(async (req, res, next) => {
  const { name, phoneNumber, email, city, message } = req.body;

  const output = `
      <p>You have a new mail from Rahaah contact form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Company Name: ${phoneNumber}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Phone Number: ${city}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
      `;

  try {
    await sendMailgun({
      email: `${process.env.PORTFOLIO_EMAIL}`,
      subject: "Rahaah Contact Form",
      output,
      from: "Rahaah Contact Form",
    });
    // console.log("func");

    res.json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
