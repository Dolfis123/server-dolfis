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

// Controller function untuk membuat surat keterangan KTP baru
const createSuratKk = (req, res) => {
  // Handle file upload using multer middleware
  upload.single("ktp_image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }
    const {
      nama,
      jenis_kelamin,
      ttl,
      agama,
      status_perkawinan,
      pekerjaan,
      alamat,
      rt_rw,
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
    INSERT INTO surat_ket_kk
    (nama, tanggal, jenis_kelamin, ttl, agama, pekerjaan, alamat, rt_rw, status_perkawinan, status_admin, keperluan, ktp_image, no_telepon, email, jenis_surat, hashed_id, nomor_surat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'menunggu', ?, ?, ?, ?, 'Surat Keterangan KTP', ?, ?)
  `;

    // Get local timezone date using moment-timezone
    const tanggal = moment().tz("Asia/Jayapura").format("YYYY-MM-DD");

    const newId = generateRandomId(); // Generate random ID
    const hashedId = newId; // Use random ID as hashed_id

    const values = [
      nama,
      tanggal,
      jenis_kelamin,
      ttl,
      agama,
      status_perkawinan,
      pekerjaan,
      alamat,
      rt_rw,
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
        message: "surat_ket_ktp created successfully",
        newId,
        redirectUrl: `/download/${newId}`, // Example URL with random ID
      });
    });
  });
};

// Controller function untuk mendapatkan surat domisili berdasarkan hashed_id
const getSuratKetKk = (req, res) => {
  const { hashed_id } = req.params;

  // SQL query to retrieve surat data based on hashed_id
  const sqlQuery = `
    SELECT * FROM surat_ket_kk
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
          "surat ket domisili dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    const data = result[0];

    return res.json({
      message: "surat ket domisili data retrieved successfully",
      data,
    });
  });
};

// Controller function untuk mendapatkan surat domisili admin berdasarkan ID
const getKetKkAdmin = (req, res) => {
  const { id } = req.params;

  // SQL query to retrieve surat data based on ID with status_admin 'diterima'
  const sqlQuery = `
    SELECT * FROM surat_ket_kk
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
          "surat ket domisili dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    const data = result[0];

    return res.json({
      message: "surat ket domisili data retrieved successfully",
      data,
    });
  });
};

// Controller function untuk mengupdate semua detail surat tidak mampu berdasarkan ID
const updateSuratKkAll = (req, res) => {
  const { id } = req.params;
  const {
    nama,
    ttl,
    jenis_kelamin,
    agama,
    status_perkawinan,
    pekerjaan,
    alamat,
    rt_rw,
    status_admin,
    no_telepon,
    email,
    keperluan,
    ktp_image,
  } = req.body;

  const sqlQuery = `
    UPDATE surat_ket_kk
    SET 
      nama = ?, 
      ttl = ?, 
      jenis_kelamin = ?, 
      agama = ?, 
      pekerjaan = ?, 
      status_perkawinan = ?,
      alamat = ?, 
      rt_rw = ?, 
      status_admin = ?,
      no_telepon = ?, 
      email = ?, 
      keperluan = ?,
      ktp_image = ?
    WHERE id = ?`;

  db.query(
    sqlQuery,
    [
      nama,
      ttl,
      jenis_kelamin,
      agama,
      status_perkawinan,
      pekerjaan,
      alamat,
      rt_rw,
      status_admin,
      no_telepon,
      email,
      keperluan,
      ktp_image,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating all surat_ket_ktp: ", err);
        return res
          .status(500)
          .json({ error: "Error updating all surat_ket_ktp" });
      }

      return res.json({
        message: "all surat_ket_ktp updated successfully",
        updatedId: id,
      });
    }
  );
};

// Controller function untuk mengupdate semua detail surat tidak mampu berdasarkan ID
const updateSuratKkAllUser = (req, res) => {
  const { hashed_id } = req.params;
  const {
    nama,
    ttl,
    jenis_kelamin,
    agama,
    status_perkawinan,
    pekerjaan,
    alamat,
    rt_rw,
    no_telepon,
    email,
    keperluan,
    ktp_image,
  } = req.body;

  const sqlQuery = `
    UPDATE surat_ket_kk
    SET 
      nama = ?, 
      ttl = ?, 
      jenis_kelamin = ?, 
      agama = ?, 
      status_perkawinan,
      pekerjaan = ?, 
      alamat = ?, 
      rt_rw = ?, 
      no_telepon = ?, 
      email = ?, 
      keperluan = ?,
      ktp_image = ?
    WHERE hashed_id = ?`;

  db.query(
    sqlQuery,
    [
      nama,
      ttl,
      jenis_kelamin,
      agama,
      status_perkawinan,
      pekerjaan,
      alamat,
      rt_rw,
      no_telepon,
      email,
      keperluan,
      ktp_image,
      hashed_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating all surat_ket_ktp: ", err);
        return res
          .status(500)
          .json({ error: "Error updating all surat_ket_ktp" });
      }

      return res.json({
        message: "all surat_ket_ktp updated successfully",
        updatedId: hashed_id,
      });
    }
  );
};

const updateEmailKetKk = (req, res) => {
  const { hashed_id } = req.params;
  const { no_telepon, email, keperluan } = req.body;

  const sqlQuery = `
    UPDATE surat_ket_kk
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
    UPDATE surat_ket_kk
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

const getSuratKkMenunggu = (req, res) => {
  const sqlQuery = `SELECT * FROM surat_ket_kk WHERE status_admin = 'menunggu'`;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res
        .status(404)
        .json({ skckData: [], message: "No pending surat_ket_ktp found" });
    }

    return res.json({
      message: "All surat_ket_ktp data retrieved successfully",
      skckData: result,
    });
  });
};

// Controller function untuk mendapatkan semua surat tidak mampu yang sudah diterima oleh admin
const getSuratKkTerima = (req, res) => {
  // SQL query untuk mendapatkan semua data surat tidak mampu
  const sqlQuery = `
    SELECT * FROM surat_ket_kk where status_admin = 'diterima'
  `;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({
      message: "All surat_ket_ktp data retrieved successfully",
      skckData: result,
    });
  });
};

// Controller function untuk menghapus surat tidak mampu berdasarkan ID
const deleteKetKk = (req, res) => {
  const { id } = req.params;

  // SQL query untuk menghapus surat tidak mampu berdasarkan ID
  const sqlQuery = `
    DELETE FROM surat_ket_kk
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
  createSuratKk,
  getSuratKetKk,
  getSuratKkMenunggu,
  getSuratKkTerima,
  deleteKetKk,
  updateStatusDiterima,
  updateEmailKetKk,
  updateSuratKkAll,
  getKetKkAdmin,
  updateSuratKkAllUser,
};
