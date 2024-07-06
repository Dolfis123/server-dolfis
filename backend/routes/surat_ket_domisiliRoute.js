const express = require("express");
const router = express.Router();
const surat_ket_domisili = require("../controllers/surat_ket_domisiliController");

// Define routes for handling various operations related to surat domisili
router.post("/buat-surat-domisili-umum", surat_ket_domisili.createDomisili);
router.get(
  "/lihat-surat-domisili-umum/:hashed_id",
  surat_ket_domisili.getDomisili
);
router.get(
  "/lihat-nomor-surat-domisili-umum/:nomor_surat",
  surat_ket_domisili.getByNomorSurat
);
router.get(
  "/lihat-surat-domisili-admin-umum/:id",
  surat_ket_domisili.getDomisiliAdmin
);
router.get(
  "/lihat-surat-ket-domisili-menunggu-umum",
  surat_ket_domisili.getDomisiliMenunggu
);
router.get(
  "/lihat-surat-diterima-domisili-umum",
  surat_ket_domisili.getDomisiliTerima
);
router.delete(
  "/hapus-surat-domisili-umum/:id",
  surat_ket_domisili.deleteDomisili
);
router.post(
  "/terima-surat-domisli-umum/:id",
  surat_ket_domisili.updateStatusDomisilDiterima
);
router.put(
  "/update-nomor-email-domisil-umum/:hashed_id",
  surat_ket_domisili.updateDomisiliByHashedId
);
router.put(
  "/update-all-domisili-umum/:id",
  surat_ket_domisili.updateDomisiliAll
);
router.put(
  "/update-all-domisili-user-umum/:hashed_id",
  surat_ket_domisili.updateDomisiliAllUser
);

module.exports = router;
