const db = require("../config/database"); // Import database configuration
const moment = require("moment-timezone"); // Import moment-timezone library for date manipulation
const path = require("path"); // Import path module for file path manipulation
const multer = require("multer"); // Import multer for file uploads
const crypto = require("crypto"); // Import crypto for cryptographic functions
const { v4: uuidv4 } = require("uuid");

// Konfigurasi Multer untuk menyimpan file gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Set destination folder for storing images
  },
  filename: (req, file, cb) => {
    // Generate unique filename for the image file
    const extname = path.extname(file.originalname);
    cb(null, "image_" + Date.now() + extname);
  },
});

const upload = multer({ storage: storage }); // Initialize multer with the defined storage

// Fungsi untuk menghasilkan ID acak menggunakan hash sha256
function generateRandomId() {
  return crypto
    .createHash("sha256")
    .update(Date.now().toString())
    .digest("hex");
}

// Fungsi untuk menghasilkan nomor surat unik dengan panjang antara 6 hingga 10 karakter
function generateUniqueNumber() {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 8); // Menghasilkan string acak
  const uniqueNumber = timestamp.substring(timestamp.length - 6) + randomPart; // Gabungkan bagian dari timestamp dan randomPart
  return uniqueNumber.substring(0, 10); // Potong untuk mendapatkan panjang maksimal 10 karakter
}

