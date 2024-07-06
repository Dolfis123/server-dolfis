// Mengimpor modul database untuk koneksi ke database
const db = require("../config/database");
const moment = require("moment-timezone"); // Mengimpor modul moment-timezone untuk manajemen waktu
const path = require("path"); // Mengimpor modul path untuk penanganan path file
const multer = require("multer"); // Mengimpor modul multer untuk menangani upload file
const crypto = require("crypto"); // Mengimpor modul crypto untuk pembuatan id acak
const { v4: uuidv4 } = require("uuid");

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads"); // Folder penyimpanan gambar
  },
  filename: (req, file, cb) => {
    // Buat nama unik untuk file gambar
    const extname = path.extname(file.originalname);
    cb(null, "image_" + Date.now() + extname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB dalam bytes
});

// Fungsi untuk menghasilkan ID acak
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

// Fungsi untuk membuat surat domisili baru
const createDomisili = (req, res) => {
  upload.single("ktp_image")(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "Ukuran file tidak boleh lebih dari 5 MB" });
    } else if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }
    const {
      nama,
      tempat_lahir,
      ttl,
      jk,
      agama,
      pekerjaan,
      alamat,
      rt_rw,
      ktp,
    } = req.body;

    // Dapatkan nama file gambar dari req.file
    const ktp_image = req.file ? req.file.filename : null;

    // Generate nomor surat unik menggunakan fungsi generateUniqueNumber
    const nomor_surat = generateUniqueNumber();

    // Query untuk menyimpan data surat domisili ke database
    const sqlQuery = `
    INSERT INTO surat_ket_domisili_umum
    (nama, tanggal, tempat_lahir, ttl, jk, agama, pekerjaan, alamat, rt_rw, ktp, ktp_image, status_admin, hashed_id, nomor_surat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'menunggu', ?, ?)
  `;

    // Gunakan moment-timezone untuk mendapatkan tanggal sesuai dengan zona waktu lokal
    const tanggal = moment().tz("Asia/Jayapura").format("YYYY-MM-DD");

    const newId = generateRandomId(); // Generate ID acak
    const hashedId = newId; // Gunakan ID acak sebagai hashed_id

    const values = [
      nama,
      tanggal,
      tempat_lahir,
      ttl,
      jk,
      agama,
      pekerjaan,
      alamat,
      rt_rw,
      ktp,
      ktp_image,
      hashedId, // Tambahkan hashedId ke dalam values
      nomor_surat,
    ];

    // Jalankan query dan tangani respons
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      console.log("Data saved to database with ID:");

      // Sertakan ID yang di-hash dalam respons ke klien
      return res.json({
        message: "surat_ket-domisili created successfully",
        newId,
        redirectUrl: `/download/${newId}`, // Contoh URL dengan ID acak
      });
    });
  });
};

