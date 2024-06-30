const mysql = require("mysql2");

// Konfigurasi koneksi database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_lurah_sowi",
});

// Connect ke database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

exports.getPolygons = (req, res) => {
  const sql = "SELECT * FROM polygons";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
};

exports.addPolygon = (req, res) => {
  const { name, coordinates } = req.body;
  try {
    // Pastikan koordinat adalah array JSON yang valid
    const parsedCoordinates = Array.isArray(coordinates)
      ? coordinates
      : JSON.parse(coordinates);

    if (!Array.isArray(parsedCoordinates)) {
      throw new Error("Coordinates should be an array");
    }

    // Simpan data ke database
    const sql = "INSERT INTO polygons (name, coordinates) VALUES (?, ?)";
    db.query(sql, [name, JSON.stringify(parsedCoordinates)], (err, result) => {
      if (err) throw err;
      res.json({ id: result.insertId, name, coordinates: parsedCoordinates });
    });
  } catch (error) {
    console.error("Invalid coordinates:", error.message);
    res.status(400).json({ error: "Invalid coordinates format" });
  }
};