// Controller function untuk membuat surat keterangan ahli waris baru
const createSuratAhliWaris = (req, res) => {
  // Handle file upload using multer middleware
  upload.single("ktp_image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }
    const {
      nama_pemberi,
      jenis_kelamin_pemberi,
      tempat_lahir_pemberi,
      tanggal_lahir_pemberi,
      pekerjaan_pemberi,
      agama_pemberi,
      alamat_pemberi,
      nama_penerima,
      jenis_kelamin_penerima,
      tempat_lahir_penerima,
      tanggal_lahir_penerima,
      pekerjaan_penerima,
      agama_penerima,
      alamat_penerima,
      keperluan,
      no_telepon,
      email,
    } = req.body;

    // Get image file name from req.file
    const ktp_image = req.file ? req.file.filename : null;

    // Generate unique 6-10 character length surat number
    const nomor_surat = generateUniqueNumber();

    // SQL query to insert data into database
    const sqlQuery = `
    INSERT INTO surat_ket_ahli_waris
    (nama_pemberi, tanggal, jenis_kelamin_pemberi, tempat_lahir_pemberi, tanggal_lahir_pemberi, pekerjaan_pemberi, agama_pemberi, alamat_pemberi, nama_penerima, jenis_kelamin_penerima, tempat_lahir_penerima, tanggal_lahir_penerima, pekerjaan_penerima, agama_penerima, alamat_penerima, keperluan, ktp_image, no_telepon, email, hashed_id, nomor_surat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    // Get local timezone date using moment-timezone
    const tanggal = moment().tz("Asia/Jayapura").format("YYYY-MM-DD");

    const newId = generateRandomId(); // Generate random ID
    const hashedId = newId; // Use random ID as hashed_id

    const values = [
      nama_pemberi,
      tanggal,
      jenis_kelamin_pemberi,
      tempat_lahir_pemberi,
      tanggal_lahir_pemberi,
      pekerjaan_pemberi,
      agama_pemberi,
      alamat_pemberi,
      nama_penerima,
      jenis_kelamin_penerima,
      tempat_lahir_penerima,
      tanggal_lahir_penerima,
      pekerjaan_penerima,
      agama_penerima,
      alamat_penerima,
      keperluan,
      ktp_image,
      no_telepon,
      email,
      hashedId, // Add hashedId to values
      nomor_surat,
    ];

    // Execute SQL query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      console.log("Data saved to database with ID:", newId);

      // Include hashed ID in response to client
      return res.json({
        message: "surat_ket_ahli_waris created successfully",
        newId,
        redirectUrl: `/download/${newId}`, // Example URL with random ID
      });
    });
  });
};

// Controller function untuk mendapatkan surat ahli waris berdasarkan hashed_id
const getSuratAhliWaris = (req, res) => {
  const { hashed_id } = req.params;

  // SQL query to retrieve surat data based on hashed_id
  const sqlQuery = `
    SELECT * FROM surat_ket_ahli_waris
    WHERE hashed_id = ?
  `;

  db.query(sqlQuery, [hashed_id], (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error:
          "surat ket ahli waris dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    const data = result[0];

    return res.json({
      message: "surat ket ahli waris data retrieved successfully",
      data,
    });
  });
};

// Controller function untuk mendapatkan surat ahli waris admin berdasarkan ID
const getAhliWarisAdmin = (req, res) => {
  const { id } = req.params;

  // SQL query to retrieve surat data based on ID with status_admin 'diterima'
  const sqlQuery = `
    SELECT * FROM surat_ket_ahli_waris
    WHERE id = ?
  `;

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error:
          "surat ket ahli waris dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    const data = result[0];

    return res.json({
      message: "surat ket ahli waris data retrieved successfully",
      data,
    });
  });
};

// Controller function untuk mengupdate semua detail surat ahli waris berdasarkan ID
const updateSuratAhliWarisAll = (req, res) => {
  const { id } = req.params;
  const {
    nama_pemberi,
    jenis_kelamin_pemberi,
    tempat_lahir_pemberi,
    tanggal_lahir_pemberi,
    pekerjaan_pemberi,
    agama_pemberi,
    alamat_pemberi,
    nama_penerima,
    jenis_kelamin_penerima,
    tempat_lahir_penerima,
    tanggal_lahir_penerima,
    pekerjaan_penerima,
    agama_penerima,
    alamat_penerima,
    keperluan,
    ktp_image,
    no_telepon,
    email,
    status_admin,
  } = req.body;

  const sqlQuery = `
    UPDATE surat_ket_ahli_waris
    SET 
      nama_pemberi = ?, 
      jenis_kelamin_pemberi = ?, 
      tempat_lahir_pemberi = ?, 
      tanggal_lahir_pemberi = ?, 
      pekerjaan_pemberi = ?, 
      agama_pemberi = ?, 
      alamat_pemberi = ?, 
      nama_penerima = ?, 
      jenis_kelamin_penerima = ?, 
      tempat_lahir_penerima = ?, 
      tanggal_lahir_penerima = ?, 
      pekerjaan_penerima = ?, 
      agama_penerima = ?, 
      alamat_penerima = ?, 
      keperluan = ?, 
      ktp_image = ?, 
      no_telepon = ?, 
      email = ?, 
      status_admin = ?
    WHERE id = ?`;

  db.query(
    sqlQuery,
    [
      nama_pemberi,
      jenis_kelamin_pemberi,
      tempat_lahir_pemberi,
      tanggal_lahir_pemberi,
      pekerjaan_pemberi,
      agama_pemberi,
      alamat_pemberi,
      nama_penerima,
      jenis_kelamin_penerima,
      tempat_lahir_penerima,
      tanggal_lahir_penerima,
      pekerjaan_penerima,
      agama_penerima,
      alamat_penerima,
      keperluan,
      ktp_image,
      no_telepon,
      email,
      status_admin,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating all surat_ket_ahli_waris: ", err);
        return res
          .status(500)
          .json({ error: "Error updating all surat_ket_ahli_waris" });
      }

      return res.json({
        message: "all surat_ket_ahli_waris updated successfully",
        updatedId: id,
      });
    }
  );
};

// Controller function untuk mengupdate nomor telepon dan email surat ahli waris berdasarkan hashed_id
const updateEmailAhliWaris = (req, res) => {
  const { hashed_id } = req.params;
  const { no_telepon, email, keperluan } = req.body;

  const sqlQuery = `
    UPDATE surat_ket_ahli_waris
    SET no_telepon = ?, email = ?, keperluan = ?
    WHERE hashed_id = ?
  `;

  db.query(
    sqlQuery,
    [no_telepon, email, keperluan, hashed_id],
    (err, result) => {
      if (err) {
        console.error("Error updating nomor and email:", err);
        return res
          .status(500)
          .json({ error: "Error updating nomor and email" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "No record found with given hashed_id" });
      }
      return res.json({
        message: "nomor and email updated successfully",
        updatedId: hashed_id,
      });
    }
  );
};

// Controller function untuk mengupdate status surat menjadi 'diterima' berdasarkan ID
const updateStatusDiterima = (req, res) => {
  const { id } = req.params;

  // SQL query untuk mengubah status_admin menjadi 'diterima'
  const sqlQuery = `
    UPDATE surat_ket_ahli_waris
    SET status_admin = 'diterima'
    WHERE id = ?
  `;

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json({ error: "Error updating status" });
    }

    return res.json({ message: "Status updated successfully", updatedId: id });
  });
};

const getSuratAhliWarisMenunggu = (req, res) => {
  const sqlQuery = `SELECT * FROM surat_ket_ahli_waris WHERE status_admin = 'menunggu'`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        skckData: [],
        message: "No pending surat_ket_ahli_waris found",
      });
    }

    return res.json({
      message: "All surat_ket_ahli_waris data retrieved successfully",
      skckData: result,
    });
  });
};

// Controller function untuk mendapatkan semua surat ahli waris yang sudah diterima oleh admin
const getSuratAhliWarisTerima = (req, res) => {
  // SQL query untuk mendapatkan semua data surat ahli waris
  const sqlQuery = `
    SELECT * FROM surat_ket_ahli_waris where status_admin = 'diterima'
  `;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({
      message: "All surat_ket_ahli_waris data retrieved successfully",
      skckData: result,
    });
  });
};

// Controller function untuk menghapus surat ahli waris berdasarkan ID
const deleteAhliWaris = (req, res) => {
  const { id } = req.params;

  // SQL query untuk menghapus surat ahli waris berdasarkan ID
  const sqlQuery = `
    DELETE FROM surat_ket_ahli_waris
    WHERE id = ?
  `;

  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({ message: "SKCK deleted successfully", deletedId: id });
  });
};

module.exports = {
  createSuratAhliWaris,
  getSuratAhliWaris,
  getSuratAhliWarisMenunggu,
  getSuratAhliWarisTerima,
  deleteAhliWaris,
  updateStatusDiterima,
  updateEmailAhliWaris,
  updateSuratAhliWarisAll,
  getAhliWarisAdmin,
};
