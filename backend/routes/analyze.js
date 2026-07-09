const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { analyzeContract } = require("../controllers/analyzeController");

router.post("/", upload.single("contract"), analyzeContract);

module.exports = router;