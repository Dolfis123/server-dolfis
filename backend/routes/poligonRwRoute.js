const express = require("express");
const router = express.Router();
const polygonController = require("../controllers/poligonRwController");

router.get("/", polygonController.getPolygons);
router.post("/", polygonController.addPolygon);

module.exports = router;
