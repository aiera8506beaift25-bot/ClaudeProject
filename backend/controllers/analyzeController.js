const extractText = require("../services/pdfService");
const detectContractType = require("../services/contractDetector");
const loadPrompt = require("../services/promptService");
const runRuleEngine = require("../services/ruleEngine");
const analyzeContractWithAI = require("../services/aiService");

exports.analyzeContract = async (req, res, next) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded (expected field 'contract')." });
    }

    const text = await extractText(req.file.path);
    const contractType = detectContractType(text);
    const prompt = loadPrompt(contractType);
    const ruleMatches = runRuleEngine(contractType, text);
    const analysis = await analyzeContractWithAI(text, prompt, ruleMatches);

    res.json({ success: true, contractType, ruleMatches, analysis });
  } catch (err) {
    next(err);
  }
};
