const db = require("../config/database");
const moment = require("moment-timezone");
const path = require("path");
const multer = require("multer");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    cb(null, "image_" + Date.now() + extname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

function generateRandomId() {
  return crypto
    .createHash("sha256")
    .update(Date.now().toString())
    .digest("hex");
}

function generateUniqueNumber() {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 8);
  const uniqueNumber = timestamp.substring(timestamp.length - 6) + randomPart;
  return uniqueNumber.substring(0, 10);
}

const createDomisiliUsaha = (req, res) => {
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
      // nip,
      alamat_kantor,
      nama_usaha,
      alamat_perusahan,
      jenis_usaha,
      nama_pempinan,
      ktp,
      alamat,
      no_telepon,
      email,
      keperluan,
    } = req.body;

    const ktp_image = req.file ? req.file.filename : null;
    const nomor_surat = generateUniqueNumber();
    const sqlQuery = `
    INSERT INTO surat_domisili_usaha
    (nama, tanggal, alamat_kantor, nama_usaha, alamat_perusahan, jenis_usaha, nama_pempinan, ktp, alamat, status_admin, keperluan, ktp_image, no_telepon, email, jenis_surat, hashed_id, nomor_surat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'menunggu', ?, ?, ?, ?, 'Surat Keterangan Domisili', ?, ?)
  `;
    const tanggal = moment().tz("Asia/Jayapura").format("YYYY-MM-DD");
    const newId = generateRandomId();
    const hashedId = newId;
    const values = [
      nama,
      // nip,
      tanggal,
      alamat_kantor,
      nama_usaha,
      alamat_perusahan,
      jenis_usaha,
      nama_pempinan,
      ktp,
      alamat,
      keperluan,
      ktp_image,
      no_telepon,
      email,
      hashedId,
      nomor_surat,
    ];

    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      console.log("Data saved to database with ID:");

      return res.json({
        message: "surat_domisili_usaha created successfully",
        newId,
        redirectUrl: `/download/${newId}`,
      });
    });
  });
};

const createDomisiliUsahaDiterima = (req, res) => {
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
      // nip,
      alamat_kantor,
      nama_usaha,
      alamat_perusahan,
      jenis_usaha,
      nama_pempinan,
      ktp,
      alamat,
      no_telepon,
      email,
      keperluan,
    } = req.body;

    const ktp_image = req.file ? req.file.filename : null;
    const nomor_surat = generateUniqueNumber();
    const sqlQuery = `
    INSERT INTO surat_domisili_usaha
    (nama, tanggal, alamat_kantor, nama_usaha, alamat_perusahan, jenis_usaha, nama_pempinan, ktp, alamat, status_admin, keperluan, ktp_image, no_telepon, email, jenis_surat, hashed_id, nomor_surat)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'diterima', ?, ?, ?, ?, 'Surat Keterangan Domisili', ?, ?)
  `;
    const tanggal = moment().tz("Asia/Jayapura").format("YYYY-MM-DD");
    const newId = generateRandomId();
    const hashedId = newId;
    const values = [
      nama,
      // nip,
      tanggal,
      alamat_kantor,
      nama_usaha,
      alamat_perusahan,
      jenis_usaha,
      nama_pempinan,
      ktp,
      alamat,
      keperluan,
      ktp_image,
      no_telepon,
      email,
      hashedId,
      nomor_surat,
    ];

    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      console.log("Data saved to database with ID:");

      return res.json({
        message: "surat_domisili_usaha created successfully",
        newId,
        redirectUrl: `/download/${newId}`,
      });
    });
  });
};

const getByNomorSuratUsaha = (req, res) => {
  const { nomor_surat } = req.params;

  const sqlQuery = `
    SELECT * FROM surat_domisili_usaha
    WHERE nomor_surat = ?
  `;

  db.query(sqlQuery, nomor_surat, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error:
          "surat domisili usaha dengan nomor surat ini tidak ada atau status admin belum diterima",
      });
    }

    const data = result[0];

    return res.json({
      message: "surat domisili usaha data retrieved successfully",
      data,
    });
  });
};

const getDomisiliUsahaAdmin = (req, res) => {
  const { id } = req.params;

  const sqlQuery = `
    SELECT * FROM surat_domisili_usaha
    WHERE id = ?
  `;

  db.query(sqlQuery, id, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error:
          "surat domisili usaha dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    const data = result[0];

    return res.json({
      message: "surat domisili usaha data retrieved successfully",
      data,
    });
  });
};

