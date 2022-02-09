const express = require("express");
const { sendEmail } = require("../../controllers/rahaahController");
const router = express.Router();

// POST Send email
// route => api/portfolio
router.route("/rahaah").post(sendEmail);

module.exports = router;
