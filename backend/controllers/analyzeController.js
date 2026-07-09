const path = require("path");
const fs = require("fs");
const extractText = require("../services/pdfService");
const { extractTextFromImage } = require("../services/ocrService");
const detectContractType = require("../services/contractDetector");
const loadPrompt = require("../services/promptService");
const runRuleEngine = require("../services/ruleEngine");
const analyzeContractWithAI = require("../services/aiService");

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".tiff",
  ".bmp",
]);

exports.analyzeContract = async (req, res, next) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res
        .status(400)
        .json({
          success: false,
          message: "No file uploaded (expected field 'contract').",
        });
    }

    filePath = req.file.path;
    const ext = path.extname(req.file.originalname || "").toLowerCase();

    // Extract text — PDF via pdf-parse, images via Tesseract OCR
    let text;
    if (IMAGE_EXTENSIONS.has(ext)) {
      text = await extractTextFromImage(filePath);
    } else {
      text = await extractText(filePath);
    }

    if (!text || text.trim().length < 20) {
      return res.status(422).json({
        success: false,
        message:
          "Could not extract readable text from the document. Please upload a text-based PDF or a clear image.",
      });
    }

    const contractType = detectContractType(text);
    const prompt = loadPrompt(contractType);
    const ruleMatches = runRuleEngine(contractType, text);
    const analysis = await analyzeContractWithAI(text, prompt, ruleMatches);

    res.json({ success: true, contractType, ruleMatches, analysis });
  } catch (err) {
    next(err);
  } finally {
    // Clean up uploaded file after analysis
    if (filePath) {
      fs.unlink(filePath, () => {});
    }
  }
};
