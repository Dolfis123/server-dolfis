const db = require("../config/database");
const multer = require("multer");

// Konfigurasi Multer untuk unggahan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images"); // Lokasi penyimpanan file gambar
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Penamaan file gambar
  },
});

// Filter untuk membatasi jenis file yang diterima
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg and .jpeg format allowed!"), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "image_rw"
);

// Controller untuk menambahkan data RW baru
const createRW = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading image:", err.message);
      return res.status(500).json({ message: "Failed to upload image." });
    }

    const {
      nama_RW,
      latLong,
      nama_ketua_rw,
      jumlah_pria,
      jumlah_wanita,
      jumlah_kk,
      no_hp,
      deskripsi,
    } = req.body;
    const image_rw = req.file ? req.file.filename : null; // Ambil nama file gambar jika diunggah

    const query =
      "INSERT INTO rw (nama_RW, latLong, nama_ketua_rw, image_rw, jumlah_pria, jumlah_wanita, jumlah_kk, no_hp, deskripsi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        nama_RW,
        latLong,
        nama_ketua_rw,
        image_rw,
        jumlah_pria,
        jumlah_wanita,
        jumlah_kk,
        no_hp,
        deskripsi,
      ],
      (err, result) => {
        if (err) {
          console.error("Failed to add RW:", err.message);
          return res.status(500).json({ message: "Failed to add RW." });
        }

        return res.status(201).send("New RW added");
      }
    );
  });
};

// Controller untuk memperbarui data RW
const updateRW = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error("Error uploading image:", err.message);
      return res.status(500).json({ message: "Failed to upload image." });
    }

    const {
      nama_RW,
      latLong,
      nama_ketua_rw,
      jumlah_pria,
      jumlah_wanita,
      jumlah_kk,
      no_hp,
      deskripsi,
    } = req.body;
    const { id } = req.params;
    const image_rw = req.file ? req.file.filename : null; // Ambil nama file gambar jika diunggah

    const query =
      "UPDATE rw SET nama_RW = ?, latLong = ?, nama_ketua_rw = ?, image_rw = ?, jumlah_pria = ?, jumlah_wanita = ?, jumlah_kk = ?, no_hp = ?, deskripsi = ? WHERE id_RW = ?";
    db.query(
      query,
      [
        nama_RW,
        latLong,
        nama_ketua_rw,
        image_rw,
        jumlah_pria,
        jumlah_wanita,
        jumlah_kk,
        no_hp,
        deskripsi,
        id,
      ],
      (err, result) => {
        if (err) {
          console.error("Failed to update RW:", err.message);
          return res.status(500).json({ message: "Failed to update RW." });
        }

        return res.status(200).send("RW updated");
      }
    );
  });
};

// Controller untuk menghapus data RW
const deleteRW = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM rw WHERE id_RW = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Gagal menghapus RW:", err.message);
      return res.status(500).json({ message: "Gagal menghapus RW." });
    }

    return res.status(200).send("RW deleted");
  });
};

// Controller untuk mendapatkan data RW berdasarkan ID
const getRWById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM rw WHERE id_RW = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Gagal mendapatkan data RW:", err.message);
      return res.status(500).json({ message: "Gagal mendapatkan data RW." });
    }
    if (result.length === 0) {
      console.log("Data RW tidak ditemukan");
      return res.status(404).json({ message: "Data RW tidak ditemukan." });
    }
    return res.status(200).json(result[0]);
  });
};
// Controller untuk mendapatkan semua data RW
const getAllRW = (req, res) => {
  const query = "SELECT * FROM rw";
  db.query(query, (err, result) => {
    if (err) {
      console.error("Gagal mendapatkan data rw:", err.message);
      return res.status(500).json({ message: "Gagal mendapatkan data rw." });
    }
    if (result.length === 0) {
      console.log("data nya kosong");
    }
    return res.status(200).json(result);
  });
};

// Controller untuk mencari RW atau RT berdasarkan nama RT atau latitude dan longitude
const searchRW = (req, res) => {
  const { query } = req.params;
  const searchQuery = "%" + query + "%"; // Gunakan wildcard untuk pencarian

  const searchSql = `
    SELECT * FROM rw 
    WHERE nama_RW LIKE ? OR nama_ketua_rw LIKE ? OR latLong LIKE ?;
  `;

  db.query(
    searchSql,
    [searchQuery, searchQuery, searchQuery],
    (err, result) => {
      if (err) {
        console.error("Failed to search RT:", err.message);
        return res.status(500).json({ message: "Failed to search RT." });
      }
      return res.status(200).json(result);
    }
  );
};
module.exports = {
  getAllRW,
  createRW,
  updateRW,
  deleteRW,
  getRWById,
  searchRW,
};
