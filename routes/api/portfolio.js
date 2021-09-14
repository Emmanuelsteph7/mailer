const express = require("express");
const { sendEmail } = require("../../controllers/portfolio");
const router = express.Router();

// POST Send email
// route => api/portfolio
router.route("/portfolio").post(sendEmail);

module.exports = router;
