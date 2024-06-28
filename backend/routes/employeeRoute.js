const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.post("/employees", employeeController.createEmployee);
router.get("/employees", employeeController.getAllEmployees); // Added this line
router.get("/employees/:employee_id", employeeController.getEmployeeById);
router.put("/employees/:employee_id", employeeController.updateEmployee);
router.delete("/employees/:employee_id", employeeController.deleteEmployee);
router.get("/api/employees", employeeController.getAllEmployees1);
module.exports = router;
