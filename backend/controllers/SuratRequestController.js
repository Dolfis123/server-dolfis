const db = require("../config/database");

exports.getAllRequests = async (req, res) => {
  try {
    const [rows1] = await db.query(`
      SELECT 
          id,
          nama,
          no_telepon,
          email,
          tanggal,
          'surat_tidak_mampu' AS jenis_surat,
          jenis_kelamin,
          tempat_lahir,
          tempat_tanggal_lahir,
          agama,
          pekerjaan,
          alamat,
          rt_rw,
          status_admin,
          keperluan,
          ktp,
          ktp_image,
          pdf_path,
          hashed_id,
          nomor_surat
      FROM 
          surat__ket_tidak_mampu
    `);

    const [rows2] = await db.query(`
      SELECT 
          id,
          nama,
          no_telepon,
          email,
          tanggal,
          'surat_domisili' AS jenis_surat,
          jk AS jenis_kelamin,
          tempat_lahir,
          ttl AS tempat_tanggal_lahir,
          agama,
          pekerjaan,
          alamat,
          rt_rw,
          status_admin,
          keperluan,
          ktp,
          ktp_image,
          NULL AS pdf_path,
          hashed_id,
          nomor_surat
      FROM 
          surat_ket_domisili_umum
    `);

    if (!Array.isArray(rows1) || !Array.isArray(rows2)) {
      throw new TypeError("Data yang diterima bukan array");
    }

    const rows = [...rows1, ...rows2];

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching requests" });
  }
};
