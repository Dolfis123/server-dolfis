const express = require("express");
const router = express.Router();
const persyaratanLayananController = require("../controllers/persyaratanLayananController");

// Menambahkan data pelayanan (POST request)
router.post("/pelayanan", persyaratanLayananController.tambahPelayanan);

// Mendapatkan semua data pelayanan (GET request)
router.get("/pelayanan", persyaratanLayananController.getAllPelayanan);

// Mendapatkan  data pelayanan berdasarkan ID (GET request)
router.get("/pelayanan/:id", persyaratanLayananController.getPelayananById);

// Memperbarui data pelayanan berdasarkan ID (PUT request)
router.put("/pelayanan/:id", persyaratanLayananController.updatePelayananById);

// Menghapus data elayanan berdasarkan ID (DELETE request)
router.delete(
  "/pelayanan/:id",
  persyaratanLayananController.deletePelayananById
);

module.exports = router;
