// Mengimpor modul multer untuk menangani upload file
const multer = require("multer");
const path = require("path");

// Mengimpor modul database untuk berinteraksi dengan database
const db = require("../config/database");

// Konfigurasi penyimpanan file yang diunggah menggunakan multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Menentukan folder penyimpanan untuk gambar
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Menentukan nama file yang diunggah
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Inisialisasi middleware multer dengan konfigurasi penyimpanan
const upload = multer({ storage });

// Handler untuk membuat ucapan baru
const createUcapan = (req, res) => {
  // Menggunakan middleware upload.single untuk menangani upload gambar tunggal
  upload.single("image")(req, res, (err) => {
    if (err) {
      // Mengembalikan respons jika terjadi kesalahan saat mengunggah file
      return res.status(400).json({ error: "Error uploading file" });
    }
    const { pesan } = req.body;

    // Query untuk menyimpan data ucapan baru ke dalam tabel "ucapanlurah"
    const sqlQuery = "INSERT INTO tb_pesan_lurah (pesan, image) VALUES (?, ?)";
    const values = [pesan, req.file ? req.file.filename : null];

    // Menjalankan query untuk menyimpan data ucapan baru
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        // Mengembalikan respons jika terjadi kesalahan saat menjalankan query
        return res.json({ Error: "Error in running query" });
      }
      return res.json({ Status: "Successful" });
    });
  });
};

// Handler untuk mendapatkan semua ucapan
const getAllUcapan = (req, res) => {
  // Query untuk mendapatkan semua data ucapan dari tabel "ucapanlurah"
  const sqlQuery = "SELECT * FROM tb_pesan_lurah";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      // Mengembalikan respons jika terjadi kesalahan saat menjalankan query
      return res.json({ Error: "Get Ucapan error in SQL" });
    }
    return res.json({ Status: "Success", Result: result });
  });
};

// Handler untuk menghapus ucapan berdasarkan ID
const deleteUcapan = (req, res) => {
  const id = req.params.id;
  // Query untuk menghapus ucapan berdasarkan ID dari tabel "ucapanlurah"
  const sqlQuery = "DELETE FROM tb_pesan_lurah WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      // Mengembalikan respons jika terjadi kesalahan saat menjalankan query
      return res
        .status(500)
        .json({ Status: "Error", Error: "Error deleting Ucapan", err });
    }
    if (result.affectedRows === 0) {
      // Mengembalikan respons jika ucapan tidak ditemukan
      return res
        .status(404)
        .json({ Status: "Error", Error: "Ucapan not found" });
    }
    return res.json({ Status: "Success" });
  });
};

// Handler untuk memperbarui ucapan berdasarkan ID
const updateUcapan = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }
    const id = req.params.id;
    let sqlQuery = "UPDATE tb_pesan_lurah SET pesan = ?";
    let values = [req.body.pesan];

    // Jika ada gambar yang diunggah, tambahkan pemrosesan gambar
    if (req.file) {
      sqlQuery += ", image = ?";
      values.push(req.file.filename);
    }

    sqlQuery += " WHERE id = ?";
    values.push(id);

    // Menjalankan query untuk memperbarui data ucapan
    db.query(sqlQuery, values, (err, result) => {
      if (err) return res.json({ Error: "Update Ucapan error in SQL" });
      return res.json({ Status: "Successful" });
    });
  });
};

// Handler untuk mendapatkan ucapan berdasarkan ID
const getById = (req, res) => {
  const id = req.params.id;
  const sqlQuery = "SELECT * FROM tb_pesan_lurah WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) return res.json({ Error: "Get Ucapan Error" });
    return res.json({ Status: "Success", Result: result });
  });
};

// Mengekspor fungsi-fungsi yang didefinisikan di atas untuk digunakan pada modul lainnya
module.exports = {
  createUcapan,
  getAllUcapan,
  deleteUcapan,
  updateUcapan,
  getById,
};
