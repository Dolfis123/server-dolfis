// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const suratRequestController = require("../controllers/SuratRequestController");

router.get("/requests", suratRequestController.getAllRequests);

module.exports = router;
