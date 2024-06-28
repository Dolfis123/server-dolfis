const express = require("express");
const router = express.Router();
const newsController = require("../controllers/beritaController");

router.get("/news", newsController.getAllNews);
router.get("/news/:id", newsController.getById);
router.post("/news", newsController.createNews);
router.put("/news/:id", newsController.updateNews);
router.delete("/news/:id", newsController.deleteNews);

module.exports = router;
