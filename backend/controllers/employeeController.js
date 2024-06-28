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

const createEmployee = (req, res) => {
  upload.single("photo")(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      console.error("File size error:", err);
      return res
        .status(400)
        .json({ error: "Ukuran file tidak boleh lebih dari 5 MB" });
    } else if (err) {
      console.error("File upload error:", err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    const {
      full_name,
      nip,
      address,
      birth_date,
      phone_number,
      email,
      position,
      join_date,
      employment_status,
      department,
      gender,
      marital_status,
      education,
      blood_type,
      retirement_date,
      nationality,
    } = req.body;

    const photo = req.file ? req.file.filename : null;
    const employee_id = uuidv4();

    if (!full_name || !nip || !join_date || !employment_status) {
      console.error("Validation error: Missing required fields");
      return res.status(400).json({ error: "Missing required fields" });
    }

    const validGenders = ["Laki-laki", "Perempuan"];
    const validMaritalStatuses = ["Lajang", "Menikah", "Cerai"];
    const validBloodTypes = ["A", "B", "AB", "O"];

    if (gender && !validGenders.includes(gender)) {
      console.error("Validation error: Invalid gender value");
      return res.status(400).json({ error: "Invalid gender value" });
    }

    if (marital_status && !validMaritalStatuses.includes(marital_status)) {
      console.error("Validation error: Invalid marital status value");
      return res.status(400).json({ error: "Invalid marital status value" });
    }

    if (blood_type && !validBloodTypes.includes(blood_type)) {
      console.error("Validation error: Invalid blood type value");
      return res.status(400).json({ error: "Invalid blood type value" });
    }

    const checkDuplicateQuery = `SELECT * FROM employees WHERE nip = ?`;

    db.query(checkDuplicateQuery, [nip], (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      if (result.length > 0) {
        console.error("Duplicate entry error: NIP already exists");
        return res.status(400).json({ error: "NIP already exists" });
      }

      const sqlQuery = `
        INSERT INTO employees
        (employee_id, full_name, nip, address, birth_date, phone_number, email, position, join_date, employment_status, department, gender, marital_status, education, blood_type, retirement_date, nationality, photo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        employee_id,
        full_name,
        nip,
        address,
        birth_date,
        phone_number,
        email,
        position,
        join_date,
        employment_status,
        department,
        gender,
        marital_status,
        education,
        blood_type,
        retirement_date,
        nationality,
        photo,
      ];

      db.query(sqlQuery, values, (err, result) => {
        if (err) {
          console.error("Error running query:", err);
          return res.status(500).json({ error: "Error in running query" });
        }

        return res.json({
          message: "Employee created successfully",
          employee_id,
        });
      });
    });
  });
};

const getAllEmployees = (req, res) => {
  const sqlQuery = `
    SELECT * FROM employees
  `;

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({
      message: "All employees data retrieved successfully",
      data: result,
    });
  });
};

const getEmployeeById = (req, res) => {
  const { employee_id } = req.params;

  const sqlQuery = `
    SELECT * FROM employees
    WHERE employee_id = ?
  `;

  db.query(sqlQuery, [employee_id], (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.length === 0) {
      return res.status(404).json({
        error: "Employee with this ID does not exist",
      });
    }

    return res.json({
      message: "Employee data retrieved successfully",
      data: result[0],
    });
  });
};

const updateEmployee = (req, res) => {
  upload.single("photo")(req, res, (err) => {
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res
        .status(400)
        .json({ error: "Ukuran file tidak boleh lebih dari 5 MB" });
    } else if (err) {
      return res.status(500).json({ error: "Error uploading file" });
    }

    const { employee_id } = req.params;
    const {
      full_name,
      nip,
      address,
      birth_date,
      phone_number,
      email,
      position,
      join_date,
      employment_status,
      department,
      gender,
      marital_status,
      education,
      blood_type,
      retirement_date,
      nationality,
    } = req.body;

    const photo = req.file ? req.file.filename : null;

    let sqlQuery = `
      UPDATE employees 
      SET 
        full_name = ?, 
        nip = ?, 
        address = ?, 
        birth_date = ?, 
        phone_number = ?, 
        email = ?, 
        position = ?, 
        join_date = ?, 
        employment_status = ?, 
        department = ?, 
        gender = ?, 
        marital_status = ?, 
        education = ?, 
        blood_type = ?, 
        retirement_date = ?, 
        nationality = ?
    `;
    let values = [
      full_name,
      nip,
      address,
      birth_date,
      phone_number,
      email,
      position,
      join_date,
      employment_status,
      department,
      gender,
      marital_status,
      education,
      blood_type,
      retirement_date,
      nationality,
    ];

    if (photo) {
      sqlQuery += `, photo = ? WHERE employee_id = ?`;
      values.push(photo, employee_id);
    } else {
      sqlQuery += ` WHERE employee_id = ?`;
      values.push(employee_id);
    }

    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error("Error running query:", err);
        return res.status(500).json({ error: "Error in running query" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          error: "Employee with this ID does not exist",
        });
      }

      return res.json({
        message: "Employee updated successfully",
      });
    });
  });
};

const deleteEmployee = (req, res) => {
  const { employee_id } = req.params;

  const sqlQuery = `
    DELETE FROM employees 
    WHERE employee_id = ?
  `;

  db.query(sqlQuery, [employee_id], (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        error: "Employee with this ID does not exist",
      });
    }

    return res.json({
      message: "Employee deleted successfully",
    });
  });
};
const getAllEmployees1 = (req, res) => {
  const sqlQuery = "SELECT employee_id, full_name, nip FROM employees";

  db.query(sqlQuery, (err, result) => {
    if (err) {
      console.error("Error running query:", err);
      return res.status(500).json({ error: "Error in running query" });
    }

    return res.json({
      message: "All employees data retrieved successfully",
      data: result,
    });
  });
};

module.exports = {
  getAllEmployees1,
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
