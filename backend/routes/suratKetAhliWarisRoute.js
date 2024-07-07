const express = require("express"); // Import express framework
const router = express.Router(); // Create a router instance
const suratAhliWarisController = require("../controllers/suratKetAhliWaris"); // Import controller functions for surat ket ahli waris

// Define routes and their corresponding controller functions
router.post(
  "/buat-surat-ahli-waris",
  suratAhliWarisController.createSuratAhliWaris
); // Route to create a new surat ket ahli waris
router.get(
  "/lihat-surat-ahli-waris/:hashed_id",
  suratAhliWarisController.getSuratAhliWaris
); // Route to view a surat ket ahli waris by hashed_id
router.get(
  "/lihat-surat-ahli-waris-admin/:id",
  suratAhliWarisController.getAhliWarisAdmin
); // Route to view a surat ket ahli waris by ID for admin
router.get(
  "/lihat-surat-ahli-waris-menunggu",
  suratAhliWarisController.getSuratAhliWarisMenunggu
); // Route to view all pending surat ket ahli waris
router.get(
  "/lihat-surat-diterima-ahli-waris",
  suratAhliWarisController.getSuratAhliWarisTerima
); // Route to view all accepted surat ket ahli waris
router.delete(
  "/hapus-surat-ahli-waris/:id",
  suratAhliWarisController.deleteAhliWaris
); // Route to delete a surat ket ahli waris by ID
router.post(
  "/terima-surat-ahli-waris/:id",
  suratAhliWarisController.updateStatusDiterima
); // Route to update status of a surat ket ahli waris to 'diterima'
router.put(
  "/update-nomor-email-ahli-waris/:hashed_id",
  suratAhliWarisController.updateEmailAhliWaris
); // Route to update phone number and email of a surat ket ahli waris by hashed_id
router.put(
  "/update-all-surat-ahli-waris/:id",
  suratAhliWarisController.updateSuratAhliWarisAll
); // Route to update all details of a surat ket ahli waris by ID

module.exports = router; // Export the router for use in other modules