const getDomisiliUsaha = (req, res) => {
  const { hashed_id } = req.params;

  const sqlQuery = `
    SELECT * FROM surat_domisili_usaha
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
          "surat domisili usaha dengan hashed_id ini tidak ada atau status admin belum diterima",
      });
    }

    const data = result[0];

    return res.json({
      message: "surat domisili usaha data retrieved successfully",
      data,
    });
  });
};

const updateDomisiliUsahaAll = (req, res) => {
  const { id } = req.params;
  const {
    nama,
    // nip,
    alamat_kantor,
    nama_usaha,
    alamat_perusahan,
    jenis_usaha,
    nama_pempinan,
    ktp,
    alamat,
    status_admin,
    no_telepon,
    email,
    keperluan,
  } = req.body;

  const sqlQuery = `
    UPDATE surat_domisili_usaha 
    SET 
      nama = ?, 
      alamat_kantor = ?, 
      nama_usaha = ?, 
      alamat_perusahan = ?, 
      jenis_usaha = ?, 
      nama_pempinan = ?, 
      ktp = ?, 
      alamat = ?, 
      status_admin = ?, 
      no_telepon = ?, 
      email = ?, 
      keperluan = ?
    WHERE id = ?`;

  db.query(
    sqlQuery,
    [
      nama,
      // nip,
      alamat_kantor,
      nama_usaha,
      alamat_perusahan,
      jenis_usaha,
      nama_pempinan,
      ktp,
      alamat,
      status_admin,
      no_telepon,
      email,
      keperluan,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error:
            "surat domisili usaha dengan id ini tidak ada atau status admin belum diterima",
        });
      }

      return res.json({
        message: "surat domisili usaha updated successfully",
      });
    }
  );
};

const updateStatusDomisiliUsaha = (req, res) => {
  const { id } = req.params;
  const { status_admin } = req.body;

  const sqlQuery = `
    UPDATE surat_domisili_usaha 
    SET 
      status_admin = ?
    WHERE id = ?`;

  db.query(sqlQuery, [status_admin, id], (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error:
          "surat domisili usaha dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    return res.json({
      message: "Status admin surat domisili usaha updated successfully",
    });
  });
};

const updateDomisiliUsahaAllUser = (req, res) => {
  const { hashed_id } = req.params;
  const {
    nama,
    // nip,
    alamat_kantor,
    nama_usaha,
    alamat_perusahan,
    jenis_usaha,
    nama_pempinan,
    ktp,
    alamat,
    no_telepon,
    email,
    keperluan,
  } = req.body;

  const sqlQuery = `
    UPDATE surat_domisili_usaha 
    SET 
      nama = ?,  
      alamat_kantor = ?, 
      nama_usaha = ?, 
      alamat_perusahan = ?, 
      jenis_usaha = ?, 
      nama_pempinan = ?, 
      ktp = ?, 
      alamat = ?,  
      no_telepon = ?, 
      email = ?, 
      keperluan = ?
    WHERE hashed_id = ?`;

  db.query(
    sqlQuery,
    [
      nama,
      // nip,
      alamat_kantor,
      nama_usaha,
      alamat_perusahan,
      jenis_usaha,
      nama_pempinan,
      ktp,
      alamat,
      no_telepon,
      email,
      keperluan,
      hashed_id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error:
            "surat domisili usaha dengan hashed_id ini tidak ada atau status admin belum diterima",
        });
      }

      return res.json({
        message: "surat domisili usaha updated successfully",
      });
    }
  );
};

const updateDomisiliUsahaByHashedId = (req, res) => {
  const { hashed_id } = req.params;
  const { no_telepon, email, keperluan } = req.body;

  const sqlQuery = `
    UPDATE surat_domisili_usaha 
    SET 
      no_telepon = ?, 
      email = ?,
      keperluan = ?
    WHERE hashed_id = ?`;

  db.query(
    sqlQuery,
    [no_telepon, email, keperluan, hashed_id],
    (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error:
            "surat domisili usaha dengan hashed_id ini tidak ada atau status admin belum diterima",
        });
      }

      return res.json({
        message: "surat domisili usaha updated successfully",
      });
    }
  );
};

const deleteDomisiliUsaha = (req, res) => {
  const { id } = req.params;

  const sqlQuery = `
    DELETE FROM surat_domisili_usaha 
    WHERE id = ?`;

  db.query(sqlQuery, id, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error:
          "surat domisili usaha dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    return res.json({
      message: "surat domisili usaha deleted successfully",
    });
  });
};

const getDomisiliUsahaMenunggu = (req, res) => {
  const sqlQuery = `
    SELECT * FROM surat_domisili_usaha
    WHERE status_admin = 'menunggu'
  `;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({
      message:
        "Data surat domisili usaha yang menunggu persetujuan berhasil diambil",
      data: result,
    });
  });
};

const getDomisiliUsahaTerima = (req, res) => {
  const sqlQuery = `
    SELECT * FROM surat_domisili_usaha
    WHERE status_admin = 'diterima'
  `;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        message: "semua data: ",
        result,
      });
    }

    return res.json({
      message: "Data surat domisili usaha yang telah diterima berhasil diambil",
      data: result,
    });
  });
};

const updateStatusDomisiliUsahaDiterima = (req, res) => {
  const { id } = req.params;

  const sqlQuery = `
    UPDATE surat_domisili_usaha 
    SET 
      status_admin = 'diterima'
    WHERE id = ?`;

  db.query(sqlQuery, id, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error:
          "surat domisili usaha dengan id ini tidak ada atau status admin belum diterima",
      });
    }

    return res.json({
      message:
        "Status admin surat domisili usaha updated to diterima successfully",
    });
  });
};

// Ekspor semua fungsi controller
module.exports = {
  createDomisiliUsahaDiterima,
  createDomisiliUsaha,
  getByNomorSuratUsaha,
  getDomisiliUsahaAdmin,
  getDomisiliUsaha,
  updateDomisiliUsahaAll,
  updateDomisiliUsahaByHashedId,
  updateDomisiliUsahaAllUser,
  deleteDomisiliUsaha,
  getDomisiliUsahaMenunggu,
  getDomisiliUsahaTerima,
  updateStatusDomisiliUsahaDiterima,
};
