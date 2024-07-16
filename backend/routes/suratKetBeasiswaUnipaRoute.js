const express = require("express"); // Import express framework
const router = express.Router(); // Create a router instance
const suratBeasiswaController = require("../controllers/suratKetBeasiswaUnipaController"); // Import controller functions for surat beasiswa

// Define routes and their corresponding controller functions
router.post(
  "/buat-surat-beasiswa",
  suratBeasiswaController.createSuratKetBeasiswaUnipa
); // Route to create a new surat beasiswa
router.get(
  "/lihat-surat-beasiswa/:hashed_id",
  suratBeasiswaController.getBeasiswa
); // Route to view a surat beasiswa by hashed_id
router.get(
  "/lihat-surat-beasiswa-admin/:id",
  suratBeasiswaController.getBeasiswaAdmin
); // Route to view a surat beasiswa by ID for admin
router.get(
  "/lihat-surat-beasiswa-menunggu",
  suratBeasiswaController.getSuratBeasiswaMenunggu
); // Route to view all pending surat beasiswa
router.get(
  "/lihat-surat-beasiswa-diterima",
  suratBeasiswaController.getSuratBeasiswaTerima
); // Route to view all accepted surat beasiswa
router.delete(
  "/hapus-surat-beasiswa/:id",
  suratBeasiswaController.deleteBeasiswa
); // Route to delete a surat beasiswa by ID
router.post(
  "/terima-surat-beasiswa/:id",
  suratBeasiswaController.updateStatusDiterima
); // Route to update status of a surat beasiswa to 'diterima'
router.put(
  "/update-nomor-email-beasiswa/:hashed_id",
  suratBeasiswaController.updateBeasiswa
); // Route to update phone number and email of a surat beasiswa by hashed_id
router.put(
  "/update-all-surat-beasiswa/:id",
  suratBeasiswaController.updateSuratBeasiswaAll
); // Route to update all details of a surat beasiswa by ID
router.put(
  "/update-all-surat-beasiswa-user/:hashed_id",
  suratBeasiswaController.updateSuratBeasiswaAllUser
); // Route to update all details of a surat beasiswa by hashed_id

module.exports = router; // Export the router for use in other modules
