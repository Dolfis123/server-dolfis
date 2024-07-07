const express = require("express"); // Import express framework
const router = express.Router(); // Create a router instance
const suratKetKkController = require("../controllers/surat_ket_kkController"); // Import controller functions for surat ket ktp

// Define routes and their corresponding controller functions
router.post("/buat-surat-ket-kk", suratKetKkController.createSuratKk); // Route to create a new surat ket KTP
router.get(
  "/lihat-surat-ket-kk/:hashed_id",
  suratKetKkController.getSuratKetKk
); // Route to view a surat ket KTP by hashed_id
router.get("/lihat-surat-ket-kk-admin/:id", suratKetKkController.getKetKkAdmin); // Route to view a surat ket KTP by ID for admin
router.get(
  "/lihat-surat-ket-kk-menunggu",
  suratKetKkController.getSuratKkMenunggu
); // Route to view all pending surat ket KTP
router.get("/lihat-surat-diterima-kk", suratKetKkController.getSuratKkTerima); // Route to view all accepted surat ket KTP
router.delete("/hapus-surat-ket-kk/:id", suratKetKkController.deleteKetKk); // Route to delete a surat ket KTP by ID
router.post(
  "/terima-surat-ket-kk/:id",
  suratKetKkController.updateStatusDiterima
); // Route to update status of a surat ket KTP to 'diterima'
router.put(
  "/update-nomor-email-kk/:hashed_id",
  suratKetKkController.updateEmailKetKk
); // Route to update phone number and email of a surat ket KTP by hashed_id
router.put(
  "/update-all-surat-ket-kk/:id",
  suratKetKkController.updateSuratKkAll
); // Route to update all details of a surat ket KTP by ID
router.put(
  "/update-all-surat-ket-kk-user/:hashed_id",
  suratKetKkController.updateSuratKkAllUser
); // Route to update all details of a surat ket KTP by hashed_id

module.exports = router; // Export the router for use in other modules
