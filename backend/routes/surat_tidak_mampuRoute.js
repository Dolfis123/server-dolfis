const express = require("express"); // Import express framework
const router = express.Router(); // Create a router instance
const surat_tidak_mampuController = require("../controllers/surat_tidak_mampuController"); // Import controller functions for surat tidak mampu

// Define routes and their corresponding controller functions
router.post(
  "/buat-surat-tidak-mampu",
  surat_tidak_mampuController.createSuratTidakMampu
); // Route to create a new surat tidak mampu (SKCK)
router.get(
  "/lihat-surat-tidak-mampu/:hashed_id",
  surat_tidak_mampuController.getDomisili
); // Route to view a surat tidak mampu (SKCK) by hashed_id
router.get(
  "/lihat-surat-tidak-mampu-admin/:id",
  surat_tidak_mampuController.getTidakMampuAdmin
); // Route to view a surat tidak mampu (SKCK) by ID for admin
router.get(
  "/lihat-surat-tidak-mampu-menunggu",
  surat_tidak_mampuController.getSuratTidakMampuMenunggu
); // Route to view all pending surat tidak mampu (SKCK)
router.get(
  "/lihat-surat-tidak-mampu-pendidikan-terima",
  surat_tidak_mampuController.getSuratTidakMampuTerima
); // Route to view all accepted surat tidak mampu (SKCK)
router.delete("/hapus-surat-skck/:id", surat_tidak_mampuController.deleteSKCK); // Route to delete a surat tidak mampu (SKCK) by ID
router.post(
  "/terima-surat-skck/:id",
  surat_tidak_mampuController.updateStatusDiterima
); // Route to update status of a surat tidak mampu (SKCK) to 'diterima'
router.put(
  "/update-nomor-email/:hashed_id",
  surat_tidak_mampuController.updateDomisili
); // Route to update phone number and email of a surat tidak mampu (SKCK) by hashed_id
router.put(
  "/update-all-surat-tidak-mampu/:id",
  surat_tidak_mampuController.updateSuratTidakMampuAll
); // Route to update all details of a surat tidak mampu (SKCK) by ID

router.put(
  "/update-all-surat-tidak-mampu-user/:hashed_id",
  surat_tidak_mampuController.updateSuratTidakMampuAllUser
); // Route to update all details of a surat tidak mampu (SKCK) by ID

module.exports = router; // Export the router for use in other modules
