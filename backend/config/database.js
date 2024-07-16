const mysql = require("mysql");

// Konfigurasi koneksi database
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

// Buat koneksi ke database menggunakan konfigurasi yang telah ditentukan
const connection = mysql.createConnection(dbConfig);

// Cek apakah koneksi berhasil atau tidak
connection.connect((err) => {
  if (err) {
    console.error("Koneksi ke database gagal:", err.message);
  } else {
    console.log("Koneksi ke database berhasil!");
  }
});

// Ekspor objek koneksi agar dapat digunakan di modul lain
module.exports = connection;
