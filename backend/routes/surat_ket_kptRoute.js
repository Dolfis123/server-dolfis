const express = require("express"); // Import express framework
const router = express.Router(); // Create a router instance
const suratKetKTPController = require("../controllers/surat_ket_ktpController"); // Import controller functions for surat ket ktp

// Define routes and their corresponding controller functions
router.post("/buat-surat-ket-ktp", suratKetKTPController.createSuratKtp); // Route to create a new surat ket KTP
router.get(
  "/lihat-surat-ket-ktp/:hashed_id",
  suratKetKTPController.getSuratKetKTP
); // Route to view a surat ket KTP by hashed_id
router.get(
  "/lihat-surat-ket-ktp-admin/:id",
  suratKetKTPController.getKetKTPAdmin
); // Route to view a surat ket KTP by ID for admin
router.get(
  "/lihat-surat-ket-ktp-menunggu",
  suratKetKTPController.getSuratKtpMenunggu
); // Route to view all pending surat ket KTP
router.get(
  "/lihat-surat-diterima-ktp",
  suratKetKTPController.getSuratKtpTerima
); // Route to view all accepted surat ket KTP
router.delete("/hapus-surat-ket-ktp/:id", suratKetKTPController.deleteKetKTP); // Route to delete a surat ket KTP by ID
router.post(
  "/terima-surat-ket-ktp/:id",
  suratKetKTPController.updateStatusDiterima
); // Route to update status of a surat ket KTP to 'diterima'
router.put(
  "/update-nomor-email-ktp/:hashed_id",
  suratKetKTPController.updateEmailKetKTP
); // Route to update phone number and email of a surat ket KTP by hashed_id
router.put(
  "/update-all-surat-ket-ktp/:id",
  suratKetKTPController.updateSuratKtpAll
); // Route to update all details of a surat ket KTP by ID
router.put(
  "/update-all-surat-ket-ktp-user/:hashed_id",
  suratKetKTPController.updateSuratKtpAllUser
); // Route to update all details of a surat ket KTP by hashed_id

module.exports = router; // Export the router for use in other modules
