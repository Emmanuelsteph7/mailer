const express = require("express");
const { sendEmail } = require("../../controllers/imperoContact");
const router = express.Router();

// POST Send email
// route => api/portfolio
router.route("/impero-contact").post(sendEmail);

module.exports = router;
