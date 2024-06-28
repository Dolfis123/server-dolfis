const multer = require("multer");
const path = require("path");
const db = require("../config/database");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

const createNews = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }
    const { title, content, author, category, tags, status } = req.body;
    const image_url = req.file ? req.file.filename : null;

    const sqlQuery =
      "INSERT INTO news (title, content, author, category, tags, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [title, content, author, category, tags, image_url, status];

    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        return res.json({ Error: "Error in running query" });
      }
      return res.json({ Status: "Successful" });
    });
  });
};

const getAllNews = (req, res) => {
  const sqlQuery = "SELECT * FROM news";
  db.query(sqlQuery, (err, result) => {
    if (err) {
      return res.json({ Error: "Get News error in SQL" });
    }
    return res.json({ Status: "Success", Result: result });
  });
};

const deleteNews = (req, res) => {
  const id = req.params.id;
  const sqlQuery = "DELETE FROM news WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      return res
        .status(500)
        .json({ Status: "Error", Error: "Error deleting news", err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ Status: "Error", Error: "News not found" });
    }
    return res.json({ Status: "Success" });
  });
};

const updateNews = (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      return res.status(400).json({ error: "Error uploading file" });
    }
    const id = req.params.id;
    const { title, content, author, category, tags, status } = req.body;
    let sqlQuery =
      "UPDATE news SET title = ?, content = ?, author = ?, category = ?, tags = ?, status = ?";
    let values = [title, content, author, category, tags, status];

    if (req.file) {
      sqlQuery += ", image_url = ?";
      values.push(req.file.filename);
    }

    sqlQuery += " WHERE id = ?";
    values.push(id);

    db.query(sqlQuery, values, (err, result) => {
      if (err) return res.json({ Error: "Update News error in SQL" });
      return res.json({ Status: "Successful" });
    });
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  const sqlQuery = "SELECT * FROM news WHERE id = ?";
  db.query(sqlQuery, [id], (err, result) => {
    if (err) return res.json({ Error: "Get News Error" });
    return res.json({ Status: "Success", Result: result });
  });
};

module.exports = {
  createNews,
  getAllNews,
  deleteNews,
  updateNews,
  getById,
};
