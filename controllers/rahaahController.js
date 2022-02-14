const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { sendMailgun } = require("../utils/sendEmail");

// RAHAAH_EMAIL=customerservice@rahaah.com.ng

exports.sendEmail = catchAsyncErrors(async (req, res, next) => {
  const { name, phoneNumber, email, city, message, package } = req.body;

  const output = `
      <p>You have a new mail from Rahaah contact form</p>
    <h3>Message Details</h3>
    <ul>
      <li style="margin-bottom: 10px;">Name: ${name}</li>
      <li style="margin-bottom: 10px;">Phone Number: ${phoneNumber}</li>
      <li style="margin-bottom: 10px;">Email: ${email}</li>
      <li style="margin-bottom: 10px;">City: ${city}</li>
      <li style="margin-bottom: 10px;">Package: ${package}</li>
      <li style="margin-bottom: 10px;">Message: ${message}</li>
    </ul>
      `;

  try {
    await sendMailgun({
      email: `${process.env.RAHAAH_EMAIL}`,
      subject: "Rahaah Contact Form",
      output,
      from: "Rahaah Website <info@rahaah.com>",
    });
    // console.log("func");

    res.json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
