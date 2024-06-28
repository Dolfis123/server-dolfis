const express = require("express"); // Import Express framework
const router = express.Router(); // Create a router instance
const surat_ket_domisili = require("../controllers/ketDomisiliUsahaController"); // Import surat_ket_domisiliController module

// Define routes for handling various operations related to surat domisili

// Route to create a new surat domisili
router.post("/buat-surat-domisili", surat_ket_domisili.createDomisiliUsaha);
router.post(
  "/buat-surat-domisili-diterimasi",
  surat_ket_domisili.createDomisiliUsahaDiterima
);

// Route to view a surat domisili by hashed ID
router.get(
  "/lihat-surat-domisili-usaha/:hashed_id",
  surat_ket_domisili.getDomisiliUsaha
);

// Route to view a surat domisili by its nomor surat
router.get(
  "/lihat-nomor-surat-domisili/:nomor_surat",
  surat_ket_domisili.getByNomorSuratUsaha
);

// Route to view a surat domisili by admin based on its ID
router.get(
  "/lihat-surat-domisili-admin/:id",
  surat_ket_domisili.getDomisiliUsahaAdmin
);

// Route to delete a surat domisili by ID
router.delete(
  "/hapus-surat-domisili/:id",
  surat_ket_domisili.deleteDomisiliUsaha
);

// Route to update all details of a surat domisili by ID
router.put(
  "/update-all-domisili/:id",
  surat_ket_domisili.updateDomisiliUsahaAll
);

// Route to update all details of a surat domisili by hashed_id
router.put(
  "/update-surat-domisili-usaha-user/:hashed_id",
  surat_ket_domisili.updateDomisiliUsahaAllUser
);

// Route to approve a surat domisili by ID
router.post(
  "/terima-surat-domisli/:id",
  surat_ket_domisili.updateStatusDomisiliUsahaDiterima
);

// Route to update phone number and email of a surat domisili by hashed ID
router.put(
  "/update-nomor-email-domisil/:hashed_id",
  surat_ket_domisili.updateDomisiliUsahaByHashedId
);

// Route to view all surat domisili waiting for admin approval
router.get(
  "/lihat-surat-ket-domisili-menunggu",
  surat_ket_domisili.getDomisiliUsahaMenunggu
);

// Route to view all surat domisili that have been approved by admin
router.get(
  "/lihat-surat-diterima-domisili",
  surat_ket_domisili.getDomisiliUsahaTerima
);

module.exports = router; // Export the router for use in other parts of the application
