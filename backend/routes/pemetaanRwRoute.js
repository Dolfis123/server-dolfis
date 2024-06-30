const express = require("express");
const router = express.Router();
const pemetaanRwController = require("../controllers/pemetaanRwController");

// Routes untuk mengambil data RW
router.get("/rw", pemetaanRwController.getAllRW);

// Routes untuk menambahkan data RW baru
router.post("/rw", pemetaanRwController.createRW);

// Routes untuk memperbarui data RW
router.put("/rw/:id", pemetaanRwController.updateRW);

// Routes untuk menghapus data RW
router.delete("/rw/:id", pemetaanRwController.deleteRW);

// Routes untuk mengambil data RW berdarkan
router.get("/rw/:id", pemetaanRwController.getRWById);

router.get("/rw/search/:query", pemetaanRwController.searchRW);

module.exports = router;
