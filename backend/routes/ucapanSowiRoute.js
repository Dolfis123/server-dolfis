// Mengimpor modul express untuk membuat router
const express = require("express");
const router = express.Router();

// Mengimpor controller ucapan untuk menangani permintaan pada rute ini
const ucapanSowiController = require("../controllers/ucapanSowiController");

// Rute untuk mendapatkan semua ucapan
router.get("/lihat-ucapan", ucapanSowiController.getAllUcapan);
// Rute untuk membuat ucapan baru
router.post("/ucapan", ucapanSowiController.createUcapan);

// Rute untuk memperbarui ucapan berdasarkan ID
router.put("/edit-ucapan/:id", ucapanSowiController.updateUcapan);

// Rute untuk menghapus ucapan berdasarkan ID
router.delete("/delete-ucapan/:id", ucapanSowiController.deleteUcapan);

// Rute untuk mendapatkan ucapan berdasarkan ID
router.get("/ucapan/:id", ucapanSowiController.getById);

// Mengekspor router untuk digunakan pada aplikasi utama
module.exports = router;