// Fungsi untuk mendapatkan surat domisili berdasarkan nomor surat
const getByNomorSurat = (req, res) => {
  const { nomor_surat } = req.params;

  // Query untuk mendapatkan data surat domisili berdasarkan nomor surat
  const sqlQuery = `
    SELECT * FROM surat_ket_domisili_umum
    WHERE nomor_surat = ?
  `;

  // Jalankan query dan tangani respons
  db.query(sqlQuery, nomor_surat, (err, result) => {
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

// Fungsi untuk mendapatkan surat domisili berdasarkan ID
const getDomisiliAdmin = (req, res) => {
  const { id } = req.params;

  // Query untuk mendapatkan data surat domisili berdasarkan ID
  const sqlQuery = `
    SELECT * FROM surat_ket_domisili_umum
    WHERE id = ?
  `;

  // Jalankan query dan tangani respons
  db.query(sqlQuery, id, (err, result) => {
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

// Fungsi untuk mendapatkan surat domisili berdasarkan hashed ID
const getDomisili = (req, res) => {
  const { hashed_id } = req.params;

  // Query untuk mendapatkan data surat domisili berdasarkan hashed ID
  const sqlQuery = `
    SELECT * FROM surat_ket_domisili_umum
    WHERE hashed_id = ?
  `;

  // Jalankan query dan tangani respons
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

// Fungsi untuk memperbarui semua data surat domisili berdasarkan ID
const updateDomisiliAll = (req, res) => {
  const { id } = req.params;
  const {
    nama,
    tempat_lahir,
    ttl,
    jk,
    agama,
    pekerjaan,
    alamat,
    rt_rw,
    status_admin,
    ktp,
    no_telepon,
    email,
    keperluan,
  } = req.body;

  // Query untuk memperbarui semua data surat domisili berdasarkan ID
  const sqlQuery = `
    UPDATE surat_ket_domisili_umum
    SET 
      nama = ?, 
      ttl = ?, 
      tempat_lahir = ?, 
      jk = ?, 
      agama = ?, 
      pekerjaan = ?, 
      alamat = ?, 
      rt_rw = ?, 
      status_admin = ?,
      ktp = ?,  
      no_telepon = ?, 
      email = ?, 
      keperluan = ?
    WHERE id = ?`;

  // Jalankan query dan tangani respons
  db.query(
    sqlQuery,
    [
      nama,
      ttl,
      tempat_lahir,
      jk,
      agama,
      pekerjaan,
      alamat,
      rt_rw,
      status_admin,
      ktp,
      no_telepon,
      email,
      keperluan,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating all domisili: ", err);
        return res.status(500).json({ error: "Error updating all domisili" });
      }

      return res.json({
        message: "all domisili updating successfully",
        updatedId: id,
      });
    }
  );
};

// Fungsi untuk memperbarui semua data surat domisili berdasarkan ID
const updateDomisiliAllUser = (req, res) => {
  const { hashed_id } = req.params;
  const {
    nama,
    tempat_lahir,
    ttl,
    jk,
    agama,
    pekerjaan,
    alamat,
    rt_rw,
    ktp,
    no_telepon,
    email,
    keperluan,
  } = req.body;

  // Query untuk memperbarui semua data surat domisili berdasarkan ID
  const sqlQuery = `
    UPDATE surat_ket_domisili_umum
    SET 
      nama = ?, 
      ttl = ?, 
      tempat_lahir = ?, 
      jk = ?, 
      agama = ?, 
      pekerjaan = ?, 
      alamat = ?, 
      rt_rw = ?, 
      ktp = ?,  
      no_telepon = ?, 
      email = ?, 
      keperluan = ?
    WHERE hashed_id = ?`;

  // Jalankan query dan tangani respons
  db.query(
    sqlQuery,
    [
      nama,
      ttl,
      tempat_lahir,
      jk,
      agama,
      pekerjaan,
      alamat,
      rt_rw,
      ktp,
      no_telepon,
      email,
      keperluan,
      hashed_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating all domisili: ", err);
        return res.status(500).json({ error: "Error updating all domisili" });
      }

      return res.json({
        message: "all domisili updating successfully",
        updatedId: hashed_id,
      });
    }
  );
};

// Fungsi untuk memperbarui nomor telepon, email, dan keperluan surat domisili berdasarkan hashed ID
const updateDomisiliByHashedId = (req, res) => {
  const { hashed_id } = req.params;
  const { no_telepon, email, keperluan } = req.body;

  // Query untuk memperbarui nomor telepon, email, dan keperluan surat domisili berdasarkan hashed ID
  const sqlQuery = `
    UPDATE surat_ket_domisili_umum
    SET no_telepon = ?, email = ?, keperluan = ?
    WHERE hashed_id = ?
  `;

  // Jalankan query dan tangani respons
  db.query(
    sqlQuery,
    [no_telepon, email, keperluan, hashed_id],
    (err, result) => {
      if (err) {
        console.error("Error updating nomor and email");
        return res
          .status(500)
          .json({ error: "Error updating nomor and email" });
      }
      return res.json({
        message: "nomor and email updating successfullt",
        updatedId: hashed_id,
      });
    }
  );
};

// Fungsi untuk mengubah status_admin surat domisili menjadi 'diterima' berdasarkan ID
const updateStatusDomisilDiterima = (req, res) => {
  const { id } = req.params;

  // Query untuk mengubah status_admin surat domisili menjadi 'diterima' berdasarkan ID
  const sqlQuery = `
    UPDATE surat_ket_domisili_umum
    SET status_admin = 'diterima'
    WHERE id = ?
  `;

  // Jalankan query dan tangani respons
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json({ error: "Error updating status" });
    }

    return res.json({ message: "Status updated successfully", updatedId: id });
  });
};

// Fungsi untuk mendapatkan surat domisili dengan status menunggu persetujuan admin
const getDomisiliMenunggu = (req, res) => {
  // Query untuk mendapatkan surat domisili dengan status menunggu persetujuan admin
  const sqlQuery = `
    SELECT * FROM surat_ket_domisili_umum where status_admin = 'menunggu'
  `;

  // Jalankan query dan tangani respons
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({
      message: "All surat_tidak_mampu data retrieved successfully",
      skckData: result,
    });
  });
};

// Fungsi untuk mendapatkan surat domisili yang telah disetujui oleh admin
const getDomisiliTerima = (req, res) => {
  // Query untuk mendapatkan surat domisili yang telah disetujui oleh admin
  const sqlQuery = `
    SELECT * FROM surat_ket_domisili_umum where status_admin = 'diterima'
  `;

  // Jalankan query dan tangani respons
  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({
      message: "All surat_tidak_mampu data retrieved successfully",
      skckData: result,
    });
  });
};

// Fungsi untuk menghapus surat domisili berdasarkan ID
const deleteDomisili = (req, res) => {
  const { id } = req.params;

  // Query untuk menghapus surat domisili berdasarkan ID
  const sqlQuery = `
    DELETE FROM  surat_ket_domisili_umum
    WHERE id = ?
  `;

  // Jalankan query dan tangani respons
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({ message: "SKCK deleted successfully", deletedId: id });
  });
};

// Mengekspor semua fungsi agar dapat digunakan di luar modul ini
module.exports = {
  createDomisili,
  getDomisili,
  getDomisiliMenunggu,
  getDomisiliTerima,
  deleteDomisili,
  updateStatusDomisilDiterima,
  updateDomisiliByHashedId,
  updateDomisiliAllUser,
  updateDomisiliAll,
  getDomisiliAdmin,
  getByNomorSurat,
};
