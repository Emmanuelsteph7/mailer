const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendMailgun } = require("../utils/sendEmail");

exports.sendEmail = catchAsyncErrors(async (req, res, next) => {
  const { name, companyName, email, phoneNumber, message } = req.body;

  const output = `
      <p>You have a new mail from ImperoTechne contact form</p>
    <h3>Contact Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Company Name: ${companyName}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">Phone Number: ${phoneNumber}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
      `;

  try {
    await sendMailgun({
      email: `${process.env.RECIPIENT_MAILGUN_EMAIL}`,
      subject: "Impero Techne Contact Form",
      output,
    });
    // console.log("func");

    res.json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
